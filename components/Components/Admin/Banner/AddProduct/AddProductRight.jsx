import React, { useState } from "react";
import { useQuery } from "react-query";
import { getCategories, products } from "../../../../../lib/helper";
import { MdOutlineUnfoldMore } from "react-icons/md";
import SelectProductItem from '../../../../Shared/drawer/SelectProductItem";
import SelectProductItemAll from '../../../../Shared/drawer/SelectProductItemAll";

const AddProductRight = ({ getProductId, setGetProductId }) => {
  const [queryFilterPrice, setQueryFilterPrice] = useState("");
  const [visible, setVisible] = useState(15);


  const {
    data: categories,
  } = useQuery(["categories"], getCategories);

  const { data, isLoading, refetch } = useQuery(
    ["products", queryFilterPrice],
    () => products(queryFilterPrice)
  );

  const handleSelectProduct = (product) => {
    const isSelected = Boolean(
      getProductId.find((grpStud) => grpStud._id === product._id)
    );
    if (isSelected) {
      setGetProductId(getProductId.filter((item) => item._id !== product._id));
    } else {
      setGetProductId((pre) => [...pre, product]);
    }
  };

  const handelChange = (e) => {
    const searchValue = e.target.value;
    setQueryFilterPrice(`search=${searchValue}`);
  };

  const handleFilterWithParantCategory = (e)=>{
    const searchValue = e.target.value;
    setQueryFilterPrice(`category=${searchValue}`);
  }

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 15);
  };

  return (
    <div className=" bg-white shadow-md rounded-md p-5 overflow-y-auto min-h-screen">
      <div className=" pb-4 border-b">
        <h2 className=" text-xl font-semibold">Select Product </h2>
      </div>
      <div className=" bg-white flex items-center justify-evenly gap-5 py-2 px-2 w-full">
        <input
          type="text"
          onChange={handelChange}
          placeholder="Search Product...."
          className="input input-bordered  block w-full ]"
          style={{ outline: "none" }}
          name="search"
        />

        <div className="w-full">
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
      </div>
      {/* ------------------------items------------------- */}

      <div className="h-[80vh] w-full overflow-y-auto">
        <div className=" grid grid-cols-3 w-full ">
          {data?.data?.products.slice(0, visible).map((product) => (
            <SelectProductItemAll
              key={product?._id}
              product={product}
              handleSelectProduct={handleSelectProduct}
              getProductId={getProductId}
            />
          ))}
        </div>
        <div className="w-full flex pb-3 items-center justify-center text-center">
          {data?.data?.products.length > visible && (
            <button
              onClick={showMoreItems}
              className="bg-primary  px-3 py-2 font-bold mt-5 rounded-md mx-auto flex items-center gap-1 hover:bg-opacity-0 duration-150 text-white hover:text-primary border border-primary"
            >
              <MdOutlineUnfoldMore size={22} />
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddProductRight;
