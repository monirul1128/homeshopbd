import React, { useState } from "react";
import SelectProductItemAll from '../../../../shared/drawer/SelectProductItemAll";
import { postMethodHook, updateMethodHook } from "../../../../../lib/usePostHooks";
import server_url from "../../../../../lib/config";

const AddProductLeft = ({ getProductId, setGetProductId,id }) => {
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

  const url = `${server_url}/banner/product/${id}`;

  const productId = getProductId.map((item) => item._id);

  console.log(productId);

  const handleAddBanner = (data) => {
    setLoading(true);
    const newData = {
      productList: productId,
    };
    updateMethodHook(url, newData, setLoading);
  };

  return (
    <div className="bg-white shadow-md p-5 rounded-md min-h-screen">
      <div className=" pb-4 border-b">
        <h2 className=" text-xl font-semibold">Selected Product </h2>
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
          onClick={()=>handleAddBanner()}
          className=" py-2 px-5 bg-primary text-white shadow-md rounded-md hover:bg-green-500 duration-300 transition-all"
        >
          {loading ? "Loading..." : "Add Product Banner"}{" "}
        </button>
      </div>
    </div>
  );
};

export default AddProductLeft;
