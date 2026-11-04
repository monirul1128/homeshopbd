import React from "react";
import Image from "next/image";

const SelectProductItemAll = ({
  product,
  handleSelectProduct,
  getProductId,
}) => {
  const isSelected = Boolean(
    getProductId.find((grpStud) => grpStud._id === product._id)
  );

  return (
    <div
      onClick={() => handleSelectProduct(product)}
      className={`my-2 mx-2 cursor-pointer  max-h-[260px] border-2 shadow-lg   ${
        isSelected ? "border-red-400" : ""
      } `}
    >
      <div className="flex items-center flex-col  gap-3 border-y-base-300">
        <div className="flex items-center w-full overflow-hidden">
          <Image
            src={product?.imageURLs[0]?.replace("http://", "https://")}
            alt="product"
            width={100}
            height={100}
            className=" object-cover bg-white  border-2 border-gray-200  h-[100px] w-full"
          />
        </div>
        {/* --------info------------ */}
        <div className="w-full px-2">
          <div className="">
            <div>
              <h2
                // onClick={() => router.push(`/product/${product?._id}`)}
                className="text-xs text-slate-900 font-medium  flex-wrap cursor-pointer hover:scale-105 duration-150"
              >
                {product?.productTitle?.length > 55
                  ? product?.name.slice(0, 55) + "..."
                  : product?.name}
              </h2>
              <div className=" flex items-end mt-2">
                <div className=" flex items-center gap-3">
                  <p className="text-slate-800  text-sm font-bold mb-1">
                    ৳ {product?.salePrice}
                  </p>
                  <p className="text-slate-800 line-through text-xs mb-1">
                    ৳ {product.productPrice}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectProductItemAll;
