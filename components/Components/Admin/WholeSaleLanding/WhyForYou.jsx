import React, { useState } from "react";
import { server_url_v3 } from "../../../../lib/config";
import { updateMethodHook } from "../../../../lib/usePostHooks";
import swal from "sweetalert";
import { Icon } from "@iconify/react";
import { BsCloudUploadFill } from "react-icons/bs";
import Image from "next/image";

const WhyForYou = ({ allPages, refetch }) => {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  // --------------------------------------------handle image upload
  const imgUrl = `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`;
  const handleImageUpload = (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    fetch(imgUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        setImageUrl(result.data?.url);
      });
  };

  const updateFunction = () => {
    const url = `${server_url_v3}/landing-page/wholesale/${allPages?._id}`;

    if (title === "" || subTitle === "") {
      swal("error", "Please Enter all data", "error");
      console.log("error");
    } else {
      const data = {
        type: "benefits",
        data: {
          icon: imageUrl,
          title: title,
          dec: subTitle,
        },
      };
      updateMethodHook(url, data, fetchFun, setLoading);
    }
  };

  const deleteFunction = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this item.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `${server_url_v3}/landing-page/wholesale/delete/${allPages?._id}`;
        const data = {
          type: "benefits",
          bodyId: id,
        };
        updateMethodHook(url, data, fetchFun, setLoading);
      } else {
        swal("item is safe!");
      }
    });
  };

  const fetchFun = () => {
    refetch();
    setTitle("");
    setSubTitle("");
    setImageUrl("");
  };

  return (
    <div>
      <div>
        <div>
          <div className="w-full ">
            <p className=" text-base font-bold mb-1">Icon :</p>
            <div className="relative border-4 border-dashed w-full h-[120px]  text-center">
              <BsCloudUploadFill
                size={35}
                className="text-primary mx-auto block mt-3"
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
            {imageUrl && (
              <div className="  w-[100px] h-auto p-1 bg-white shadow-md rounded-md mt-3 ">
                <Image
                  src={imageUrl}
                  width="100"
                  height="2"
                  alt="category image"
                  className="w-full h-full object-contain "
                />
              </div>
            )}
          </div>

          <div className=" mt-5">
            <p className=" text-base font-bold mb-1">Title :</p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="w-full rounded input py-3 px-5 input-bordered bg-transparent focus:border-primary duration-300 ease-in-out  outline-none"
            />
          </div>
          <div className=" mt-5 mb-6">
            <p className=" text-base font-bold mb-1">Sub Title :</p>
            <input
              type="text"
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
              placeholder="Enter title"
              className="w-full rounded input py-3 px-5 input-bordered bg-transparent focus:border-primary duration-300 ease-in-out  outline-none"
            />
          </div>
          <div className="w-full flex items-center justify-center mb-5">
            <button
              onClick={() => updateFunction()}
              className="py-3 px-5 bg-primary w-[150px] font-medium text-base rounded-md text-white"
            >
              {loading ? "Loading..." : "Add New"}
            </button>
          </div>
        </div>
      </div>

      <div className=" pt-5 grid md:grid-cols-3 grid-cols-2 gap-5">
        {allPages?.benefits?.map((item, index) => (
          <div
            key={index}
            className=" relative flex items-center flex-col justify-start gap-3 border p-5 py-6 border-gray-300 duration-300 rounded-md hover:border-[#4CA46F]"
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
            <button
              onClick={() => deleteFunction(index)}
              className=" absolute right-[10px] top-[10px] text-[20px] text-red-400 hover:text-red-700 duration-300"
            >
              <Icon icon="mdi:delete" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyForYou;
