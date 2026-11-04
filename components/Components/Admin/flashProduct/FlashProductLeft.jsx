import React, { useState } from "react";
import { updateMethodHook } from "../../../../lib/usePostHooks";
import server_url from "../../../../lib/config";
import SelectProductItemAll from '../../../Shared/drawer/SelectProductItemAll';

const FlashProductLeft = ({ getProductId, setGetProductId, id,time,setTime }) => {
  const [loading, setLoading] = useState(false);


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

  const url = `${server_url}/banner/flash/product/${id}`;

  const productId = getProductId.map((item) => item._id);

  const handleAddBanner = (data) => {
    setLoading(true);
    const newData = {
      productList: productId,
      end_time:time,
    };
    updateMethodHook(url, newData, setLoading);
  };

  const handelChange = (e) => {
    const searchValue = e.target.value;
    setTime(searchValue);
  };

  return (
    <div className="bg-white shadow-md p-5 rounded-md min-h-screen">
      <div className=" pb-4 flex items-center md:flex-row flex-col justify-between border-b">
        <h2 className=" w-full text-xl font-semibold">Selected Product </h2>
        <input
          type="date"
          value={time}
          onChange={handelChange}
          placeholder="Search Product...."
          className="input input-bordered  block w-full ]"
          style={{ outline: "none" }}
          name="search"
        />
      </div>
      <div className="h-[80vh] grid grid-cols-3 overflow-y-auto">
        {getProductId.map((product) => (
          <SelectProductItemAll
            key={product?._id}
            product={product}
            handleSelectProduct={handleSelectProduct}
            getProductId={getProductId}
          />
        ))}
      </div>
      <div className=" flex items-center justify-center mt-3">
        <button
          disabled={loading}
          onClick={() => handleAddBanner()}
          className=" py-2 px-5 bg-primary text-white shadow-md rounded-md hover:bg-green-500 duration-300 transition-all"
        >
          {loading ? "Loading..." : "Add Product Banner"}{" "}
        </button>
      </div>
    </div>
  );
};

export default FlashProductLeft;
