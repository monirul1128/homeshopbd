import React from "react";
import { convertTimestamp } from "../../../lib/convertTimestampDateAndTime";
import { FaCopy, FaRegCopy } from "react-icons/fa";

const UserOrderTableRow = ({ order, handleInvoiceModal }) => {
  const { date, time } = convertTimestamp(order.date);

  const copyText = (id)=>{
    navigator.clipboard.writeText(id)
  }

  return (
    <tr className="border-b border-opacity-20 border-gray-300 bg-gray-50">
      <td className="p-3 w-[150px] flex items-center gap-1">
        <p className=" text-base">{order?._id}</p> <button onClick={()=>copyText(order?._id)}><FaCopy className=" text-primary" /></button>
      </td>
      <td className="p-3">
        <p>{date}</p>
        <p className="text-gray-600">{time}</p>
      </td>
      <td className="p-3">
        <p>{order?.paymentDetails?.method == "cod" ? "Cash On Delivery" : order?.paymentDetails?.method}</p>
      </td>
      <td className="p-3">
        <span
          className={`px-3 py-1 font-semibold rounded-md ${order.status === "pending" && "bg-warning"
            } ${order.status === "processing" && "bg-info"}  ${order.status === "delivered" && "bg-success"
            } ${order.status === "cancelled" && "bg-red-700"} text-gray-50 `}
        >
          <span>{order.status}</span>
        </span>
      </td>
      <td className="p-3 ">
        <p>{order?.totalAmount}TK.</p>
        {order?.codAmount && <p className="font-bold">COD AMOUNT: {order?.codAmount}TK.</p>}
      </td>
      <td className="p-3 ">
        <span
          onClick={() => handleInvoiceModal(order)}
          className="btn btn-info btn-xs text-white"
        >
          INVOICE
        </span>
      </td>
    </tr>
  );
};

export default UserOrderTableRow;
