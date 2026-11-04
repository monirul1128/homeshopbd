import Image from "next/image";
import React from "react";

const SecondaryImageCover = ({ title }) => {
  return (
    <div className="h-52 relative flex justify-center items-center bg-slate-200">
      <Image
        src={"https://i.ibb.co/SrRB1Xb/image.webp"}
        alt="Picture of the author"
        width={1080}
        height={1920}
        className=" w-full h-full absolute object-cover"
      />
      <h1 className="font-black sm:text-2xl flex items-center justify-center text-3xl w-full capitalize">
        {title}
      </h1>
    </div>
  );
};

export default SecondaryImageCover;
