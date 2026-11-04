import Image from "next/image";
import React from "react";
import { useFetchVersionTwo } from "../../components/hooks/usePublicFetchVersionTwo";
import { useRouter } from "next/router";
import LoadingComponets from "../../components/Shared/LoadingComponets";
import { Icon } from "@iconify/react";
import WholeSaleLandingCard from "../../components/Components/Admin/WholeSaleLanding/WholeSaleLandingCard";
import WholeSalerHistory from "../../components/Components/Admin/WholeSaleLanding/WholeSalerHistory";
import Give from "../../components/Components/Admin/WholeSaleLanding/Give";

const Page = () => {
  const router = useRouter();

  const {
    data: pages,
    isLoading,
    refetch,
  } = useFetchVersionTwo(["wholesale"], "landing-page/wholesale");
  const allPages = pages?.data[0];

  function extractVideoID(url) {
    const regex = /(?:\?v=|&v=|youtu\.be\/)([^&\n]+)/;
    const match = url.match(regex);
    if (match) {
      return match[1];
    }
    return null;
  }

  if (isLoading) {
    return (
      <div className=" h-[100vh] flex items-center justify-center">
        <LoadingComponets />
      </div>
    );
  }

  return (
    <div>
      <div className=" bg-[#E8E9EB]  py-10 md:px-10">
        <div className="mid-container">
          <div className="flex items-center flex-col mb-14 justify-center gap-4">
            <Image
              src={"/logo.png"}
              width={200}
              height={200}
              alt="logo"
              className=" mb-6"
            />
            <h2 className=" text-center text-[30px] md:text-[50px] font-medium">
              {allPages?.title}
            </h2>
            <h2 className=" text-center text-[25px]">
              ({allPages?.sub_title})
            </h2>
            <button
              onClick={() => router.push("/auth/resaler-signup")}
              className="mt-7 bg-[#4CA46F] hover:bg-yellow-500 duration-300 py-4 px-7 text-[20px] rounded-full text-white font-semibold"
            >
              রেজিস্ট্রেশন করুন
            </button>
          </div>
        </div>
      </div>
      <div className=" bg-white w-full pt-16">
        <div className="mid-container">
          <div className=" flex items-start md:flex-row flex-col gap-10">
            <div className="h-[200px] md:h-[300px] lg:h-[450px] w-full">
              {allPages?.video ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${extractVideoID(
                    allPages?.video
                  )}`}
                  title="YouTube video player"
                  // frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className=""
                ></iframe>
              ) : (
                <h2>Video Not Found</h2>
              )}
            </div>
            <div className="w-full">
              <h2 className=" font-semibold text-[35px]">
                ড্রপশিপিং একাউন্ট কার জন্য?
              </h2>
              <div className=" pt-5 flex flex-col gap-2">
                {allPages?.for_whom?.map((item, index) => (
                  <div key={index} className=" flex items-center gap-4">
                    <Icon
                      className=" text-[25px] text-green-500"
                      icon="game-icons:check-mark"
                    />
                    <h2 className=" text-[20px] font-medium">{item?.title}</h2>
                  </div>
                ))}
              </div>
              <button
                onClick={() => router.push("/auth/resaler-signup")}
                className="mt-7 bg-[#4CA46F] py-4 px-7 hover:bg-yellow-500 duration-300 text-[20px] rounded-full text-white font-semibold"
              >
                রেজিস্ট্রেশন করুন
              </button>
            </div>
          </div>

          <div className=" mt-20">
            <WholeSaleLandingCard allPages={allPages} />
          </div>

          <div className=" mt-20">
            <WholeSalerHistory allPages={allPages} />
          </div>

          <div className=" mt-20">
            <Give allPages={allPages} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
