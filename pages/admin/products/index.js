import Link from "next/link";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { useQuery } from "react-query";
import { getCategories, productsDashboard } from "../../../lib/helper";
// import CustomPagination2 from '../../../components/Components/Shared/CustomPagination2';

const DashboardLayout = dynamic(
  () => import("../../../components/Components/DashboardLayout"),
  {
    loading: () => <p>Loading...</p>,
  }
);
// const ProductsTableItemsRow = dynamic(
//   () => import("../../../components/Shared/TableItem/ProductsTableItemsRow"),
//   {
//     loading: () => <p>Loading...</p>,
//   }
// );

import ProductsTableItemsRow from '../../../components/Components/Shared/TableItem/ProductsTableItemsRow';
import CustomPagination3 from '../../../components/Components/Shared/CustomPagination3';
import { useRouter } from "next/router";
// import ProductShowLimit from '../../../components/Components/Shared/ProductShowLimit';

const ExportExcel = dynamic(
  () => import("../../../components/Components/Admin/ExportImport/ExportProducts"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const Product = () => {
  //-------------------its reloader use for when we delete or update and set !reolder, then depenciy reloded
  const [queryFilter, setQueryFilter] = useState("");
  // ---------------for pagination-----------------------
  const [currentItems, setCurrentItems] = useState([]);
  const [newPage, setNewPage] = useState(1);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();
  const [limit, setLimit] = useState(10);
  const { query } = router;

  useEffect(() => {
    if (query.page) {
      setNewPage(Number(query.page));
    }

    if (query.limit) {
      setLimit(Number(query.limit));
    }
  }, [query]);

  //---------------------------------------------------------------catgories filter-----------------------------
  const handleFilterWithParantCategory = async (event) => {
    setCategory(event.target.value);
  };

  const { data, isLoading, refetch } = useQuery(
    ["product-list", queryFilter],
    () => {
      return productsDashboard(queryFilter);
    }
  );

  const generateQuery = () => {
    const queryParams = [];

    if (category) {
      queryParams.push(`category=${category}`);
    }

    if (search) {
      queryParams.push(`search=${search}`);
    }

    if (sort) {
      queryParams.push(`sort=${sort}`);
    } else {
      queryParams.push(`sort=-createdAt`);
    }

    return queryParams.join("&");
  };

  useEffect(() => {
    const query = generateQuery();
    setQueryFilter(`${query}&page=${newPage}&limit=${limit}`);
    // refetch();
  }, [search, category, newPage, limit, sort]);

  const filterWithPrice = (event) => {
    if (event.target.value === "lowStock") {
      setSort("stork");
      return;
    }
    if (event.target.value === "highStock") {
      setSort("-stork");
      return;
    }
    setSort(event.target.value);
  };

  // --------------------------------------------------------search with product name-------------------
  const handleSearchFilter = (event) => {
    setSearch(event.target.value);
  };

  // -----------------------------------------------------catgories------------------------
  const {
    data: categories,
    isLoading: isLoadingCategory,
    refetch: refetchCategory,
  } = useQuery(["categories"], getCategories);

  /*  if (isLoading) {
    return <p>loading...</p>;
  } */

  const totalStockPrice = currentItems.reduce((total, item) => {
    // Correct any misspelled keys for consistency
    const quantity = item.quantity || 0;
    const price = item.buyingPrice || 0;
    return total + price * quantity;
  }, 0);

  // --------------------------for pagination----------------------
  return (
    <DashboardLayout>
      <div className="">
        <div className="flex items-baseline gap-5">
          <h1 className="font-semibold mt-5 mb-2 text-xl">Products</h1>
          <div>
            <ExportExcel />
          </div>
        </div>

        <div className="p-8 rounded bg-white shadow flex justify-center items-center gap-4 flex-wrap md:flex-nowrap">
          <div className="w-full md:w-[40%]">
            <input
              type="text"
              id="name"
              onChange={handleSearchFilter}
              className="w-full rounded-lg input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
              placeholder="Search by product name"
            />
          </div>
          <div className="w-full md:w-[20%]">
            <select
              onChange={handleFilterWithParantCategory}
              className="select select-bordered w-full  focus:outline-none "
              placeholder="Category"
            >
              <option disabled selected>
                Category
              </option>
              {categories?.data?.result.map((category) => (
                <option value={category?.parentCategory} key={category._id}>
                  {category?.parentCategory}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-[20%]">
            <select
              onChange={filterWithPrice}
              className="select select-bordered  w-full  focus:outline-none"
            >
              <option disabled selected>
                Price
              </option>
              <option value={"salePrice"}>Price Low to High</option>
              <option value={"-salePrice"}>Price High to Low</option>
              <option value={"lowStock"}>No Stock Products</option>
              <option value={"highStock"}> Stock Products</option>
            </select>
          </div>
          <Link
            href={"/admin/products/add-product"}
            className="w-full md:w-[20%] inline-block"
          >
            <button className="btn btn-primary font-bold w-full text-white ">
              Add Product
            </button>
          </Link>
        </div>

        {/* <div className=" pt-3">
          <h2 className=" text-lg font-medium">
            Total Stock Price : ৳ {totalStockPrice}
          </h2>
        </div> */}

        <div className="mt-5">
          <div className="overflow-x-auto">
            <table className="table table-compact w-full">
              <thead>
                <tr>
                  <th className="bg-[#f3f3f3] text-center">S/N</th>
                  <th className="bg-[#f3f3f3] text-center">SKU</th>
                  <th className="bg-[#f3f3f3] text-center">Product Name</th>
                  <th className="bg-[#f3f3f3] text-center">Category</th>
                  <th className="bg-[#f3f3f3] text-center">Quantity</th>
                  <th className="bg-[#f3f3f3] text-center">Price</th>
                  <th className="bg-[#f3f3f3] text-center">Discount</th>
                  <th className="bg-[#f3f3f3] text-center">Wholesale</th>
                  <th className="bg-[#f3f3f3] text-center">Details</th>
                  <th className="bg-[#f3f3f3] text-center">Status</th>
                  <th className="bg-[#f3f3f3] text-center">Actions</th>
                </tr>
              </thead>

              {isLoading ? (
                <div className=" text-3xl py-5 font-semibold">
                  {/* <CustomButtonLoading /> */} Loading.....
                </div>
              ) : (
                <>
                  <tbody>
                    {data?.data?.products?.map((product, index) => (
                      <ProductsTableItemsRow
                        key={product._id}
                        product={product}
                        index={index + 1}
                        newPage={newPage}
                        refetch={refetch}
                        limit={limit}
                      />
                    ))}
                  </tbody>
                </>
              )}
            </table>
            <div className="flex items-center gap-5 justify-center">
              {/* paginate */}
              {/* <ProductShowLimit total={data?.data?.total} /> */}
              <div>
                <CustomPagination3
                  total={data?.data?.total}
                  itemsPerPage={limit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Product;

