import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

const WholeSalerHistory = ({ allPages }) => {

    console.log(allPages?.reviews)

  return (
    <div>
      <div className="w-full text-center">
        <h2 className=" font-semibold text-[35px]">
          শূন্য থেকে সফল হওয়া উদ্যোক্তাদের সাকসেস স্টোরি
        </h2>
      </div>
      <div className="my-7">
        <Swiper
          spaceBetween={20}
          modules={[Autoplay]}
          className={""}
          autoplay={true}
          breakpoints={{
            "@.50": {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            "@1.00": {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            "@1.50": {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            "@1.75": {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            "@2.25": {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
        >
          {allPages?.reviews?.map((ima, index) => (
            <SwiperSlide
              className="cursor-pointer"
              key={index}
            >
              <Image
                width={500}
                height={250}
                alt="banner"
                className="cover h-[250px] rounded-md"
                src={ima}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default WholeSalerHistory;
