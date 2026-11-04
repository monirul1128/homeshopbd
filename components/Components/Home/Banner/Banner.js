import React from "react";
import SidebarMenu from "./SiebarMenu";
import SliderInHeader from "./SliderInHeader";
import Image from "next/image";
import Link from "next/link";

const Banner = ({ data, catagories }) => {
  return (
    <div className="bg-accent md:pb-5">
      <div className="mid-container mx-auto px-1 m:px-2">
        <div className="flex gap-0 md:gap-3">
          <div className="lg:w-[27%] lg:block hidden max-h-[350px] bg-white mt-4 pt-3 rounded-sm">
            <SidebarMenu categories={catagories}/>
          </div>
          {/* -----------------------------slider */}
          <div className="lg:w-[73%] mx-auto w-full mt-4 ">
            <SliderInHeader data={data} />
          </div>
        </div>

        <div className=" flex w-full md:flex-row flex-col items-center gap-2 md:gap-5 mt-3">
          {data?.data?.result
            .filter((item) => item.type === "bottom")
            .slice(0, 3)
            .map((banner, index) => (
              <Link href={`/banner/${banner._id}`} key={index}>
                <Image
                  width={1200}
                  height={100}
                  alt="banner"
                  className="h-[120px] md:h-[150px] rounded-md shadow-md object-fill"
                  src={banner?.image?.replace("http://", "https://")}
                />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
