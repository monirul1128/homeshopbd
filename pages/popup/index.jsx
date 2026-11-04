import Image from "next/image";
import React, { useEffect, useState } from "react";
import ProductCard from "../../components/Shared/ProductCard";
import CustomProductSectionSkeleton from "../../components/Components/CustomSkeleton/CustomProductSectionSkeleton";
import CountdownTimer from "../../components/Components/ProductSection/CountdownTimer";

const PopupProduct = () => {
  const [banner, setBanner] = useState(null);
  let url = `https://server-homeshopbd-2-kohl.vercel.app/api/v1/banner/flash/693e47c05f133d7f48c32bd3`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setBanner(data?.data);
        }
      });
  }, []);

  return (
    <div className="bg-accent md:pb-5">
      <div className="mid-container mx-auto px-1 m:px-2">
        {!banner ? (
          <>
            {" "}
            <CustomProductSectionSkeleton />
          </>
        ) : (
          <>
            {" "}
            <div className=" pt-5">
              <div className=" bg-white flex flex-col md:flex-row  items-start md:items-center border justify-between py-3 px-5 shadow-sm rounded-md">
                <h2 className=" text-lg md:text-xl font-medium">{banner?.title}</h2>
                <CountdownTimer endTime={banner?.end_time} />
              </div>
            </div>
            <div className=" mt-6">
              <div className="grid xl:grid-cols-5 lg:grid-cols-4  md:grid-cols-3 grid-cols-2 gap-3 lg:gap-7">
                {banner?.product?.map((item) => (
                  <ProductCard key={item._id} product={item}></ProductCard>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PopupProduct;
