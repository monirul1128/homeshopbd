import React, { useContext, useEffect, useState } from "react";
import { BsCloudUploadFill } from "react-icons/bs";
import DashboardLayout from '../../../Components/Components/DashboardLayout";
import Image from "next/image";
import { TagsInput } from "react-tag-input-component";
import { useForm } from "react-hook-form";
import { BiImageAdd } from "react-icons/bi";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import swal from "sweetalert";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });
import Select from "react-select";
import AdminDashboardBreadcrumb from '../../../Components/Shared/AdminDashboardBreadcrumb";
import ColorPicker from '../../../Components/Shared/ColorPicker";
import { useCustomQuery } from '../../../Components/hooks/useMyShopData";
import CustomButtonLoading from '../../../Components/Shared/CustomButtonLoading";
import {
  uploadImage2,
  uploadMultipleFiles,
  uploadMultipleFiles2,
} from "../../../lib/imageUploader";
import DropImageCom from '../../../Components/Components/DropImageCom";

const sizeOptions = [
  { value: "Default", label: "Default" },
  { value: "Small", label: "Small" },
  { value: "Medium", label: "Medium" },
  { value: "Large", label: "Large" },
  { value: "xl", label: "xl" },
  { value: "Xll", label: "Xll" },
];

const UpdateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [selectedProductTag, setSelectedProductTag] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  const [richText, setValueOfRichText] = useState("");
  const [valueOfParantCategory, setValueOfParantCategory] = useState("");
  const [childCategories, setChildCategories] = useState([]);
  const [imageUploadErrorMessage, setImageUploadErrorMessage] = useState(null);
  const [product, setProduct] = useState({});
  const [selectedOption, setSelectedOptionSize] = useState([]);
  const [ratingValue, SetRatingValue] = useState(0);
  const [productColor, setProductColor] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  // for child category
  const [selectedOptionCategory, setSelectedOptionCategory] = useState(null);
  const { data: brands } = useCustomQuery(["brands"], "brands");
  const [imageLoading, setImageLoading] = useState(false);
  const [slug, setSlug] = useState("");

  const router = useRouter();
  const id = router.query.id;

  let url = `https://server-homeshopbd-2-kohl.vercel.app/api/v1/product/${id}`;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  console.log(product);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setProduct(data.data);
          setSelectedProductTag(data.data.tags);
          setSelectedOptionSize(data.data.size);
          setImageUrl(data.data.imageURLs);
          setValueOfRichText(data.data.description);
          SetRatingValue(data?.data?.ratingValue || 0);
          setProductColor(data?.data?.productColor || []);
          setValueOfParantCategory(data.data.category);
          setChildCategories(data?.data?.subCategory);
          setValue("wholesaleStatus", data?.data?.wholesaleStatus);
          setValue("status", data?.data?.status);
          setValue("free_delivery", data?.data?.free_delivery);
          setValue("advance", data?.data?.advance);
          setSlug(data?.data?.path);
        }
      });
  }, [id]);

  /*  if (product.name) {
   
  } */

  useEffect(() => {
    if (childCategories.length > 0) {
      const option = childCategories.map((child) => {
        return { value: child, label: child };
      });

      setSelectedOptionCategory(option);
    }
  }, [childCategories]);
  console.log("child category", selectedOptionCategory);
  const {
    data: categories,
    isLoading,
    refetch,
  } = useCustomQuery(["categories"], "category/childCategory");

  //   ------------------------product add function --------uses react hooks fForm------------------------
  // --------------------update product handler--------------------
  const addProductHandler = (data) => {
    setLoading(true);
    const updateProduct = {
      name: data.name || product.name,
      sku: data.sku || product.name,
      path: slug || product.path,
      description: richText,
      category: valueOfParantCategory,
      subCategory: selectedOptionCategory.map((child) => child.label),
      // productType: data.productType,
      quantity: Number(data.quantity) || product.quantity,
      buyingPrice: Number(data.buyPrice) || product.buyingPrice,
      productPrice: Number(data.price) || product.productPrice,
      salePrice: Number(data.salePrice) || product.salePrice,
      wholesalePrice: Number(data.wholesalePrice) || product.wholesalePrice,
      wholesaleStatus: data.wholesaleStatus || product.wholesaleStatus,
      discount:
        Math.ceil((1 - Number(data.salePrice) / Number(data.price)) * 100) ||
        product.discount,
      brand: data.brand,
      tags: selectedProductTag,
      imageURLs: imageUrl,
      imageURLs2: imageUrl, //------------array
      size: selectedOption,
      ratingValue: data.ratingValue || product.ratingValue,
      youtube: data.youtube || product.youtube,
      status: data.status,
      productColor: productColor,
      free_delivery: data?.free_delivery || product.free_delivery,
      advance: Number(data?.advance),
    };

    // ------------------------------------------------post method here
    fetch(
      `https://server-homeshopbd-2-kohl.vercel.app/api/v1/product/${product._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateProduct),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.status == "success") {
          setLoading(false);
          swal("Product updated successfully.", {
            icon: "success",
          });
        } else {
          setLoading(false);
          swal(result.error, {
            icon: "error",
          });
        }
      });
  };

  // --------------------------------------------handle image upload
  const imgUrl = `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`;
  const handleImageUpload = (e) => {
    // const files = e.target.files[0];
    const files = Array.from(e.target.files);
    // uploadImage2(files, setImageUrl, setImageLoading);
    uploadMultipleFiles(files, setImageUrl, setImageLoading);
  };
  // ------------------------remove image-----------------------------
  const handleRemoveImage = (name) => {
    const update = imageUrl.filter((it) => it !== name);
    setImageUrl(update);
  };

  // ----------------------------filter with parent category--------------------

  const handleFilterWithParantCategory = (event) => {
    setValueOfParantCategory(event.target.value);
  };

  function convertToUrlPath(e) {
    const inputString = e.target.value.slice(0, 100);
    const lowerCaseString = inputString.toLowerCase();
    const urlPath = lowerCaseString.replace(/[^a-zA-Z0-9]+/g, "-");
    setSlug(urlPath);
  }

  return (
    <DashboardLayout>
      <div className="mid-container">
        <AdminDashboardBreadcrumb
          title={"Update Product"}
          // subtitle={" Update your product and necessary information from here"}
        />

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
                      className="  w-[100px] h-auto p-1 bg-white shadow-md rounded-md mt-3 relative"
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
                        onClick={() => handleRemoveImage(img)}
                        type="button"
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
                defaultValue={product.name}
                type="text"
                {...register("name", { required: false })}
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
                defaultValue={product.sku}
                type="text"
                {...register("sku", { required: false })}
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

          <div className="block md:flex gap-5 mb-4">
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
              ;
            </div>
          </div>

          <div className="block md:flex items-center gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>Parent Category</p>
            </div>
            <div className="w-full md:w-[70%]">
              <select
                onChange={handleFilterWithParantCategory}
                value={valueOfParantCategory}
                className="select select-bordered w-full  focus:outline-none "
                placeholder="Category"
                // {...register("category", { required: false })}
              >
                <option disabled selected>
                  Category
                </option>
                {categories?.data?.parentCategories.map((category, index) => (
                  <option value={category} key={index}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* -----------------------------------child category---------------------- */}
          <div className="block md:flex items-center gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>Child Category</p>
            </div>
            <div className="w-full md:w-[70%]">
              {selectedOptionCategory && (
                <Select
                  defaultValue={selectedOptionCategory}
                  onChange={setSelectedOptionCategory}
                  isMulti
                  name="colors"
                  options={categories?.data?.childCategories.map((child) => {
                    return { value: child, label: child };
                  })}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              )}
            </div>
          </div>

          {/*  <div className="block md:flex items-center gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>Product Type</p>
            </div>
            <div className="w-full md:w-[70%]">
              <select
                className="select select-bordered w-full  focus:outline-none "
                {...register("productType", { required: false })}
                defaultValue={product.productType}
              >
                <option value={"Shirt"} selected={product.brand === "Shirt"}>
                  Shirt
                </option>
                <option value={"Cloths"} selected={product.brand === "Cloths"}>
                  Cloths
                </option>
                <option
                  value={"Leather"}
                  selected={product.brand === "Leather"}
                >
                  Leather
                </option>
                <option
                  value={"Panjabi"}
                  selected={product.brand === "Panjabi"}
                >
                  Panjabi
                </option>
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
                defaultValue={product.brand}
                className="select select-bordered w-full  focus:outline-none "
                {...register("brand", { required: false })}
              >
                <option
                  value={"no brand"}
                  selected={product.brand === "no brand"}
                >
                  No Brand
                </option>
                {brands?.data?.result?.map((bnd) => (
                  <option
                    key={bnd?._id}
                    selected={product.brand === bnd.name}
                    value={bnd.name}
                  >
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
                defaultValue={product.quantity}
                type="number"
                {...register("quantity", { required: false })}
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
              <input
                type="number"
                className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                placeholder="Type Product Rating 0 to 5"
                id="number-input"
                {...register("ratingValue", {
                  required: false,
                  min: 0,
                  max: 5,
                  validate: (value) => /^[0-9]*$/.test(value), // only allow integer values
                })}
                defaultValue={product.ratingValue}
              />
              {errors.ratingValue && (
                <p>Enter a valid number between 0 and 5</p>
              )}
            </div>
          </div>

          <div className="block md:flex gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>Buy Price</p>
            </div>
            <div className="w-full md:w-[70%]">
              <input
                defaultValue={product.buyingPrice}
                type="number"
                {...register("buyPrice", { required: false })}
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
                defaultValue={product.productPrice}
                type="number"
                {...register("price", { required: false })}
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
                defaultValue={product.salePrice}
                type="number"
                {...register("salePrice", { required: false })}
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
                defaultValue={product.wholesalePrice}
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
                defaultValue={product.wholesaleStatus}
                className="select select-bordered w-full  focus:outline-none "
                {...register("wholesaleStatus", { required: true })}
              >
                <option disabled selected>
                  Wholesale Status
                </option>
                <option
                  value={"inactive"}
                  selected={product.wholesaleStatus === "inactive"}
                >
                  Inactive
                </option>
                <option
                  value={"active"}
                  selected={product.wholesaleStatus === "active"}
                >
                  Active
                </option>
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
                defaultValue={product.youtube}
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
                <em className="text-xs">press enter or comma to add new tag</em>
              </div>
            </div>
          </div>

          <div className="block md:flex items-center gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold">
              <p>Size</p>
            </div>
            <div className="w-full md:w-[70%]">
              <div className="w-full md:w-[70%]">
                <div>
                  <TagsInput
                    value={selectedOption}
                    onChange={setSelectedOptionSize}
                    placeHolder="enter Size "
                  />
                  <em className="text-xs">
                    press enter to add new size ex: M, L, XL, XXL, etc..
                  </em>
                </div>
              </div>
            </div>
          </div>

          <div className="block md:flex items-center gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>Status</p>
            </div>
            <div className="w-full md:w-[70%]">
              <select
                defaultValue={product.status}
                className="select select-bordered w-full  focus:outline-none "
                {...register("status", { required: false })}
              >
                <option value={true} selected={product.status === true}>
                  Review
                </option>
                <option value={false} selected={product.status === false}>
                  Publish
                </option>
              </select>
            </div>
          </div>

          <div className="block md:flex items-center gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>Free Delivery (Wholesale)</p>
            </div>
            <div className="w-full md:w-[70%]">
              <select
                defaultValue={product.free_delivery}
                className="select select-bordered w-full  focus:outline-none "
                {...register("free_delivery", { required: true })}
              >
                <option disabled selected>
                  Free Delivery
                </option>
                <option value={true} selected={product.free_delivery === true}>
                  Yes
                </option>
                <option
                  value={false}
                  selected={product.free_delivery === false}
                >
                  No
                </option>
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
            <button className="btn btn-primary ml-auto text-white">
              {loading ? <CustomButtonLoading /> : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default UpdateProduct;

