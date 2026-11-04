import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import styles from "./Sidebar.module.css";
import "swiper/css/autoplay";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { useCustomQuery } from "../../../hooks/useMyShopData";
import CustomBannerSkeleton from "../../CustomSkeleton/CustomBannerSkeleton";
import Link from "next/link";

const SliderInHeader = ({ data }) => {
  // const { data, isLoading } = useCustomQuery(
  //   "banner",
  //   "banner?status=active&sort=position"
  // );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data]);

  return (
    <div className="mt-1 md:mt-0">
      {isLoading ? (
        <CustomBannerSkeleton />
      ) : (
        <Swiper
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Autoplay]}
          className={styles}
          autoplay={true}
          // navigation
        >
          {data?.status === "success" &&
            data.data.result
              .filter((item) => item.type === "main")
              .map((banner) => (
                <SwiperSlide>
                  <Link href={`/banner/${banner._id}`}>
                    <Image
                      width={1200}
                      height={100}
                      alt="banner"
                      className="md:h-[370px] h-[150px] object-fill md:object-cover md:object-fill"
                      src={banner?.image?.replace("http://", "https://")}
                    />
                  </Link>
                </SwiperSlide>
              ))}
        </Swiper>
      )}
    </div>
  );
};

export default SliderInHeader;
