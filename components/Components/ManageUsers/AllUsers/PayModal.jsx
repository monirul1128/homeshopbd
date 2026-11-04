import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CustomeInput from "../../../Shared/AddressInput/CustomeInput";
import CustomButtonLoading from "../../../Shared/CustomButtonLoading";
import server_url from "../../../../lib/config";
import { updateMethodHook } from "../../../../lib/usePostHooks";

const PayModal = ({user,setReloder,reloader,setOpen}) => {
    const [loading,setLoading] = useState(false)

    const {
        register,
        formState: { errors },
        handleSubmit,
        trigger,
        reset,
    } = useForm();

    const handleReturnAmount = (data) => {
        const url = `${server_url}/user/pay/${user?._id}`;
        setLoading(true)
        const newData = {
            baleens:data?.amount,
            requestBaleens:user?.pendingBaleens,
            note:data?.note
        }
        updateMethodHook(url, newData,refetch, setLoading);
    }

    const refetch = ()=>{
        setReloder(!reloader);
        setOpen(false)
    }

  return (
    <div>
      <div className="w-full md:w-[500px]">
        <h1 className=" font-medium text-[20px] mb-5">Wholesaler Pay:</h1>
        <form
          onSubmit={handleSubmit(handleReturnAmount)}
          className=" my-5 border p-3 rounded-md"
        >
          <div>
            <h2 className=" text-[20px] font-semibold mb-3">Request Amount : {user?.pendingBaleens}</h2>
          </div>
          <div className="md:flex items-center gap-5">
            <div className=" w-full my-3 md:my-0">
              {/* ======Add Ammount ====== */}
              <CustomeInput
                lable={<p>Pay Amount*</p>}
                type={"number"}
                name={"amount"}
                placeholder={"Enter Amount"}
                regester={register("amount", {
                  required: "Amount is required",
                })}
                onKeyUp={(e) => {
                  trigger("amount");
                }}
              />
              <small className="text-[#FF4B2B] text-xs font-medium my-2">
                {errors?.amount?.message}
              </small>
            </div>
          </div>
          <div className="w-full md:mt-4">
            <label htmlFor="name" className="leading-7 text-sm font-bold ">
              Note
            </label>
            <textarea
              name={"note"}
              placeholder={"Write Note"}
              {...register("note")}
              className="shadow-sm border outline-none focus:border-primary  bg-white  text-black w-full p-3 flex items-center justify-between rounded-lg"
            ></textarea>
          </div>

          <div className="my-5">
            <button
              disabled={loading}
              type="submit"
              className={`btn border-none bg-primary text-white `}
            >
              {loading ? <CustomButtonLoading /> : `Payment`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PayModal;
