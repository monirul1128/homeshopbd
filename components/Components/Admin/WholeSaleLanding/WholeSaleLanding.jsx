import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsCloudUploadFill } from "react-icons/bs";
import { updateMethodHook } from "../../../../lib/usePostHooks";
import { server_url_v3 } from "../../../../lib/config";
import { useFetchVersionTwo } from "../../../hooks/usePublicFetchVersionTwo";
import LoadingComponets from '../../../Shared/LoadingComponets';
import ForWhom from "./ForWhom";
import WhyForYou from "./WhyForYou";
import WhyForYou2 from "./WhyForYou2";
import { handleMultiImageUpload } from "../../../../lib/imageUploader";
import { BiImageAdd } from "react-icons/bi";
import Link from "next/link";

const WholeSaleLanding = () => {
  const [imageUrl, setImageUrl] = useState([]);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState("");
  const [imageUploadErrorMessage, setImageUploadErrorMessage] = useState(null);

  const {
    data: pages,
    isLoading,
    refetch,
  } = useFetchVersionTwo(["wholesale"], "landing-page/wholesale");
  const allPages = pages?.data[0];

  console.log(allPages);

  useEffect(() => {
    if (allPages) {
      setTitle(allPages?.title);
      setSubTitle(allPages?.sub_title);
      setImageUrl(allPages?.reviews);
      setVideo(allPages?.video);
    }
  }, [allPages]);

  // --------------------------------------------handle image upload
  const handleImageUpload = (e) => {
    handleMultiImageUpload(
      e,
      imageUrl,
      setImageUrl,
      setImageUploadErrorMessage
    );
  };

  const updateFunction = () => {
    const url = `${server_url_v3}/landing-page/wholesale/update/${allPages?._id}`;
    const data = {
      title: title,
      sub_title: subTitle,
      reviews: imageUrl,
      video: video,
    };
    updateMethodHook(url, data, fetchFun, setLoading);
  };

  const fetchFun = () => {
    console.log("Post Data=====");
  };

  if (isLoading) {
    return (
      <div>
        <LoadingComponets />
      </div>
    );
  }

  // ------------------------remove image-----------------------------
  const handleRemoveImage = (index2) => {
    const update =  imageUrl.filter((item,index)=>index !==index2);
    setImageUrl(update)
  };

  return (
    <div className=" my-5">
      <div className=" flex  items-center justify-between">
        <h2 className=" font-semibold text-[25px]">Wholesale Landing Page</h2>
        <Link target="_blank" href={"/dropshipping"}>
          <button className=" bg-primary py-2 px-5 rounded-md text-white font-medium">
            View Page
          </button>
        </Link>
      </div>
      <div className=" mt-5 max-w-[900px] mx-auto ">
        <h2 className=" font-medium mb-5 text-[18px]">Update title</h2>
        <div>
          <div>
            <div className="w-full mb-4">
              <p className=" text-base font-bold mb-1">Page Title :</p>
              <textarea
                type="text"
                value={title}
                className="w-full rounded input p-2 h-[70px] input-bordered bg-transparent focus:border-primary duration-300 ease-in-out  outline-none"
                onChange={(e) => setTitle(e.target.value)}
                placeholder=" Enter Title"
              ></textarea>
            </div>

            <div className="w-full mb-4">
              <p className=" text-base font-bold mb-1">Page Sub Title :</p>
              <textarea
                type="text"
                value={subTitle}
                className="w-full rounded p-2 input h-[70px] input-bordered bg-transparent focus:border-primary duration-300 ease-in-out outline-none"
                onChange={(e) => setSubTitle(e.target.value)}
                placeholder=" Enter Sub Title"
              ></textarea>
            </div>

            <div className=" mt-5 mb-5">
              <p className=" text-base font-bold mb-1">Video Url (Youtube) :</p>
              <input
                type="text"
                value={video}
                onChange={(e) => setVideo(e.target.value)}
                placeholder="Enter Video Url (Youtube)"
                className="w-full rounded input py-3 px-5 input-bordered bg-transparent focus:border-primary duration-300 ease-in-out  outline-none"
              />
            </div>

            {/* ---------------gallery images----------------- */}
            <div className="w-full">
              <p className="text-sm font-bold mb-1">Gallery Images</p>
              <div className="">
                <div className="relative border-4 border-dashed w-full h-[150px]  text-center">
                  <BsCloudUploadFill
                    size={35}
                    className="text-primary mx-auto block  mt-8"
                  />
                  <p className="text-xl font-bold  text-slate-900">
                    Drag your image here
                  </p>
                  <span className="text-xs font-bold text-slate-900">
                    (Only *.jpeg and *.png images will be accepted)
                  </span>
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    className="opacity-0 absolute top-0 left-0 bottom-0 right-0 w-full h-full cursor-pointer"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {imageUrl?.map((img, index) => {
                    return (
                      <div
                        className="  w-[100px] h-auto relative p-1 bg-white shadow-md rounded-md mt-3 "
                        key={index}
                      >
                        <Image
                          src={img}
                          width="100"
                          height="2"
                          alt="category image"
                          className="w-full h-full object-contain "
                        />
                        <button
                          onClick={() => handleRemoveImage(index)}
                          className="btn btn-outline btn-warning rounded-full bg-red-700 absolute right-0 top-0 btn-xs"
                        >
                          x
                        </button>
                      </div>
                    );
                  })}
                  <div className="relative w-[100px] h-[100px] p-1 bg-white shadow-md rounded-md mt-3 flex justify-center items-center">
                    <span>
                      <BiImageAdd
                        onChange={handleImageUpload}
                        size={45}
                        className="text-primary cursor-pointer hover:text-slate-700"
                      />
                      <input
                        type="file"
                        onChange={handleImageUpload}
                        className="opacity-0 absolute top-0 left-0 bottom-0 right-0 w-full h-full cursor-pointer"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className=" flex items-center justify-center flex-1 mt-5">
              <button
                onClick={() => updateFunction()}
                className="py-2 px-5 bg-primary font-medium text-base rounded-md text-white"
              >
                Update
              </button>
            </div>
          </div>
        </div>

        <div className=" flex items-center gap-4 my-8">
          <div className="w-full h-[2px] bg-red-700"></div>
          <div className=" text-red-700">###</div>
          <div className="w-full h-[2px] bg-red-700"></div>
        </div>

        <div>
          <h2 className=" font-semibold mb-5 text-[25px]">
            হোলসেল একাউন্ট কার জন্য?
          </h2>

          <div>
            <ForWhom allPages={allPages} refetch={refetch} />
          </div>
        </div>

        <div className=" flex items-center gap-4 my-8">
          <div className="w-full h-[2px] bg-red-700"></div>
          <div className=" text-red-700">###</div>
          <div className="w-full h-[2px] bg-red-700"></div>
        </div>

        <div>
          <h2 className=" font-semibold mb-5 text-[25px]">
            হোলসেল একাউন্ট কেন আপনার জন্য সঠিক হতে পারে
          </h2>

          <div>
            <WhyForYou allPages={allPages} refetch={refetch} />
          </div>
        </div>

        <div className=" flex items-center gap-4 my-8">
          <div className="w-full h-[2px] bg-red-700"></div>
          <div className=" text-red-700">###</div>
          <div className="w-full h-[2px] bg-red-700"></div>
        </div>

        <div>
          <h2 className=" font-semibold mb-5 text-[25px]">
            হোলসেল একাউন্ট করলে যা যা পাচ্ছেন?
          </h2>

          <div>
            <WhyForYou2 allPages={allPages} refetch={refetch} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WholeSaleLanding;
