import Link from "next/link";
import React, { useEffect, useState } from "react";
import ProductCard from '../../Shared/ProductCard";
import { AiFillEye } from "react-icons/ai";
import CustomProductSectionSkeleton from "../CustomSkeleton/CustomProductSectionSkeleton";
import CountdownTimer from "./CountdownTimer";
import AuthUser from "../../../lib/AuthUser";
const FlashProductSection = ({
  heading,
  subtitle = "",
  data,
  sliceItem = 10,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const { userInfo } = AuthUser();

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data]);

  const filterData =
    userInfo?.role === "resaller"
      ? data?.data?.product?.filter(
          (item) => item?.wholesaleStatus === "active"
        )
      : data?.data?.product;

  return (
    <>
      <div className="py-10 bg-accent ">
        <div className="mid-container">
          <div className="">
            <div className=" flex items-center gap-10  mb-5">
              <h1 className="text-xl md:text-2xl font-semibold capitalize text-[#444] ">
                {heading}
              </h1>
              {!isLoading ? (
                <CountdownTimer endTime={data?.data?.end_time} />
              ) : (
                <></>
              )}
            </div>
          </div>
          {!isLoading ? (
            <div className="grid xl:grid-cols-5 lg:grid-cols-4  md:grid-cols-3 grid-cols-2 gap-3 lg:gap-7">
              {filterData?.slice(0, 10)?.map((item) => (
                <ProductCard key={item._id} product={item}></ProductCard>
              ))}
            </div>
          ) : (
            <CustomProductSectionSkeleton />
          )}
        </div>
        {/* <div className="text-center mt-10 mb-2">
          <Link
            onClick={() => setQueryFromCategory(viewQuery)}
            href={"/shop"}
            className="inline-block bg-primary px-4 py-2 rounded-md hover:bg-white hover:text-primary border border-primary text-white duration-150  "
          >
            <span className="flex justify-center items-center gap-2 ">
              <AiFillEye size={22} /> View All
            </span>
          </Link>
        </div> */}
      </div>
    </>
  );
};

export default FlashProductSection;
