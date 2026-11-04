import React from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";

const Give = ({ allPages }) => {
  const router = useRouter();

  return (
    <div className="w-full">
      <h2 className=" font-semibold text-[35px]">
        ড্রপশিপিং একাউন্ট করলে যা যা পাচ্ছেন?
      </h2>
      <div className=" pt-5 flex flex-col gap-2">
        {allPages?.why_for_you?.map((item, index) => (
          <div key={index} className=" flex items-center gap-4">
            <div className="w-[30px] h-[30px] bg-green-500 flex items-center justify-center rounded-full">
              <Icon
                className=" text-[25px] text-white"
                icon="game-icons:check-mark"
              />
            </div>
            <h2 className=" md:text-[23px] text-base font-medium">
              {item?.title}
            </h2>
          </div>
        ))}
      </div>
      <div className="w-full flex items-center justify-center py-10">
        <button
          onClick={() => router.push("/auth/resaler-signup")}
          className="mt-7 bg-[#4CA46F] py-4 px-7 hover:bg-yellow-500 duration-300 text-[20px] rounded-full text-white font-semibold"
        >
          রেজিস্ট্রেশন করুন
        </button>
      </div>
    </div>
  );
};

export default Give;
