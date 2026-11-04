import React, { useState } from "react";
import { singleImageUploader, uploadImage, uploadImageTwo } from "../../../../lib/imageUploader";
import { useForm } from "react-hook-form";
import server_url from "../../../../lib/config";
import swal from "sweetalert";
import { postMethodHook } from "../../../../lib/usePostHooks";
import Image from "next/image";
import CustomButtonLoading from '../../../components/Shared/CustomButtonLoading';

const AddBanner = ({ setAddBanner, refetch }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUrl2, setImageUrl2] = useState(null);
  const [errorMessage, setImageUploadErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false)

  console.log(imageUrl,imageUrl2)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const handleImageUpload = (e) => {
    const files = e.target.files[0];
    uploadImage(files, setImageUrl, setImageLoading);
    uploadImageTwo(files, setImageUrl2, setImageLoading);
  };
  const url = `${server_url}/banner`;

  const handleAddBanner = (data) => {
    setLoading(true)
    if (imageUrl) {
      const newData = {
        title: data.title,
        name: data.name,
        type: data.type,
        image: imageUrl || "",
        image2: imageUrl2 || "",
      };
      postMethodHook(url, newData, refetch, setLoading);
      reset();
      setImageUploadErrorMessage(null)
    }
  };
  let require = <span className="text-red-500">*</span>;

  return (
    <div className="bg-white shadow-md rounded-md p-4 md:p-8 my-5 relative">
      <span
        onClick={() => setAddBanner(false)}
        className="btn-square btn btn-warning btn-sm text-white hover:bg-red-500 absolute right-2 top-2"
      >
        X
      </span>
      <form
        onSubmit={handleSubmit(handleAddBanner)}
        className="mt-8 grid grid-cols-6 gap-6"
      >
        <div className="col-span-6 sm:col-span-3">
          <label
            for="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title {require}
          </label>

          <input
            type="text"
            id="title"
            {...register("title", { required: true })}
            placeholder="Banner Title"
            className="input mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
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

        <div className="col-span-6 ">
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
                className="px-8 py-12 w-full border-2 border-dashed rounded-md border-gray-300 text-gray-600 bg-gray-100"
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
        <button type="submit" className="bg-primary font-bold uppercase flex justify-center p-4 w-[10rem] py-2 rounded-md text-white">
          {
            (loading)?<CustomButtonLoading /> :'Save'
          }
        </button>
      </form>
    </div>
  );
};
export default AddBanner;
