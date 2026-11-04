import Image from "next/image";
import React from "react";

const OurBrand = () => {
  const brandList = [
    "/brand/Amazon.webp",
    "/brand/Anker_Brand.webp",
    "/brand/Apple_Brand.webp",
    "/brand/Benco.webp",
    "/brand/Haylou.webp",
    "/brand/Hoco.webp",
    "/brand/Huawei.webp",
    "/brand/KOSPET.webp",
    "/brand/Microsoft.webp",
    "/brand/Samsung_Brand.webp",
    "/brand/Vivo_Brand.webp",
    "/brand/Xtra.webp",
  ];

  return (
    <div className=" bg-black py-12 p-5 w-full">
      <div className="mid-container">
        <div>
          <h2 className=" text-3xl font-semibold text-center text-white pb-6">Most Popular Brands</h2>
          <div className=" grid gap-5 grid-cols-2 md:grid-cols-6">
            {brandList.map((item, index) => (
              <div key={index}>
                <Image
                  src={item}
                  width={500}
                  height={500}
                  alt="brand"
                  className=" w-full h-[100px] rounded-xl"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurBrand;
