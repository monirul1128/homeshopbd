import React, { useState } from "react";
import UserDashLayout from '../../../Components/Components/userDashLayout";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { singleImageUploader, uploadImage } from "../../../lib/imageUploader";
import AuthUser from "../../../lib/AuthUser";
import { getUsersById } from "../../../lib/helper";
import Image from "next/image";
import { useEffect } from "react";
import { updateMethodHook } from "../../../lib/usePostHooks";
import server_url from "../../../lib/config";

const ShopUpdate = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUploadErrorMessage, setImageUploadErrorMessage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const { userInfo } = AuthUser();

  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery(["users"], () => {
    if (userInfo._id) {
      return getUsersById(userInfo._id);
    }
  });

  useEffect(() => {
    if (user) {
      setImageUrl(user.data.shop_logo);
    }
  }, [user]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
    reset,
  } = useForm({
    defaultValues: {
      bikash_Number: user?.data?.bikash_Number,
    },
  });

  const url = `${server_url}/user/${user?.data?._id}`;

  const handleUpdateUser = (data) => {
    const newData = {
      shop_name: data?.shop_name,
      shop_address: data?.shop_address,
      shop_phone: data?.shop_phone,
      shop_logo: imageUrl,
    };

    updateMethodHook(url, newData, refetch);
  };

  const handleImageUpload = (e) => {
    const files = e.target.files[0];
    uploadImage(files, setImageUrl, setImageLoading);
  };

  return (
    <UserDashLayout>
      <section className="my-8 md:my-16 mx-2 md:mx-8 p-6 bg-gray-100 text-gray-900">
        <form
          onSubmit={handleSubmit(handleUpdateUser)}
          className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid"
        >
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-50">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="font-medium text-3xl">Shop Settings</p>
              <p className=" text-base">
                (ইনভয়েস জেনারেট করার জন্য আপনার শপের তথ্য দিন)
              </p>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <label for="phone" className="text-sm">
                  Shop Name
                </label>
                <input
                  type="text"
                  {...register("shop_name", { required: false })}
                  defaultValue={user?.data?.shop_name}
                  placeholder="Add SHop Name"
                  className="input w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-emerald-600 border-gray-300 text-gray-900"
                />
              </div>

              <div className="col-span-full sm:col-span-3">
                <label for="phone" className="text-sm">
                  Shop Address
                </label>
                <input
                  type="text"
                  {...register("shop_address", { required: false })}
                  defaultValue={user?.data?.shop_address}
                  placeholder="Add shop address"
                  className="input w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-emerald-600 border-gray-300 text-gray-900"
                />
              </div>

              <div className="col-span-full sm:col-span-3">
                <label for="phone" className="text-sm">
                  Shop Phone
                </label>
                <input
                  type="text"
                  {...register("shop_phone", { required: false })}
                  defaultValue={user?.data?.shop_phone}
                  placeholder="Add shop phone"
                  className="input w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-emerald-600 border-gray-300 text-gray-900"
                />
              </div>

              <fieldset className="w-full space-y-1 text-gray-800">
                <label for="files" className="block text-sm font-medium">
                  Shop Logo
                </label>
                <div className="flex">
                  <input
                    onChange={handleImageUpload}
                    type="file"
                    name="files"
                    id="files"
                    className="px-8 w-full md:w-auto py-2 border-2 border-dashed rounded-md border-gray-300 text-gray-600 bg-gray-100"
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

              <div className="col-span-full">
                <button className=" bg-green-700 py-2 px-5 rounded-lg font-medium hover:bg-green-900 duration-300 text-white">
                  Update Number
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </section>
    </UserDashLayout>
  );
};

export default ShopUpdate;
