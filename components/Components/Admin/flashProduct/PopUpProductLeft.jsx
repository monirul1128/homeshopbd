import React, { useState } from "react";
import { updateMethodHook } from "../../../../lib/usePostHooks";
import server_url from "../../../../lib/config";
import SelectProductItemAll from '../../../Shared/drawer/SelectProductItemAll';
import { uploadImage } from "../../../../lib/imageUploader";
import Image from "next/image";
import { BsCloudUploadFill } from "react-icons/bs";

const PopUpProductLeft = ({
  getProductId,
  setGetProductId,
  id,
  time,
  setTime,
  imageUrl,
  setImageUrl,
  title,
  setTitle,
  status,
  setStatus,
}) => {
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const handleSelectProduct = (product) => {
    const isSelected = Boolean(
      getProductId.find((grpStud) => grpStud._id === product._id)
    );
    if (isSelected) {
      setGetProductId(getProductId.filter((item) => item._id !== product._id));
    } else {
      setGetProductId((pre) => [...pre, product]);
    }
  };

  const handleImageUpload = (e) => {
    const files = e.target.files[0];
    uploadImage(files, setImageUrl, setImageLoading);
  };

  const url = `${server_url}/banner/flash/update/${id}`;

  const productId = getProductId.map((item) => item._id);

  const handleAddBanner = (data) => {
    setLoading(true);
    const newData = {
      product: productId,
      end_time: time,
      image: imageUrl,
      title: title,
      status: status,
    };
    updateMethodHook(url, newData, setLoading);
  };

  const handelChange = (e) => {
    const searchValue = e.target.value;
    setTime(searchValue);
  };

  return (
    <div className="bg-white shadow-md p-5 rounded-md min-h-screen">
      <div className=" pb-4 flex items-center md:flex-row flex-col justify-between border-b">
        <h2 className=" w-full text-xl font-semibold">Pop Up Modal </h2>
      </div>

      <div className=" my-5">
        <div className=" mb-4">
          <label htmlFor="date" className=" text-sm">
            Modal Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title ...."
            className="input input-bordered  block w-full mt-2"
            style={{ outline: "none" }}
          />
        </div>

        <div>
          <label htmlFor="date" className=" text-sm">
            End Date
          </label>
          <input
            type="date"
            id="date"
            value={time}
            onChange={handelChange}
            placeholder="Search Product...."
            className="input input-bordered  block w-full mt-2"
            style={{ outline: "none" }}
            name="search"
          />
        </div>

        <div className=" mt-4 mb-4">
          <label htmlFor="date" className=" text-sm">
            Modal Title
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="select select-bordered w-full  focus:outline-none "
          >
            <option value={"active"}>Active</option>
            <option value={"inactive"}>InActive</option>
          </select>
        </div>

        <div className=" items-center gap-5 mb-4 mt-5">
          <div className="w-full text-sm mb-2">
            <p>Modal Image</p>
          </div>
          <div className="w-full ">
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
        </div>
      </div>
      <div className="h-[80vh] grid grid-cols-3 overflow-y-auto">
        {getProductId.map((product) => (
          <SelectProductItemAll
            key={product?._id}
            product={product}
            handleSelectProduct={handleSelectProduct}
            getProductId={getProductId}
          />
        ))}
      </div>
      <div className=" flex items-center justify-center mt-3">
        <button
          disabled={loading}
          onClick={() => handleAddBanner()}
          className=" py-2 px-5 bg-primary text-white shadow-md rounded-md hover:bg-green-500 duration-300 transition-all"
        >
          {loading ? "Loading..." : "Add PopUp Modal"}{" "}
        </button>
      </div>
    </div>
  );
};

export default PopUpProductLeft;
