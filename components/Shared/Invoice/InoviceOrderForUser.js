import Image from "next/image";
import React, { useContext, useRef, useState } from "react";
import logo from "../../assets/logo.png";
import ReactToPrint from "react-to-print";
import { MdDoneOutline } from "react-icons/md";
import InvoiceTableItemRow from '../../components/SuccessPayment/InvoiceTableItemRow";
import { convertTimestamp } from "../../../lib/convertTimestampDateAndTime";
import QRCode from "qrcode.react";
import { useMyShopData } from "../../hooks/useMyShopData";
import { AiFillPrinter } from "react-icons/ai";

const InoviceOrderForUser = ({ order: orderResponse, dataRight }) => {
  const { date, time } = convertTimestamp(orderResponse.date);
  const componentRef = useRef();
  const { data, isLoading } = useMyShopData();

  const totalQuantity = orderResponse?.orderItem?.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

  const profit = orderResponse?.codAmount / totalQuantity;


  return (
    <div>
      <div className="my-8 md:w-[750px] w-full">
        <div className="mid-container">
          <div className="flex md:flex-row items-center justify-between gap-2">
            <div className="">
              <ReactToPrint
                trigger={() => (
                  <button className=" text-center btn btn-sm text-white capitalize btn-primary my-5">
                    <AiFillPrinter size={18} className="mr-1" /> Print/Download
                  </button>
                )}
                content={() => componentRef.current}
              />
            </div>
          </div>

          <div className="h-full py-12 " ref={componentRef}>
            <div className="  px-8  block md:flex justify-between ">
              <div>
                <h2 className="text-3xl font-bold uppercase text-black">
                  invoice
                </h2>
                <QRCode
                  size={110}
                  className="my-2 "
                  value={`Invoice:#${orderResponse?.invoiceNumber} | Total Amount: ৳${orderResponse?.totalAmount}.00`}
                />
              </div>
              {orderResponse?.isWholesaleOrder === "yes" ? (
                <div className="w-1/3  md:my-0 my-8">
                  {orderResponse?.user?.shop_logo && (
                    <Image
                      src={orderResponse?.user?.shop_logo}
                      alt="logo"
                      className="w-[80px]"
                      width={100}
                      height={100}
                    />
                  )}
                  <h2 className="text-xl font-bold uppercase text-black">
                    {orderResponse?.user?.shop_name}
                  </h2>
                  {/* <p className="text-base text-slate-600 mt-3 uppercase">
                    {orderResponse?.user?.shop_address}
                  </p> */}
                  <p className=" text-base text-slate-600 mt-1 uppercase">
                    {orderResponse?.user?.shop_phone}
                  </p>
                </div>
              ) : (
                <div className="w-1/3  md:my-0 my-8">
                  <Image
                    src={data?.data?.logo}
                    alt="logo"
                    className="w-32"
                    width={100}
                    height={100}
                  />
                  <p className="text-xs text-slate-600 mt-3 uppercase">
                    {data?.data?.address}
                  </p>
                  <p className="text-xs text-slate-600 mt-1 uppercase">
                    {data?.data?.phone}
                  </p>
                </div>
              )}
            </div>
            <div className="  px-8">
              <div className=" grid md:mt-6 grid-cols-1 md:grid-cols-3 gap-3 justify-between">
                <div>
                  <h2 className="text-base font-bold mb-1">Date</h2>
                  <p className="text-base text-slate-600 ">{date}</p>
                </div>
                <div>
                  <h2 className="text-base font-bold mb-1">INVOICE NO.</h2>
                  <p className="text-base text-slate-600 ">
                    #{orderResponse?.invoiceNumber}
                  </p>
                </div>
                <div>
                  <h2 className="text-base font-bold mb-1">INVOICE TO.</h2>
                  <p className="text-base text-slate-600 ">
                    {orderResponse?.shippingAddress?.firstName}{" "}
                    {orderResponse?.shippingAddress?.lastName}
                  </p>
                  <p className="text-base text-slate-600 ">
                    {orderResponse?.shippingAddress?.address}{" "}
                    {orderResponse?.shippingAddress?.thana}{" "}
                    {orderResponse?.shippingAddress?.city}{" "}
                    {orderResponse?.shippingAddress?.postalCode}
                  </p>
                  <p>{orderResponse?.shippingAddress?.phone}</p>
                </div>
              </div>
              {/* date-invoice no- invoice to */}
              {/* ----------------table data of product items--------- */}
              <div className="my-5 mx-auto sm:p-4 text-gray-800">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-xs">
                    <thead className="bg-gray-300">
                      <tr className="text-left">
                        <th className="p-3">SR</th>
                        <th className="p-3">PRODUCT NAME</th>
                        <th className="p-3">QUANTITY</th>
                        <th className="p-3">PRICE</th>
                        {orderResponse?.isWholesaleOrder === "yes" ? (
                          <></>
                        ) : (
                          <th className="p-3 ">TOTAL</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {orderResponse?.orderItem?.map((item, index) => (
                        <InvoiceTableItemRow
                          key={index}
                          index={index}
                          product={item}
                          orderResponse={orderResponse}
                          profit={profit}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* payment info */}
              <div className="p-8 bg-primary bg-opacity-5">
                <div className=" flex items-start justify-between gap-2">
                  <div className="w-full">
                    {orderResponse?.codAmount ? (
                      <>
                        <h2 className="text-md font-bold ">PAYMENT METHOD</h2>
                        <p className="text-sm font-bold text-slate-600 uppercase">
                          COD
                        </p>
                      </>
                    ) : (
                      <>
                        <h2 className="text-md font-bold ">PAYMENT METHOD</h2>
                        <p className="text-sm font-bold text-slate-600 uppercase">
                          {orderResponse?.paymentDetails?.method}
                        </p>
                      </>
                    )}
                    {!orderResponse?.codAmount &&
                      orderResponse?.paymentDetails?.number && (
                        <p className="text-sm font-bold text-slate-600 uppercase">
                          {orderResponse?.paymentDetails?.number}
                        </p>
                      )}
                    {!orderResponse?.codAmount &&
                      orderResponse?.paymentDetails?.trxId && (
                        <p className="text-sm font-bold text-slate-600 uppercase">
                          {orderResponse?.paymentDetails?.trxId}
                        </p>
                      )}
                  </div>
                  {orderResponse?.isWholesaleOrder === "yes" ? (
                    <></>
                  ) : (
                    <div className="w-full">
                      <h2 className="text-md font-bold ">SHIPPING COST</h2>
                      <p className="text-sm font-bold text-slate-600">
                        ৳{orderResponse?.shippingPrice}.00
                      </p>
                    </div>
                  )}

                  {orderResponse?.isWholesaleOrder === "yes" ? (
                    <></>
                  ) : (
                    <div className="w-full">
                      <h2 className="text-md font-bold ">DISCOUNT</h2>
                      <p className="text-sm font-bold text-slate-600">
                        ৳{orderResponse?.discount}.00
                      </p>
                      {orderResponse?.couponDiscount > 0 && (
                        <small className="text-success">
                          Here coupon discount {orderResponse?.couponDiscount}
                          TK.
                        </small>
                      )}
                      {orderResponse?.shippingAddress?.useWallet > 0 && (
                        <small className="text-success">
                          Here point discount{" "}
                          {orderResponse?.shippingAddress?.useWallet}
                          TK.
                        </small>
                      )}
                    </div>
                  )}
                  {orderResponse?.isWholesaleOrder === "yes" ? (
                    <div className="w-[200px]">
                      <h2 className="text-md font-bold ">TOTAL AMOUNT</h2>
                      <p className="text-sm font-bold text-primary">
                        {orderResponse?.afterDiscountPrice}.00
                      </p>
                    </div>
                  ) : (
                    <div className="w-full">
                      <h2 className="text-md font-bold ">AMOUNT</h2>
                      <p className="text-sm font-bold text-primary">
                        TOTAL : {orderResponse?.totalAmount}.00
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InoviceOrderForUser;
