import React from "react";
import { useState } from "react";
import OrderDetailsModal from "./OrderDetailsModal";
import { Tooltip } from "react-tooltip";

const InvoiceTableItemRow = ({ product, index, orderResponse, profit }) => {
  const [openOrderDetailsModal, setOpenOrderDetailsModal] = useState(false);

  return (
    <>
      <Tooltip anchorSelect="#order-details">View Details</Tooltip>
      <tr
        id="order-details"
        onClick={() => setOpenOrderDetailsModal(true)}
        className="border-b cursor-pointer border-opacity-20 border-gray-300 bg-gray-50"
      >
        <td className="p-3">
          <p>{index + 1}</p>
        </td>
        <td className="p-3">
          <p className=" text-[16px]">{product?.name}</p>
        </td>
        <td className="p-3">
          <p>{product?.quantity}</p>
          {product?.size && <p>Size: {product?.size}</p>}
          {product?.color && (
            <p className="flex items-center gap-1">
              Color:
              <span
                className="w-4 h-4 rounded-sm inline-block"
                style={{ background: product?.color }}
              ></span>
            </p>
          )}
        </td>
        {orderResponse?.isWholesaleOrder === "yes" ? (
          <></>
        ) : (
          <td className="p-3">
            <p className="line-through">৳{product?.originalProductPrice}.00</p>
            <p>৳{product?.price}.00</p>
          </td>
        )}
        <td className="p-3 text-[16px]">
          {orderResponse?.isWholesaleOrder === "yes" ? (
            <p>৳{(product?.price * product?.quantity) + (profit * product?.quantity)}.00</p>
          ) : (
            <p>৳{product?.price * product?.quantity}.00</p>
          )}
        </td>
      </tr>
      <OrderDetailsModal
        setOpenOrderDetailsModal={setOpenOrderDetailsModal}
        openOrderDetailsModal={openOrderDetailsModal}
        product={product}
      />
    </>
  );
};

export default InvoiceTableItemRow;
