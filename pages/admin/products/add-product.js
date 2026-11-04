import React, { useContext, useState } from "react";
import { BsCloudUploadFill } from "react-icons/bs";
import DashboardLayout from '../../../components/Components/DashboardLayout';
import Image from "next/image";
import { TagsInput } from "react-tag-input-component";
import { useForm } from "react-hook-form";
import { BiImageAdd } from "react-icons/bi";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });
import Select from "react-select";
import swal from "sweetalert";
import StarRating from '../../../components/Shared/StarRating';
import {
  handleMultiImageUpload,
  uploadImage2,
  uploadMultipleFiles,
  uploadMultipleFiles2,
} from "../../../lib/imageUploader";
import ColorPicker from '../../../components/Shared/ColorPicker';
import { useCustomQuery } from '../../../components/hooks/useMyShopData';
import { RiAddBoxFill } from "react-icons/ri";
import CustomButtonLoading from '../../../components/Shared/CustomButtonLoading';
import DropImageCom from '../../../components/Components/DropImageCom';

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [selectedProductTag, setSelectedProductTag] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  const [richText, setValueOfRichText] = useState("");
  const [valueOfParantCategory, setValueOfParantCategory] = useState("");
  const [childCategories, setChildCategories] = useState([]);
  const [imageUploadErrorMessage, setImageUploadErrorMessage] = useState(null);
  const [selectedOption, setSelectedOption] = useState([]);
  const [slug, setSlug] = useState("");
  const [ratingValue, SetRatingValue] = useState(5);
  const [productColor, setProductColor] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  // for child category
  const [selectedOptionCategory, setSelectedOptionCategory] = useState(null);
  const { data: brands } = useCustomQuery(["brands"], "brands");
  const [imageLoading, setImageLoading] = useState(false);

  const {
    data: categories,
    isLoading,
    refetch,
  } = useCustomQuery(["categories"], "category/childCategory");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  //   ------------------------product add function --------uses react hooks fForm------------------------

  const clearFromData = () => {
    reset();
    setSelectedProductTag([]);
    setImageUrl([]);
    setValueOfRichText("");
    setValueOfParantCategory("");
    setChildCategories([]);
    setSelectedOption([]);
    setSlug("");
    setSelectedOptionCategory(null);
  };

  function convertToUrlPath(e) {
    const inputString = e.target.value.slice(0, 100);
    const lowerCaseString = inputString.toLowerCase();
    const urlPath = lowerCaseString.replace(/[^a-zA-Z0-9]+/g, "-");
    setSlug(urlPath);
  }

  const addProductHandler = (data) => {
    setLoading(true);
    const product = {
      name: data.name,
      sku: data.sku,
      path: data?.path || slug,
      description: richText,
      category: valueOfParantCategory,
      subCategory: selectedOptionCategory.map((child) => child.label),
      // productType: data.productType || "",
      quantity: Number(data.quantity),
      buyingPrice: Number(data.buyPrice),
      productPrice: Number(data.price),
      salePrice: Number(data.salePrice),
      wholesalePrice: Number(data.wholesalePrice),
      wholesaleStatus: data.wholesaleStatus,
      discount: Math.ceil(
        (1 - Number(data.salePrice) / Number(data.price)) * 100
      ),
      brand: data.brand,
      tags: selectedProductTag,
      imageURLs: imageUrl,
      imageURLs2: imageUrl || [""], //------------array
      size: selectedOption,
      ratingValue: ratingValue,
      youtube: data.youtube || "",
      status: data.status,
      productColor: productColor,
      free_delivery: data?.free_delivery,
      advance: Number(data?.advance),
    };
    // ------------------------------------------------post method here

    fetch("https://server-homeshopbd-2-kohl.vercel.app/api/v1/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === "success") {
          setLoading(false);
          swal("Product Added Successfully.", {
            icon: "success",
          });
          clearFromData();
        } else {
          setLoading(false);
          swal(
            result.error.includes("E11000")
              ? result.error.split(":").slice(-1)[0] + " already used! its uniq"
              : result.error,
            {
              icon: "error",
            }
          );
        }
      });
  };

  // --------------------------------------------handle multi image upload
  const handleImageUpload = (e) => {
    // const files = e.target.files[0];
    const files = Array.from(e.target.files);
    // uploadImage2(files, setImageUrl, setImageLoading);
    uploadMultipleFiles(files, setImageUrl, setImageLoading);
  };

  // ----------------------------filter with parent category--------------------

  const handleFilterWithParantCategory = (event) => {
    setValueOfParantCategory(event.target.value);
  };

  return (
    <DashboardLayout>
      <div className="mid-container ">
        <div className="p-7 bg-white mt-5 rounded">
          <h1 className="text-2xl font-semibold">Add Product</h1>
          <p className="text-neutral">
            Add your product and necessary information from here
          </p>
        </div>

        <form
          onSubmit={handleSubmit(addProductHandler)}
          className="mt-5 px-2 md:px-7"
        >
          {/* <div className="block md:flex gap-5 mb-4">
            <div className="w-[30%] text-lg font-semibold mt-3">
              <p>Product Images</p>
            </div>
            <div className="w-full md:w-[70%]  ">
              <div className="relative border-4 border-dashed w-full h-[150px]  text-center">
                {imageLoading ? (
                  <div className=" w-full h-full flex items-center justify-center text-[25px] font-bold">
                    <h2>Uploading...</h2>
                  </div>
                ) : (
                  <>
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
                      multiple
                      onChange={handleImageUpload}
                      className="opacity-0 absolute top-0 left-0 bottom-0 right-0 w-full h-full cursor-pointer"
                    />
                  </>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {imageUrl.map((img, index) => {
                  return (
                    <div
                      className="  w-[100px] h-auto p-1 bg-white shadow-md rounded-md mt-3 "
                      key={index}
                    >
                      <Image
                        src={img}
                        width="100"
                        height="2"
                        alt="category image"
                        className="w-full h-full object-contain "
                      />
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
                      multiple
                      onChange={handleImageUpload}
                      className="opacity-0 absolute top-0 left-0 bottom-0 right-0 w-full h-full cursor-pointer"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div> */}

          <DropImageCom
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            handleImageUpload={handleImageUpload}
            imageLoading={imageLoading}
          />

          <div className="block md:flex items-center gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>Product Title/Name</p>
            </div>
            <div className="w-full md:w-[70%]">
              <input
                type="text"
                {...register("name", { required: true })}
                className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                placeholder="Product Title"
                onChange={convertToUrlPath}
              />
            </div>
          </div>

          <div className="block md:flex items-center gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>Product SKU</p>
            </div>
            <div className="w-full md:w-[70%]">
              <input
                type="text"
                {...register("sku", { required: true })}
                className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                placeholder="Product SKU"
              />
            </div>
          </div>

          <div className="block md:flex items-center gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>Product Slug</p>
            </div>
            <div className="w-full md:w-[70%]">
              <input
                type="text"
                onChange={(e) => setSlug(e.target.value)}
                value={slug}
                className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                placeholder="Product Slug"
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

          <div className="block md:flex items-center gap-5 my-4">
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>Parent Category</p>
            </div>
            <div className="w-full md:w-[70%]">
              <select
                onChange={handleFilterWithParantCategory}
                value={valueOfParantCategory}
                required
                className="select select-bordered w-full  focus:outline-none "
                placeholder="Category"
                // {...register("category", { required: true })}
              >
                <option selected hidden>
                  Choose Category
                </option>
                {categories?.data?.parentCategories.map((category, index) => (
                  <option value={category} key={index}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="block md:flex items-center gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>Child Category</p>
            </div>
            <div className="w-full md:w-[70%]">
              <Select
                defaultValue={selectedOptionCategory}
                onChange={setSelectedOptionCategory}
                isMulti
                name="colors"
                required
                options={categories?.data?.childCategories.map((child) => {
                  return { value: child, label: child };
                })}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>
          </div>

          {/*   <div className="block md:flex items-center gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>Product Type</p>
            </div>
            <div className="w-full md:w-[70%]">
              <select
                className="select select-bordered w-full  focus:outline-none "
                {...register("productType", { required: true })}
              >
                <option hidden selected>
                  Types
                </option>
                <option>Shirt</option>
                <option>Cloths</option>
                <option>Leather</option>
                <option>Panjabi</option>
              </select>
            </div>
          </div> */}
          <div className="block md:flex items-center gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>Select Product Color</p>
            </div>
            <div className="w-full md:w-[70%]">
              <div className="flex gap-2 my-2">
                {productColor.map((clr, index) => (
                  <span key={index}>
                    <span
                      onClick={() => {
                        const arr = productColor.filter(
                          (color) => color !== clr
                        );
                        setProductColor(arr);
                      }}
                      className="w-7 h-7 rounded-full inline-block shadow-md hover:scale-105 cursor-crosshair hover:border-red-500 hover:border"
                      style={{ background: clr, color: clr }}
                    >
                      x
                    </span>
                  </span>
                ))}
              </div>

              <div>
                <div>
                  <span
                    onClick={() => setIsOpen(true)}
                    className="btn btn-xs btn-info text-white hover:text-black"
                  >
                    Pick Color
                  </span>
                  {productColor.length > 0 && (
                    <span
                      onClick={() => setProductColor([])}
                      className="btn btn-xs btn-warning ml-3 text-white hover:text-black"
                    >
                      Clear Color
                    </span>
                  )}
                </div>
              </div>

              <ColorPicker
                productColor={productColor}
                setProductColor={setProductColor}
                setIsOpen={setIsOpen}
                modalIsOpen={modalIsOpen}
              />
            </div>
          </div>

          <div className="block md:flex items-center gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>Product Brands</p>
            </div>
            <div className="w-full md:w-[70%]">
              <select
                className="select select-bordered w-full  focus:outline-none "
                {...register("brand", { required: true })}
              >
                <option hidden selected>
                  Choose Brand
                </option>
                <option value={"no brand"}>No Brand</option>
                {brands?.data?.result?.map((bnd) => (
                  <option key={bnd?._id} value={bnd.name}>
                    {bnd.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="block md:flex gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>Product Quantity</p>
            </div>
            <div className="w-full md:w-[70%]">
              <input
                type="number"
                {...register("quantity", { required: true })}
                className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                placeholder="Quantity"
              />
            </div>
          </div>
          <div className="block md:flex gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>Rating</p>
            </div>
            <div className="w-full md:w-[70%]">
              <StarRating
                SetRatingValue={SetRatingValue}
                ratingValue={ratingValue}
              />
            </div>
          </div>

          <div className="block md:flex gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>Buy Price</p>
            </div>
            <div className="w-full md:w-[70%]">
              <input
                type="number"
                {...register("buyPrice", { required: true })}
                className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                placeholder="Buy price"
              />
            </div>
          </div>

          <div className="block md:flex gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>Product Price</p>
            </div>
            <div className="w-full md:w-[70%]">
              <input
                type="number"
                {...register("price", { required: true })}
                className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                placeholder="Price"
              />
            </div>
          </div>

          <div className="block md:flex gap-5 mb-4">
            <div className="w-[30%] text-lg font-semibold mt-3">
              <p>Sale Price</p>
            </div>
            <div className="w-full md:w-[70%]">
              <input
                type="number"
                {...register("salePrice", { required: true })}
                className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                placeholder="Sale Price"
              />
            </div>
          </div>
          <div className="block md:flex gap-5 mb-4">
            <div className="w-[30%] text-lg font-semibold mt-3">
              <p>Wholesale Price</p>
            </div>
            <div className="w-full md:w-[70%]">
              <input
                type="number"
                {...register("wholesalePrice", { required: false })}
                className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                placeholder="Wholesale Price"
              />
            </div>
          </div>
          <div className="block md:flex items-center gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>Wholesale Status</p>
            </div>
            <div className="w-full md:w-[70%]">
              <select
                className="select select-bordered w-full  focus:outline-none "
                {...register("wholesaleStatus", { required: true })}
              >
                <option disabled selected>
                  Wholesale Status
                </option>
                <option value={"inactive"}>Inactive</option>
                <option value={"active"}>Active</option>
              </select>
            </div>
          </div>
          <div className="block md:flex gap-5 mb-4">
            <div className="w-[30%] text-lg font-semibold mt-3">
              <p>youtube Url</p>
            </div>
            <div className="w-full md:w-[70%]">
              <input
                type="text"
                {...register("youtube", { required: false })}
                className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                placeholder="Youtube URL"
              />
            </div>
          </div>

          <div className="block md:flex items-center gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold">
              <p>Product Tags</p>
            </div>
            <div className="w-full md:w-[70%]">
              <div>
                <TagsInput
                  value={selectedProductTag}
                  onChange={setSelectedProductTag}
                  placeHolder="enter tag name"
                />
                <em className="text-xs">press enter to add new tag</em>
              </div>
            </div>
          </div>

          <div className="block md:flex items-center gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold">
              <p>Size</p>
            </div>
            <div className="w-full md:w-[70%]">
              <div>
                <TagsInput
                  value={selectedOption}
                  onChange={setSelectedOption}
                  placeHolder="enter Size "
                />
                <em className="text-xs">
                  press enter to add new size ex: M, L, XL, XXL, etc..
                </em>
              </div>
            </div>
          </div>

          <div className="block md:flex items-center gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>Status</p>
            </div>
            <div className="w-full md:w-[70%]">
              <select
                className="select select-bordered w-full  focus:outline-none "
                {...register("status", { required: true })}
              >
                <option disabled selected>
                  Status
                </option>
                <option value={false}>Review</option>
                <option value={true}>Publish</option>
              </select>
            </div>
          </div>

          <div className="block md:flex items-center gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>Free Delivery (Wholesale)</p>
            </div>
            <div className="w-full md:w-[70%]">
              <select
                className="select select-bordered w-full  focus:outline-none "
                {...register("free_delivery", { required: true })}
              >
                <option disabled selected>
                  Free Delivery
                </option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
          </div>
          <div className="block md:flex gap-5 mb-4">
            <div className="w-[30%] text-lg font-semibold mt-3">
              <p>Advance Pay Amount (Wholesale)</p>
            </div>
            <div className="w-full md:w-[70%]">
              <input
                type="number"
                {...register("advance", { required: false })}
                className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                placeholder="Advance Pay Amount"
              />
            </div>
          </div>

          <div className="flex justify-end items-center gap-5 mb-4">
            <button className="btn btn-primary ml-auto text-white flex items-center gap-1">
              <RiAddBoxFill size={20} className="text-white" />{" "}
              {loading ? <CustomButtonLoading /> : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddProduct;

