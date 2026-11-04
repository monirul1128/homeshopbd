import React, { useState } from "react";
import CustomModal from '../../../components/Shared/CustomModal';
import ExtraDiscountOrder from "./ExtraDiscountOrder";

const OrderPaymentInfo = ({ orderInfo, codAmount, refetch }) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className=" flex items-center justify-between">
        <h2 className="text-2xl font-extrabold mb-2">Payment Info</h2>
        <button
          onClick={() => setShow(!show)}
          className=" bg-primary text-white py-2 px-5 text-sm rounded-lg"
        >
          Edit
        </button>
      </div>
      <div className=" font-bold grid gap-2 uppercase text-xs">
        <p className="shadow-sm py-1 px-2 rounded-sm flex justify-between items-center">
          Invoice: <span> #{orderInfo.invoiceNumber}</span>
        </p>
        <div className="shadow-sm py-1 px-2 rounded-sm">
          <p className="flex justify-between items-center">
            Payment Method:<span>{orderInfo?.paymentDetails?.method}</span>{" "}
          </p>
          {orderInfo?.paymentDetails?.method !== "cod" && (
            <>
              <p className="flex justify-between items-center">
                Acc. No: <span>{orderInfo?.paymentDetails?.number}</span>
              </p>
              <p className="flex justify-between items-center">
                TrxID:<span> {orderInfo?.paymentDetails?.trxId}</span>
              </p>
            </>
          )}
        </div>

        {codAmount ? (
          <p className="shadow-sm py-1 px-2 rounded-sm flex justify-between items-center">
            Original Product Price:{" "}
            <span>৳{orderInfo.totalAmount - codAmount}.00</span>
          </p>
        ) : (
          <p className="shadow-sm py-1 px-2 rounded-sm flex justify-between items-center">
            Original Product Price:{" "}
            <span>৳{orderInfo.originalProductPrice}.00</span>
          </p>
        )}

        {!codAmount && (
          <>
            <p className="shadow-sm py-1 px-2 flex justify-between items-center rounded-sm">
              Coupon Discount: <span> ৳{orderInfo.couponDiscount}.00</span>
            </p>
            <p className="shadow-sm py-1 px-2 flex justify-between items-center rounded-sm">
              Point Discount:{" "}
              <span> ৳{orderInfo?.shippingAddress?.useWallet}.00</span>
            </p>
            <p className="shadow-sm py-1 px-2 flex justify-between items-center rounded-sm">
              Total discount: <span> ৳{orderInfo.discount}.00</span>
            </p>
            <p className="shadow-sm py-1 font-extrabold px-2 flex justify-between items-center rounded-sm">
              ShippingPrice: <span> ৳{orderInfo.shippingPrice}.00</span>
            </p>
            <p className="shadow-sm py-1 font-extrabold px-2 flex justify-between items-center rounded-sm">
              After DiscountPrice:{" "}
              <span>৳{orderInfo.afterDiscountPrice}.00</span>
            </p>
          </>
        )}

        {codAmount && (
          <p className="shadow-sm py-1 px-2 rounded-sm font-bold flex justify-between items-center">
            Reseller Profit:<span> ৳{codAmount}.00</span>
          </p>
        )}
        <p className="shadow-sm py-1 px-2 rounded-sm font-bold text-xl flex justify-between items-center">
          Total Amount:<span> ৳{orderInfo.totalAmount}.00</span>
        </p>
        {codAmount && (
          <>
            <p className="shadow-sm py-1 px-2 rounded-sm font-bold flex justify-between items-center">
              Advance Amount:
              <span>
                {" "}
                ৳
                {orderInfo?.paymentDetails?.advance
                  ? orderInfo?.paymentDetails?.advance
                  : 0}
                .00
              </span>
            </p>
          </>
        )}
      </div>

      <CustomModal modalIsOpen={show} setIsOpen={setShow}>
        <ExtraDiscountOrder orderInfo={orderInfo} refetch={refetch} />
      </CustomModal>
    </div>
  );
};

export default OrderPaymentInfo;
