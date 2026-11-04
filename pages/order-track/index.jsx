import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import server_url from "../../lib/config";
import CreateContext from '../../components/Components/Components/CreateContex';

const TrackOrder = () => {
  const { siteApiSettingData, setSiteApiSettingData } =
    useContext(CreateContext);


    console.log(siteApiSettingData)

  const [massage, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const handleCategoryAdd = async (values) => {
    if (values.id) {
      const response = await fetch(`${server_url}/order/invoice/${values.id}`);
      const json = await response.json();

      if (json.data.courierName === "steadfast") {
        const response2 = await fetch(
          `https://portal.packzy.com/api/v1/status_by_invoice/${json.data.invoiceNumber}`,
          {
            headers: {
              "Api-Key": siteApiSettingData?.data?.steadFastApiKey,
              "Secret-Key": siteApiSettingData?.data?.steadFastSecretKey,
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response2.json();

        console.log(result);

        setMessage(result.delivery_status);
      } else {
        setMessage(json.data.status);
      }
    } else {
      const response2 = await fetch(
        `https://portal.packzy.com/api/v1/status_by_cid/${values.id}`,
        {
          headers: {
            "Api-Key": siteApiSettingData?.data?.steadFastApiKey,
            "Secret-Key": siteApiSettingData?.data?.steadFastSecretKey,
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response2.json();
      setMessage(result.delivery_status);
    }
  };

  return (
    <div className=" mid-container">
      <div className=" py-10">
        <div className=" w-full">

          <h2 className=" text-xl mb-3">Track your Order</h2>

          <form
            onSubmit={handleSubmit(handleCategoryAdd)}
            className=" w-full flex items-center justify-between gap-4"
          >
            <input
              type="text"
              placeholder="Type your order id"
              {...register("id", { required: true })}
              className=" py-3 px-5 w-full rounded-md border border-gray-400 outline-none"
            />

            <button className=" py-3 px-5 w-full md:w-[300px] rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white ">
              Search
            </button>
          </form>
        </div>

        <div className=" flex items-center justify-center mt-5">
          {massage ? (
            <>
              <h2 className=" font-medium text-xl">
                <span className=" text-gray-700">Your Order Status</span> :{" "}
                {massage}
              </h2>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
