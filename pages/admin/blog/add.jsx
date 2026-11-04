import React, { useState } from "react";
import DashboardLayout from "../../../components/Components/DashboardLayout";
import AdminDashboardBreadcrumb from "../../../components/Shared/AdminDashboardBreadcrumb";
import { useForm } from "react-hook-form";
import { postMethodHook } from "../../../lib/usePostHooks";
import server_url from "../../../lib/config";
import "react-datepicker/dist/react-datepicker.css";
import dynamic from "next/dynamic";
import { uploadImage, uploadImageTwo } from "../../../lib/imageUploader";
import { BsCloudUploadFill } from "react-icons/bs";
import Image from "next/image";
import AuthUser from "../../../lib/AuthUser";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });

const AddBlog = () => {
  const [loading, setLoading] = useState(false);
  const [slug, setSlug] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");
  const [richText, setValueOfRichText] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  const { userInfo } = AuthUser();

  const handleImageUpload = (e) => {
    const files = e.target.files[0];
    uploadImage(files, setImageUrl, setImageLoading);
    uploadImageTwo(files, setImageUrl2, setImageLoading);
  };

  function convertToUrlPath(e) {
    const inputString = e.target.value.slice(0, 100);
    const lowerCaseString = inputString.toLowerCase();
    const urlPath = lowerCaseString.replace(/[^a-zA-Z0-9]+/g, "-");
    setSlug(urlPath);
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const handelFun = () => {
    setValueOfRichText("");
    setImageUrl("");
    setSlug("");
  };

  const handleAddCoupon = (data) => {
    setLoading(true);

    const bodyData = {
      title: data.title,
      path: slug,
      image: imageUrl,
      image2: imageUrl2,
      sort_description: data.sort_description,
      description: richText,
      user: userInfo._id,
    };

    const url = server_url + "/blog";
    postMethodHook(url, bodyData, handelFun, setLoading, reset);
  };

  return (
    <DashboardLayout>
      <div className="mid-container">
        <AdminDashboardBreadcrumb
          title={"Add Blog"}
          subtitle={"Add your blog and necessary information from here"}
        />
        <div className="mt-5 md:px-7">
          {/* ----------------------end image------------------- */}
          <form onSubmit={handleSubmit(handleAddCoupon)}>
            <div className="md:flex block items-center gap-5 mb-4">
              <div className="w-full md:w-[30%] text-lg font-semibold">
                <p>Blog title</p>
              </div>
              <div className="w-full md:w-[70%]">
                <input
                  type={"text"}
                  {...register("title", { required: true })}
                  className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                  placeholder="Blog Title "
                  onChange={convertToUrlPath}
                />
              </div>
            </div>

            <div className="block md:flex items-center gap-5 mb-4">
              <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
                <p>Blog path</p>
              </div>
              <div className="w-full md:w-[70%]">
                <input
                  type="text"
                  onChange={(e) => setSlug(e.target.value)}
                  value={slug}
                  className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                  placeholder="Blog Path"
                />
              </div>
            </div>

            <div className="md:flex block items-start gap-5 mb-4">
              <div className="w-full md:w-[30%] text-lg font-semibold">
                <p>Sort Description</p>
              </div>
              <div className="w-full md:w-[70%]">
                <textarea
                  type={"text"}
                  {...register("sort_description", { required: false })}
                  className="w-full rounded py-3 input h-[150px] input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                  placeholder="Blog sort description"
                />
              </div>
            </div>

            <div className="block md:flex gap-5 mb-8">
              <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
                <p>Product Description</p>
              </div>
              <div className="w-full md:w-[70%]">
                <ReactQuill
                  theme="snow"
                  value={richText}
                  onChange={setValueOfRichText}
                  style={{ height: 200, marginBottom: 12 }}
                />
              </div>
            </div>

            <div className="block md:flex items-start pt-7 gap-5 mb-4">
              <div className="w-full md:w-[30%] text-lg font-semibold">
                <p>Blog Image</p>
              </div>
              <div className="w-full md:w-[70%]  ">
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

            <div className="md:flex block items-center gap-5 mb-4">
              <div className="w-[30%] text-lg font-semibold md:block hidden"></div>
              <div className="w-full md:w-[70%]">
                <input
                  type={"submit"}
                  disabled={loading}
                  className="btn btn-primary w-full font-medium text-white"
                  value={loading ? "Loading...." : "Add Blog"}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddBlog;
