import React, { useState } from "react";
import UserDashLayout from "../../../components/Components/userDashLayout";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { singleImageUploader } from "../../../lib/imageUploader";
import AuthUser from "../../../lib/AuthUser";
import { getUsersById } from "../../../lib/helper";
import Image from "next/image";
import { useEffect } from "react";
import { updateMethodHook } from "../../../lib/usePostHooks";
import server_url from "../../../lib/config";
import { MdDelete } from "react-icons/md";

const Payment = () => {
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

  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
    reset,
  } = useForm();

  console.log(user);

  const url = `${server_url}/user/add-account/${user?.data?._id}`;

  const handleUpdateUser = (data) => {
    const newData = {
      name: data?.account_Type,
      number: data?.bkash_Number,
    };

    updateMethodHook(url, newData, successUpdate);
  };

  const removeAccount = (index)=>{
    const url2 = `${server_url}/user/remove-account/${user?.data?._id}`;
    updateMethodHook(url2, index, successUpdate);
  }


  const successUpdate = ()=>{
    refetch()
    reset()
  }


  return (
    <UserDashLayout>
      <section className="my-8 md:my-16 mx-2 md:mx-8 p-6 bg-gray-100 text-gray-900">
        <form
          onSubmit={handleSubmit(handleUpdateUser)}
          className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid"
        >
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-50">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="font-medium text-3xl">Add Account</p>
              <p className="font-medium text-base">
                (আপনি যে অ্যাকাউন্ট পেমেন্ট নেবেন সে একাউন্টের নাম ও নাম্বার এড
                করুন)
              </p>
              {/* <p className="text-xs">Here my profile info.</p> */}
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <label for="phone" className="text-sm">
                  Account Name
                </label>
                <input
                  type="text"
                  {...register("account_Type", { required: true })}
                  placeholder="Enter Account Name (Bkash,Nagad etc)"
                  className="input w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-emerald-600 border-gray-300 text-gray-900"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label for="phone" className="text-sm">
                  Account Number
                </label>
                <input
                  type="text"
                  {...register("bkash_Number", { required: true })}
                  placeholder="Enter Account Number"
                  className="input w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-emerald-600 border-gray-300 text-gray-900"
                />
              </div>

              <div className="col-span-full">
                <button className=" bg-green-700 py-2 px-5 rounded-lg font-medium hover:bg-green-900 duration-300 text-white">
                  Add Account
                </button>
              </div>
            </div>
          </fieldset>
          <div className=" w-full">
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs">
                <thead className="bg-gray-300">
                  <tr className="text-left">
                    <th className="p-3">INVOICE</th>
                    <th className="p-3">Account Name</th>
                    <th className="p-3">Account Number</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {user?.data?.account?.map((item, index) => (
                    <tr className="border-b text-[16px] border-opacity-20 border-gray-300 bg-gray-50">
                      <td className="p-3">
                        <p>{index + 1}</p>
                      </td>
                      <td className="p-3">
                        <p>{item?.name}</p>
                      </td>
                      <td className="p-3">
                        <p>{item?.number}</p>
                      </td>
                      <td className="p-3">
                        <button onClick={()=>removeAccount(item)} className=" text-[25px] hover:text-red-500" type="button">
                          <MdDelete />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </form>
      </section>
    </UserDashLayout>
  );
};

export default Payment;
