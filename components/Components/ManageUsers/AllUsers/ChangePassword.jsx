import React, { useEffect, useState } from "react";
import {
  singleImageUploader,
  uploadImage,
} from "../../../../lib/imageUploader";
import { useForm } from "react-hook-form";
import server_url from "../../../../lib/config";
import { postMethodHook, updateMethodHook } from "../../../../lib/usePostHooks";
import Image from "next/image";

const ChangePassword = ({ id, setIsOpen }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    trigger,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const url = `https://server-homeshopbd-2-kohl.vercel.app/api/v1/user/reset-password-admin`;

  const handleResetPassword = (data) => {
    data.id = id;
    postMethodHook(url, data, loginNavigate, setLoading);
  };

  const loginNavigate = () => {
    reset();
    setIsOpen(false);
  };

  return (
    <form
      onSubmit={handleSubmit(handleResetPassword)}
      className="mt-8 flex w-full md:w-[500px] flex-col items-center gap-6"
    >
      <div className="flex  w-full mx-auto flex-col">
        <label className="text-[#747474] text-sm font-medium ml-1 mb-2">
          New Password
        </label>
        <input
          className="py-3 px-5 bg-[#F2F2F2] rounded-md focus:outline-0"
          id=""
          type="password"
          placeholder="write new password"
          {...register("password", {
            required: "password is required",
          })}
          onKeyUp={(e) => {
            trigger("password");
          }}
        />
        <small className="text-[#FF4B2B] text-xs ml-2 font-medium my-2">
          {errors?.password?.message}
        </small>
      </div>

      <div className="flex w-full mx-auto flex-col">
        <button
          className="btn bg-primary hover:bg-success my-[20px] border-0 text-white text-[17px]  font-bold "
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading..." : "Change Password"}
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
