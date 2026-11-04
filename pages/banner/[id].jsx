import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ProductCard from "../../components/Shared/ProductCard";
import CustomProductSectionSkeleton from "../../components/Components/CustomSkeleton/CustomProductSectionSkeleton";

const BannerProduct = () => {
  const router = useRouter();
  const id = router.query.id;
  const [banner, setBanner] = useState(null);
  let url = `https://server-homeshopbd-2-kohl.vercel.app/api/v1/banner/${id}`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setBanner(data?.data);
        }
      });
  }, [id]);

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
              <Image
                width={1200}
                height={100}
                alt="banner"
                className="md:h-[370px] h-full rounded-xl object-cover md:object-fill"
                src={banner.image}
              />
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

export default BannerProduct;
