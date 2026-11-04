import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getCategories, products } from "../../lib/helper";
import SliderInHeader from '../../Components/Components/Home/Banner/SliderInHeader";
import ProductCard from '../../Components/Shared/ProductCard";
import { FaSearch, FaTrashAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import FilterByCategoryRow from '../../Components/Components/Shop/FilterByCategoryRow";
import FilterBySubCategory from '../../Components/Components/Shop/FilterBySubCategory";
import { AiFillFilter } from "react-icons/ai";
import ShopPageDrawer from '../../Components/Shared/drawer/ShopPageDrawer";
import CreateContext from '../../Components/Components/CreateContex";
import CustomPagination from '../../Components/Shared/CustomPagination";
import LoadingComponets from '../../Components/Shared/LoadingComponets";
import CustomProductSectionSkeleton from '../../Components/Components/CustomSkeleton/CustomProductSectionSkeleton";
import Head from "next/head";
import AuthUser from "../../lib/AuthUser";
const Shop = () => {
  const [queryFilterPrice, setQueryFilterPrice] = useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const { queryFromCategory, setQueryFromCategory } = useContext(CreateContext);
  const [currentItems, setCurrentItems] = useState([]);
  const { userInfo } = AuthUser();

  const { data, isLoading, refetch } = useQuery(
    ["products", queryFilterPrice],
    () => products(queryFilterPrice)
  );
  const {
    data: categories,
    isLoading: categoryLoading,
    refetch: categoryRefetch,
  } = useQuery(["category"], getCategories);

  // for when click any category
  useEffect(() => {
    if (queryFromCategory.length > 0) {
      setQueryFilterPrice(queryFromCategory);
      refetch(["products", queryFromCategory]);
    } else {
      setQueryFilterPrice("");
      refetch(["products"]);
    }
  }, [queryFromCategory]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleFilterByPrice = (e) => {
    e.preventDefault();
    let minPrice = e.target.minPrice.value;
    let maxPrice = e.target.maxPrice.value;
    setQueryFilterPrice(
      `salePrice[gte]=${minPrice}&salePrice[lte]=${maxPrice}`
    );
    refetch(["products", queryFilterPrice]);
  };
  const handlePriceSort = (e) => {
    let value = e.target.value;
    if (value === "lth") {
      setQueryFilterPrice(`sort=salePrice`);
      refetch(["products", value]);
    } else {
      setQueryFilterPrice(`sort=-salePrice`);
      refetch(["products", value]);
    }
  };
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const filterData =
    userInfo?.role === "resaller"
      ? data?.data?.products?.filter((item) => item?.wholesaleStatus === "active")
      : data?.data?.products;

  const leftSideBar = (
    <div className="overflow-scroll h-[90vh] md:h-full ">
      <form
        onSubmit={handleFilterByPrice}
        className="bg-white p-3 md:p-5 rounded-md mb-1 md:mb-6"
      >
        <div className="pb-3">
          <h3 className="text-[#39404a] font-bold text-sm ">FILTER BY PRICE</h3>
        </div>
        <div className="filter-body">
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              {...register("minPrice", { required: true })}
              placeholder="Min - 00"
              className="w-full block h-11 rounded-md bg-[#f5f5f5] text-center text-[#555] text-sm"
            />

            <input
              type="number"
              placeholder="Max - 5k"
              {...register("maxPrice", { required: true })}
              className="w-full block h-11 rounded-md bg-[#f5f5f5] text-center text-[#555] text-sm "
            />
          </div>
        </div>

        <div className=" mt-3 mb-1">
          <button
            type="submit"
            className="text-sm flex items-center justify-center w-full gap-1 text-[#39404a] px-3 py-[6px] rounded-md bg-[#e8e8e8] outline-none duration-150 hover:bg-primary hover:text-white"
          >
            <FaSearch />
            <span className="font-bold">Search</span>
          </button>
        </div>
      </form>
      <div className="bg-white p-3  md:p-5 rounded-md mb-1 md:mb-6">
        <div className="pb-3">
          <h3 className="text-[#39404a] font-bold text-sm ">
            FILTER BY CATEGORY
          </h3>
        </div>
        {/* filter by category */}
        <FilterByCategoryRow
          setQueryFilterPrice={setQueryFilterPrice}
          queryFilterPrice={queryFilterPrice}
          categories={categories}
          refetch={refetch}
        />
      </div>
      <div className="bg-white p-3 md:p-5 rounded-md mb-1 md:mb-6">
        <div className="pb-3">
          <h3 className="text-[#39404a] font-bold text-sm ">
            FILTER BY SUB CATEGORY
          </h3>
        </div>
        {/* ---------------sub category------------- */}
        <FilterBySubCategory
          categories={categories}
          setQueryFilter={setQueryFilterPrice}
          refetch={refetch}
        />
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>
          All Product | Explore the Best Products Online - Home Shop BD
        </title>
        <meta
          name="description"
          content="Browse our extensive collection of top-quality products. Find the best deals on electronics, fashion, home essentials, and more at Home Shop BD."
        />
        <meta
          name="keywords"
          content="buy online, best deals, ecommerce, electronics, fashion, home essentials, discounts"
        />
        <meta name="author" content="Home Shop BD" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Shop | Explore the Best Products Online"
        />
        <meta
          property="og:description"
          content="Discover the latest products with amazing discounts. Shop electronics, fashion, home essentials, and more!"
        />
        <meta
          property="og:image"
          content="https://yourwebsite.com/shop-preview-image.jpg"
        />
        <meta property="og:url" content="https://yourwebsite.com/shop" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Shop | Explore the Best Products Online"
        />
        <meta
          name="twitter:description"
          content="Find your favorite products at the best prices. Shop now for great deals on a wide range of categories!"
        />
        <meta
          name="twitter:image"
          content="https://yourwebsite.com/shop-preview-image.jpg"
        />
      </Head>
      <div className="bg-[#f5f5f5]">
        <div className="mid-container">
          <div className="py-7">
            <div className="flex gap-10 mt-3">
              <div className="w-[20%] hidden md:block">
                {/* price */}
                {leftSideBar}

                {/* ------------category */}
              </div>

              <div className="md:w-[80%] w-full min-h-screen">
                <div className="block md:flex justify-between items-center mb-3">
                  <div className="w-full md:w-1/2 flex items-center justify-between">
                    <p className="text-sm capitalize font-bold w-4/5">
                      Total {data?.data?.products?.length} items Found
                    </p>
                    <div
                      onClick={toggleDrawer}
                      className="md:hidden bg-primary text-white font-bold cursor-pointer flex justify-center items-center w-[100px] h-10 rounded-md border border-primary hover:bg-white hover:text-primary duration-150 "
                    >
                      Filter <AiFillFilter size={20} />
                    </div>
                  </div>

                  <div className="flex gap-3 w-full md:w-1/2 justify-start md:justify-end items-center py-2">
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
                {!isLoading ? (
                  <div>
                    <div className="grid xl:grid-cols-4 lg:grid-cols-4  md:grid-cols-3 grid-cols-2 gap-3 lg:gap-7 ">
                      {filterData?.map((item) => (
                        <ProductCard
                          key={item._id}
                          product={item}
                        ></ProductCard>
                      ))}
                    </div>

                    {/* <CustomPagination
                    arrayData={data?.data?.products}
                    setCurrentItems={setCurrentItems}
                    itemsPerPage={16}
                  /> */}
                  </div>
                ) : (
                  <CustomProductSectionSkeleton />
                )}
              </div>
            </div>
          </div>
        </div>
        <ShopPageDrawer
          isOpen={isOpen}
          toggleDrawer={toggleDrawer}
          dir={"left"}
          leftSideBar={leftSideBar}
        ></ShopPageDrawer>
      </div>
    </>
  );
};

export default Shop;

