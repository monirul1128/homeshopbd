import React, { useEffect, useState } from "react";
import {
  singleImageUploader,
  uploadImage,
  uploadImageTwo,
} from "../../../../lib/imageUploader";
import { useForm } from "react-hook-form";
import server_url from "../../../../lib/config";
import { updateMethodHook } from "../../../../lib/usePostHooks";
import Image from "next/image";

const EditBannerInfo = ({ banner, refetch }) => {
  const [imageUrl, setImageUrl] = useState(banner.image);
  const [imageUrl2, setImageUrl2] = useState(banner.image2);
  const [errorMessage, setImageUploadErrorMessage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const handleImageUpload = (e) => {
    const files = e.target.files[0];
    uploadImage(files, setImageUrl, setImageLoading);
    uploadImageTwo(files, setImageUrl2, setImageLoading);
  };

  const url = `${server_url}/banner/${banner._id}`;
  const handleUpdateBanner = (data) => {
    if (!imageUrl) {
      return swal("error", "please upload a image", "error");
    }

    const newData = {
      title: data.title,
      type: data.type,
      image: imageUrl,
      image2: imageUrl2,
    };
    updateMethodHook(url, newData, refetch);
  };

  useEffect(() => {
    if (banner) {
      setImageUrl(banner.image);
      setImageUrl2(banner.image2);
      setValue("type", banner.type);
      setValue("title", banner.title);
    }
  }, [banner]);

  let require = <span className="text-red-500">*</span>;

  return (
    <form
      onSubmit={handleSubmit(handleUpdateBanner)}
      className="mt-8 flex w-full md:w-[700px] flex-col items-center gap-6"
    >
      <div className=" w-full flex flex-col gap-5 md:flex-row">
        <div className=" w-full">
          <label
            for="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title {require}
          </label>

          <input
            type="text"
            id="title"
            {...register("title", { required: false })}
            placeholder="Banner Title"
            className="input mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
          />
        </div>

        <div className="w-full">
          <label for="role" className="block text-sm font-medium text-gray-700">
            Select Banner Type
          </label>
          <select
            {...register("type", { required: false })}
            className="select select-bordered shadow-sm w-full mt-1"
          >
            <option disabled selected hidden>
              Select
            </option>
            <option value={"main"}>Main</option>
            <option value={"bottom"}>Bottom</option>
          </select>
        </div>
      </div>

      <div className=" w-full ">
        <fieldset className="w-full space-y-1 text-gray-800">
          <label for="files" className="block text-sm font-medium">
            Banner Image
          </label>
          <div className="flex">
            <input
              onChange={handleImageUpload}
              type="file"
              name="files"
              id="files"
              className="px-8 py-12 w-full  border-2 border-dashed rounded-md border-gray-300 text-gray-600 bg-gray-100"
            />
          </div>
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="profile pic"
              width={100}
              height={100}
              className="w-[200px] h-[100px] rounded-md"
            />
          )}
        </fieldset>
      </div>
      <button className="bg-primary font-bold uppercase p-4 w-[10rem] py-2 rounded-md text-white">
        Save
      </button>
    </form>
  );
};

export default EditBannerInfo;
