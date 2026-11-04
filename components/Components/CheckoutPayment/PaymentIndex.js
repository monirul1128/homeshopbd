import Image from "next/image";
import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import cod from "../../assets/payment/cod.jpeg";
import bkash from "../../assets/payment/bkash.png";
import rocket from "../../assets/payment/rocket.png";
import nogod from "../../assets/payment/nogod.png";
import BkashPayment from "./BkashPayment";
import { AiOutlineRollback } from "react-icons/ai";
import { usePostOrder, usePostOrder2 } from "../../../lib/usePostOrder";
import server_url from "../../../lib/config";
import CreateContext from "../CreateContex";
import axios from "axios";
import { useUserData } from "../../hooks/useMyShopData";
const PaymentIndex = ({ order, direct = false }) => {
  const [method, setMethod] = useState("");
  const [isClickMethod, setIsClickMethod] = useState(false);
  const { setOrderResponse, setlocalStorageCartItems } =
    useContext(CreateContext);
  const [loading, setLoading] = useState(false);

  const { refetch: HandelReface } = useUserData();

  const router = useRouter();

  const onSubmitOrder = () => {
    order.paymentDetails = {
      method: "cod",
    };
    const url = `${server_url}/order`;

    if (direct) {
      usePostOrder(url, order, setOrderResponse, router, setLoading);
    } else {
      usePostOrder2(
        url,
        order,
        setOrderResponse,
        router,
        setLoading,
        setlocalStorageCartItems
      );

      HandelReface();
    }
  };

  const onSubmitOrder2 = async () => {
    try {
      // Construct the body of the request
      const body = {
        amount: order?.totalAmount,
        order,
        callbackURL: `${server_url}/bkash/payment/callback`,
      };

      // Send the request to create a bKash payment
      const response = await axios.post(
        `${server_url}/bkash/payment/create`,
        body,
        { withCredentials: true }
      );

      // Redirect to the bKash payment URL
      if (response.data && response.data.bkashURL) {
        window.location.href = response.data.bkashURL;
      } else {
        alert("bKash URL not found in the response");
      }
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error("Error during order submission:", error);

      console.log(error);

      alert("An error occurred while processing your order. Please try again.");
    }
  };

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold uppercase flex items-center">
        {isClickMethod && (
          <span
            onClick={() => {
              setIsClickMethod(false);
              setMethod("");
            }}
            className="cursor-pointer mr-2 bg-red-600 hover:bg-primary hover:text-black text-white duration-200"
          >
            <AiOutlineRollback />
          </span>
        )}{" "}
        Payment Method
      </h2>
      <span className="divider -mt-1"></span>
      {loading ? (
        <h2 className=" text-[20px] font-semibold">Loading...</h2>
      ) : (
        <>
          {!isClickMethod && (
            <div className=" flex flex-wrap gap-2 md:gap-5 mb-3">
              <Image
                onClick={() => {
                  setMethod("cod");
                  onSubmitOrder();
                }}
                src={cod}
                alt="cod"
                className="w-20 h-20 rounded-md object-fill hover:scale-50 duration-300 cursor-pointer border-4 p-2"
              />
              <Image
                onClick={() => {
                  setMethod("bkash");
                  // setIsClickMethod(true);
                  onSubmitOrder2();
                }}
                src={bkash}
                alt="cod"
                className="w-20 h-20 rounded-md object-fill hover:scale-50 duration-300 cursor-pointer border-2 p-2"
              />
              {/* <Image
            onClick={() => {
              setMethod("rocket");
              setIsClickMethod(true);
            }}
            src={rocket}
            alt="cod"
            className="w-20 h-20 rounded-md object-fill hover:scale-50 duration-300 cursor-pointer border-2 p-2"
          /> */}
              {/* <Image
                onClick={() => {
                  setMethod("nagad");
                  setIsClickMethod(true);
                }}
                src={nogod}
                alt="cod"
                className="w-20 h-20 rounded-md object-fill hover:scale-50 duration-300 cursor-pointer border-2 p-2"
              /> */}
            </div>
          )}
        </>
      )}
      {/* {(method === "bkash" || method === "rocket" || method === "nagad") && (
        <BkashPayment method={method} order={order} direct={direct}/>
      )} */}

      <div className=" w-[300px]">
        <p className=" font-semibold text-red-500">
          ⚠ খুলনার বাইরে ডেলিভারি চার্জ আগে পরিশোধ করতে হবে। 💳{" "}
        </p>
      </div>
    </div>
  );
};

export default PaymentIndex;
