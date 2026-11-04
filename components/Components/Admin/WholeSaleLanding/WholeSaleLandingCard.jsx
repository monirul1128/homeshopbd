import React from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";

const WholeSaleLandingCard = ({allPages}) => {
  return (
    <div>
      <div className="w-full text-center">
        <h2 className=" font-semibold text-[35px]">
        ড্রপশিপিং  একাউন্ট কেন আপনার জন্য সঠিক হতে পারে
        </h2>
      </div>
      <div className=" pt-8 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
        {allPages?.benefits?.map((item, index) => (
          <div
            key={index}
            className=" relative flex items-center flex-col justify-start gap-4 border p-5 py-8 border-gray-300 duration-300 rounded-md hover:border-[#4CA46F]"
          >
            <div>
              {item?.icon ? (
                <Image src={item?.icon} width={70} height={70} alt="icon" className=" w-[60px] h-[60px]" />
              ) : (
                <Icon
                  icon="la:hand-peace"
                  className=" text-[55px] text-[#4CA46F]"
                />
              )}
            </div>
            <h2 className="text-[18px] font-semibold text-center">
              {item?.title}
            </h2>
            <p className="text-[16px] font-normal text-center">{item?.dec}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WholeSaleLandingCard;
