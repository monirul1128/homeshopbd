import Link from "next/link";
import React from "react";
import { MdRemoveRedEye } from "react-icons/md";
import { convertTimestamp } from "../../../lib/convertTimestampDateAndTime";

const DashboardOrderTableRow = ({ order, dataRight }) => {
  const { date, time } = convertTimestamp(order.date);

  return (
    <tr className="border-b border-opacity-20 border-gray-300 bg-gray-50">
      <td className="p-3 text-left w-[200px]">
        <p>{dataRight==="user" ? order?._id : order?.invoiceNumber}</p>
      </td>
      <td className="p-3 text-left">
        <p>{date}</p>
        <p className="text-gray-600">{time}</p>
      </td>
      <td className="p-3 text-left">
        <p className="uppercase">{order?.paymentDetails?.method}</p>
      </td>
      <td className="p-3 text-left">
        <span
          className={` font-semibold rounded-md ${
            order.status === "pending" && "text-warning"
          } ${order.status === "processing" && "text-info"}  ${
            order.status === "delivered" && "text-success"
          } ${order.status === "cancelled" && "text-red-700"}  `}
        >
          <span className="uppercase">{order.status}</span>
        </span>
      </td>
      <td className="p-3 text-left">
        <p>{order.totalAmount}TK.</p>
      </td>
      {dataRight === "admin" && (
        <td className="p-1 ">
          <Link
            className="btn btn-success btn-xs text-white font-bold text-xs flex justify-center items-center gap-1 "
            href={`/admin/orders/order-details/${order._id}`}
          >
            <MdRemoveRedEye /> View
          </Link>
        </td>
      )}
    </tr>
  );
};

export default DashboardOrderTableRow;
