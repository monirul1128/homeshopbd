import { useRouter } from "next/router";
import React, { useContext, useState, useEffect } from "react";
import { useQuery } from "react-query";
import ProductCard from '../../components/Shared/ProductCard';
import CreateContext from '../../components/Components/CreateContex';
import InfiniteScroll from "react-infinite-scroll-component";
import CustomProductSectionSkeleton2 from '../../components/Components/CustomSkeleton/CustomProductSectionSkeleton2';
import { products } from "../../lib/helper";

const CategoryPage = ({ initialData }) => {
  const router = useRouter();
  const { category, subCategory } = router.query;
  const [currentPage, setCurrentPage] = useState(1);
  const [queryFilterPrice, setQueryFilterPrice] = useState("");
  const { queryFromCategory } = useContext(CreateContext);
  const [currentItems, setCurrentItems] = useState([]);
  const [query, setQuery] = useState("");

  const encodedCategory = encodeURIComponent(category);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // const { data, refetch, isSuccess, isLoading } = useQuery({
  //   queryKey: ["product", queryFromCategory, queryFilterPrice,itemsPerPage, currentPage],
  //   queryFn: () =>
  //     fetch(
  //       `${server_url}/product?status=true&category=${encodedCategory}&sort=${queryFilterPrice}&limit=${itemsPerPage}&page=${currentPage}`
  //     ).then((res) => res.json()),
  // });

  const generateQuery = (category, subCategory) => {
    const queryParams = [];

    if (category) {
      // queryParams.push(`category=${category}`);

      const params = new URLSearchParams();
      params.append("category", category);
      const url = `${params.toString()}`;
      queryParams.push(url);
    }

    if (subCategory) {
      // queryParams.push(`subCategory=${subCategory}`);
      const params = new URLSearchParams();
      params.append("subCategory", subCategory);
      const url = `${params.toString()}`;
      queryParams.push(url);
    }

    return queryParams.join("&");
  };

  useEffect(() => {
    const query = generateQuery(category, subCategory);
    setQuery(query);
    refetch(["products", query]);
  }, [category, subCategory]);

  const { data, isLoading, refetch, isError } = useQuery(
    [
      "product",
      queryFromCategory,
      query,
      queryFilterPrice,
      itemsPerPage,
      currentPage,
    ],
    () =>
      products(
        `${query}&sort=${
          queryFilterPrice ? queryFilterPrice : "-createdAt"
        }&limit=${itemsPerPage}&page=${currentPage}`
      ),
    {
      keepPreviousData: false,
    }
  );

  const allProducts = data?.data?.products;
  const totalItems = data?.data?.total || 0;
  console.log(totalItems);
  const handlePriceSort = (e) => {
    let value = e.target.value;
    if (value === "lth") {
      setQueryFilterPrice("salePrice");
    } else {
      setQueryFilterPrice("-salePrice");
    }
    refetch();
  };

  useEffect(() => {
    if (data?.data?.products) {
      setCurrentItems(data.data.products);
    }
  }, [data, queryFilterPrice]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const fetchMoreData = () => {
    if (data?.data?.total >= currentItems?.length) {
      setItemsPerPage((prev) => prev + 20);
    }
  };

  return (
    <div className="py-5 md:py-10">
      <div className="mid-container">
        <div className="flex items-center justify-between gap-5 flex-wrap mb-8 md:mb-10">
          <p className="text-xl capitalize flex items-center justify-center font-bold">{category} {subCategory && ">"} {subCategory ?  subCategory : ""}</p>
          <div className="flex gap-3 items-center">
            <p className="font-bold hidden lg:block">Sort by :</p>
            <div>
              <select
                onChange={handlePriceSort}
                className="select select-primary w-full max-w-xs focus:outline-none"
              >
                <option disabled selected hidden>
                  Best Match
                </option>
                <option value={"lth"}>Price Low to High</option>
                <option value={"htl"}>Price High to Low</option>
              </select>
            </div>
          </div>
        </div>
        <div className="">
          <InfiniteScroll
            dataLength={currentItems?.length}
            next={fetchMoreData}
            style={""}
            hasMore={data?.data?.total >= currentItems?.length}
            loader={<></>}
            className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3"
          >
            {currentItems?.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </InfiniteScroll>

          <div>
            {isLoading ? (
              <>
                <CustomProductSectionSkeleton2 />
              </>
            ) : (
              <></>
            )}
          </div>

          {/* <ShopPagination
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            /> */}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

