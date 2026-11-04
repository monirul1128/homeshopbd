import { useRouter } from "next/router";
import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import { deleteMethod } from "../../../../lib/usePostHooks";
import server_url from "../../../../lib/config";
import Image from "next/image";

const BlogTable = ({ coupon, refetch }) => {
  let url = server_url + `/blog/`;
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
      <td className="flex items-center justify-center">
          <Image
            src={coupon?.image}
            height={65}
            width={75}
            className="object-cover h-[50px] rounded-md"
            alt="blog"
          />
      </td>
      <td>{coupon?.title.slice(0, 40)}...</td>
      <td>{coupon?.view}</td>
      <td>{coupon?.user?.fullName}</td>
      <td>{formatDate(coupon?.publishDate)}</td>
      <td>{coupon.sort_description?.slice(0, 40)}...</td>
      <td>
        <span className="flex justify-center ">
          <Tooltip anchorSelect="#edit">Edit</Tooltip>
          <FaEdit
            id="edit"
            onClick={() => router.push("blog/update/" + coupon._id)}
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

export default BlogTable;
