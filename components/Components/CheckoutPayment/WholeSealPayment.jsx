import Image from "next/image";
import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import cod from "../../assets/payment/cod.jpeg";
import bkash from "../../assets/payment/bkash.png";
import rocket from "../../assets/payment/rocket.png";
import nogod from "../../assets/payment/nogod.png";
import BkashPayment from "./BkashPayment";
import { AiOutlineRollback } from "react-icons/ai";
import { usePostOrder } from "../../../lib/usePostOrder";
import server_url from "../../../lib/config";
import CreateContext from "../CreateContex";
import BkashPayment2 from "./BkashPayment2";
import axios from "axios";

const WholeSealPayment = ({ order, advanceTotal, shippingCost }) => {
  const [method, setMethod] = useState("bkash");
  const [isClickMethod, setIsClickMethod] = useState(false);
  const { setOrderResponse } = useContext(CreateContext);

  const router = useRouter();

  const onSubmitOrder = async () => {
    try {
      // Construct the body of the request
      const body = {
        amount: advanceTotal ? advanceTotal : shippingCost,
        order,
        callbackURL: `${server_url}/bkash/payment/callback`,
      };

      // Send the request to create a bKash payment
      const response = await axios.post(
        `${server_url}/bkash/payment/create`,
        body,
        { withCredentials: true }
      );

      // Log the response data
      console.log(response.data);

      // Redirect to the bKash payment URL
      if (response.data && response.data.bkashURL) {
        window.location.href = response.data.bkashURL;
      } else {
        alert("bKash URL not found in the response");
      }
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error("Error during order submission:", error);
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
      <h1 className="text-center text-xl font-medium ">
        অর্ডারটি কমপ্লিট করতে {advanceTotal ? advanceTotal : shippingCost} টাকা
        এডভান্স পেমেন্ট করুন
      </h1>

      <div className=" w-full flex items-center justify-center mt-5">
        <Image
          onClick={() => {
            onSubmitOrder();
          }}
          src={bkash}
          alt="cod"
          className="w-20 h-20 rounded-md object-fill hover:scale-50 duration-300 cursor-pointer border-2 p-2"
        />
      </div>
      {/* {(method === "bkash" || method === "rocket" || method === "nagad") && (
        <BkashPayment2 method={method} order={order} advanceTotal={advanceTotal} shippingCost={shippingCost}/>
      )} */}
    </div>
  );
};

export default WholeSealPayment;
