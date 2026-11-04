import React, { useEffect, useState } from "react";
import AuthUser from "../../../lib/AuthUser";
import server_url from "../../../lib/config";
import { singleImageUploader, uploadImage } from "../../../lib/imageUploader";
import { updateMethodHook, updateMyShopHook } from "../../../lib/usePostHooks";
import DashboardLayout from '../../../components/Components/DashboardLayout';
import AdminDashboardBreadcrumb from '../../../components/Shared/AdminDashboardBreadcrumb';
import { useForm } from "react-hook-form";
import { getMyShopData } from "../../../lib/helper";
import { useQuery } from "react-query";
import Image from "next/image";
import CustomButtonLoading from '../../../components/Shared/CustomButtonLoading';
const MyShop = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUrl2, setImageUrl2] = useState(null);
  const [imageUploadErrorMessage, setImageUploadErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { userInfo } = AuthUser();
  const [imageLoading, setImageLoading] = useState(false);

  const [user, setUser] = useState({});

  const { data, isLoading, refetch } = useQuery(["my-shop"], getMyShopData);

  useEffect(() => {
    if (data) {
      setImageUrl(data?.data?.logo);
      setImageUrl2(data?.data?.logo2);
      setUser(data);
    }
  }, [data]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
    setValue,
    reset,
  } = useForm();

  const handleImageUpload = (e) => {
    const files = e.target.files[0];
    uploadImage(files, setImageUrl, setImageLoading);
  };
  const url = `${server_url}/my-shop/update-shop?uid=${data?.data?._id}`;

  // ---------------update shop data------------------
  const handleUpdateUser = (data) => {
    setLoading(true);
    const newData = {
      shopName: data?.shopName || user?.data?.shopName,
      email: data?.email || user?.data?.email,
      address: data?.address || user?.data?.address,
      phone: data?.phone || user?.data?.phone,
      logo: imageUrl || "",
      logo2: imageUrl2 || "",
      facebookPage: data?.facebookPage || user?.data?.facebookPage,
      facebookGroup: data?.facebookGroup || user?.data?.facebookGroup,
      Youtube: data?.Youtube || user?.data?.Youtube,
      twitter: data?.twitter || user?.data?.twitter,
      linkedin: data?.linkedin || user?.data?.linkedin,
      aboutShop: data?.aboutShop || user?.data?.aboutShop,
      accountActive: data?.accountActive || user?.data?.accountActive,
      pointBalance: data?.pointBalance || user?.data?.pointBalance,
      renewActive: data?.renewActive,
      activeText: data.activeText,
      renewText: data?.renewText,
    };

    updateMyShopHook(url, newData, refetch, setLoading);
  };

  useEffect(() => {
    if (user?.data) {
      setValue("renewActive", user?.data?.renewActive);
      setValue("accountActive", user?.data?.accountActive);
      setValue("activeText", user?.data?.activeText);
      setValue("renewText", user?.data?.renewText);
    }
  }, [user?.data]);

  let require = <span className="text-red-500">*</span>;

  return (
    <DashboardLayout>
      <AdminDashboardBreadcrumb title={"MY SHOP"} />
      <div className="">
        <form
          onSubmit={handleSubmit(handleUpdateUser)}
          className="mt-8 grid grid-cols-6 gap-6"
        >
          <div className="col-span-6 sm:col-span-3">
            <label
              for="shopName"
              className="block text-sm font-medium text-gray-700"
            >
              Shop Name {require}
            </label>

            <input
              defaultValue={user?.data?.shopName}
              type="text"
              id="shopName"
              {...register("shopName", { required: false })}
              placeholder="Shop Name"
              className="input mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              for="Phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone {require}
            </label>

            <input
              type="text"
              id="Phone"
              defaultValue={user?.data?.phone}
              {...register("phone", { required: false })}
              placeholder="Phone"
              className="input mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              for="Email"
              className="block text-sm font-medium text-gray-700"
            >
              Email {require}
            </label>

            <input
              type="email"
              defaultValue={user?.data?.email}
              id="Email"
              {...register("email", { required: false })}
              placeholder="Email"
              className="input mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              for="Address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>

            <input
              type="text"
              id="Address"
              defaultValue={user?.data?.address}
              {...register("address", { required: false })}
              placeholder="Address"
              className="input mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              for="facebookPage"
              className="block text-sm font-medium text-gray-700"
            >
              FacebookPage
            </label>

            <input
              type="text"
              id="facebookPage"
              defaultValue={user?.data?.facebookPage}
              {...register("facebookPage", { required: false })}
              placeholder="facebookPage"
              className="input mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              for="facebookGroup"
              className="block text-sm font-medium text-gray-700"
            >
              facebookGroup
            </label>

            <input
              type="text"
              id="facebookGroup"
              defaultValue={user?.data?.facebookGroup}
              {...register("facebookGroup", { required: false })}
              placeholder="facebookGroup"
              className="input mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              for="Youtube"
              className="block text-sm font-medium text-gray-700"
            >
              Youtube
            </label>

            <input
              type="text"
              id="Youtube"
              defaultValue={user?.data?.Youtube}
              {...register("Youtube", { required: false })}
              placeholder="Youtube"
              className="input mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              for="twitter"
              className="block text-sm font-medium text-gray-700"
            >
              twitter
            </label>

            <input
              type="text"
              id="twitter"
              defaultValue={user?.data?.twitter}
              {...register("twitter", { required: false })}
              placeholder="twitter"
              className="input mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              for="linkedin"
              className="block text-sm font-medium text-gray-700"
            >
              linkedin
            </label>

            <input
              type="text"
              id="linkedin"
              defaultValue={user?.data?.linkedin}
              {...register("linkedin", { required: false })}
              placeholder="linkedin"
              className="input mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <div className="">
                <label
                  for="aboutShop"
                  className="block text-sm font-medium text-gray-700"
                >
                  About Shop
                </label>

                <textarea
                  type="text"
                  id="aboutShop"
                  defaultValue={user?.data?.aboutShop}
                  {...register("aboutShop", { required: false })}
                  placeholder="aboutShop"
                  className="textarea textarea-bordered  w-full mt-1 "
                  rows={10}
                ></textarea>
              </div>
            </div>
            <div className="grid gap-5">
              <div className="">
                <label
                  for="linkedin"
                  className="block text-sm font-medium text-gray-700"
                >
                  Account Active Balance
                </label>

                <input
                  type="text"
                  id="linkedin"
                  {...register("accountActive", { required: false })}
                  placeholder="Account Active Balance"
                  className="input mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="">
                <label
                  for="renewActive"
                  className="block text-sm font-medium text-gray-700"
                >
                  Renew Balance
                </label>

                <input
                  type="text"
                  id="renewActive"
                  {...register("renewActive", { required: false })}
                  placeholder="Account Renew Balance"
                  className="input mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="">
                <label
                  for="linkedin"
                  className="block text-sm font-medium text-gray-700"
                >
                  Point Balance
                </label>

                <input
                  type="text"
                  id="linkedin"
                  defaultValue={user?.data?.pointBalance}
                  {...register("pointBalance", { required: false })}
                  placeholder="Account point Balance"
                  className="input mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="">
                <label
                  for="activeText"
                  className="block text-sm font-medium text-gray-700"
                >
                  Reseller Account active Text
                </label>

                <textarea
                  type="text"
                  id="activeText"
                  {...register("activeText", { required: false })}
                  placeholder="Reseller Account  active Text"
                  className="textarea textarea-bordered  w-full mt-1 "
                  rows={3}
                ></textarea>
              </div>

              <div className="">
                <label
                  for="renewText"
                  className="block text-sm font-medium text-gray-700"
                >
                  Reseller Account Renew Text
                </label>

                <textarea
                  type="text"
                  id="renewText"
                  {...register("renewText", { required: false })}
                  placeholder="Reseller Account  Renew Text"
                  className="textarea textarea-bordered  w-full mt-1 "
                  rows={3}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="col-span-6 ">
            <fieldset className="w-full space-y-1 text-gray-800">
              <label for="files" className="block text-sm font-medium">
                Logo
              </label>
              <div className="flex">
                <input
                  onChange={handleImageUpload}
                  type="file"
                  name="files"
                  id="files"
                  className="px-8 py-12 border-2 border-dashed rounded-md border-gray-300 text-gray-600 bg-gray-100"
                />
              </div>
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt="profile pic"
                  width={100}
                  height={100}
                  className="w-10 h-10 rounded-md"
                />
              )}
            </fieldset>
          </div>
          <button className="bg-primary flex justify-center font-bold uppercase p-4 w-[10rem] py-2 rounded-md text-white">
            {loading ? <CustomButtonLoading /> : "Save"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default MyShop;

