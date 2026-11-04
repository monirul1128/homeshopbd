import { useRouter } from "next/router";
import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import { deleteMethod, updateMethodHook } from "../../../lib/usePostHooks";
import server_url from "../../../lib/config";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";

const MeetingTableUser = ({ coupon, userId, refetch }) => {
  let url = server_url + `/meeting/read`;
  const router = useRouter();

  const updateStatus = () => {
    const data = {
      id: coupon?._id,
      userId,
    };
    updateMethodHook(url, data, refetch);
  };

  // Function to format date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const findData = coupon?.assignedUsers?.find((item) => item?.user === userId);

  return (
    <tr className="py-10 text-start">
      <td className=" w-[350px]">{coupon?.title}</td>
      <td>{formatDate(coupon?.date)}</td>
      {/* <td>
        <Link href={coupon.link} target="_blank">
          {coupon.link}
        </Link>
      </td> */}
      <td>{coupon?.time}</td>
      <td>
        <button
          onClick={() => updateStatus()}
          className={` py-1 px-2 rounded-md capitalize  ${
            findData?.status === "read"
              ? " bg-gray-200"
              : " bg-[#1ee0ac] text-white"
          }`}
        >
          {findData?.status}
        </button>
      </td>
      <td>
        <Link
          href={`/user/meeting/${coupon?._id}`}
          className=" text-2xl rounded-full w-[30px] h-[30px] flex items-center justify-center hover:bg-gray-200 duration-300 font-semibold"
        >
          <MdKeyboardArrowRight />
        </Link>
      </td>
    </tr>
  );
};

export default MeetingTableUser;
