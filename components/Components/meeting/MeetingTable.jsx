import { useRouter } from "next/router";
import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import { deleteMethod } from "../../../lib/usePostHooks";
import server_url from "../../../lib/config";
import Link from "next/link";

const MeetingTable = ({ coupon, refetch }) => {
  let url = server_url + `/meeting/`;
  const router = useRouter();

  const handleDelete = (id) => {
    url += id;
    deleteMethod(url, refetch);
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

  return (
    <tr className="py-10 text-center">
      <td>{coupon.title}</td>
      <td>{formatDate(coupon.date)}</td>
      <td>
        <Link href={coupon.link} target="_blank">
          {coupon.link}
        </Link>
      </td>
      <td>{coupon.time}</td>
      <td>{coupon.description?.slice(0,40)}...</td>
      <td>{coupon?.assignedUsers?.length}</td>
      <td>
        <button
          onClick={() => router.push(`/admin/meeting/add-user/${coupon._id}`)}
          className=" py-1 px-2 bg-primary text-white rounded-md"
        >
          User Add
        </button>
      </td>
      <td>
        <span className="flex justify-center ">
          <Tooltip anchorSelect="#edit">Edit</Tooltip>
          <FaEdit
            id="edit"
            onClick={() => router.push("meeting/update/" + coupon._id)}
            size={17}
            className="text-warning block mx-auto cursor-pointer  duration-150"
          />
          <Tooltip anchorSelect="#delete">Delete</Tooltip>
          <FaTrashAlt
            id="delete"
            onClick={() => handleDelete(coupon._id)}
            size={15}
            className="text-red-600 block mx-auto cursor-pointer  duration-150"
          />
        </span>
      </td>
    </tr>
  );
};

export default MeetingTable;
