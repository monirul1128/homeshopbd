import { Icon } from "@iconify/react";
import React, { useState } from "react";
import server_url from "../../../../lib/config";
import FetchUpdateHook from "../../../../lib/FetchUpdateHook";
import Link from "next/link";
import { Tooltip } from "react-tooltip";
import CustomModal from "../../../Shared/CustomModal";
import ChangePassword from "./ChangePassword";
import { RiLockPasswordFill } from "react-icons/ri";

const AllUserRow = ({ user, setSingeUser, handleOpen, handleUserDelete }) => {
  const handleChangeStatus = (event) => {
    const updateUrl = `${server_url}/user/${user._id}`;
    FetchUpdateHook(updateUrl, { status: event.target.value });
  };

  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <tr key={user.id} className="whitespace-nowrap ">
      <td className="px-6 py-4 text-sm text-light-dark">
        {user?.imageURL ? (
          <img
            src={user.imageURL}
            alt={"user profile"}
            className="w-8 h-8 rounded-md object-cover"
          />
        ) : (
          <p className="text-[#cc3300] text-xs font-semibold">Not Found</p>
        )}
      </td>
      <td className="px-6 py-4">
        <div className="text-sm font-semibold text-light-dark ">
          {user?.email ? (
            user?.email?.slice(0, 8) + ".."
          ) : (
            <p className="text-[#cc3300] text-xs">Not Found</p>
          )}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-light-dark">{user.phone}</div>
      </td>
      <td className="px-6 py-4 ">
        <span className=" ">{user.role}</span>
      </td>
      <td className="px-6 py-4 ">
        <select
          onChange={handleChangeStatus}
          defaultValue={user.status}
          className={`outline-none cursor-pointer border border-primary rounded-md py-1 ${
            user.status === "blocked" && "text-red-600"
          }`}
        >
          <option selected={user.status === "active"} value={"active"}>
            Active
          </option>

          <option selected={user.status === "blocked"} value={"blocked"}>
            Banned
          </option>
        </select>
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-wrap gap-2">
          <Tooltip anchorSelect="#view">View Details</Tooltip>
          <Link
            id="view"
            href={"customers/user-details/" + user._id}
            className="bg-primary font-bold text-white rounded-md py-1 px-2 flex items-center justify-center "
          >
            <Icon icon="fa:arrow-circle-right" className="ml-2 text-white" />
          </Link>
          <Tooltip anchorSelect="#edit">Edit</Tooltip>
          <Link id="edit" href={`/admin/customers/update-user/${user._id}`}>
            <Icon
              icon="material-symbols:edit-document-rounded"
              className=" text-white text-2xl h-8 w-8 p-1 bg-primary font-bold  rounded-md  flex items-center justify-center hover:bg-[#43ff6403] border-primary border hover:text-primary"
            />
          </Link>

          <Tooltip anchorSelect="#password">Change Password</Tooltip>
          <button id="password" onClick={() => setIsOpen(true)}>
            <RiLockPasswordFill className=" text-white text-2xl h-8 w-8 p-1 bg-primary font-bold  rounded-md  flex items-center justify-center hover:bg-[#43ff6403] border-primary border hover:text-primary" />
          </button>

          <Tooltip anchorSelect="#delete">Delete</Tooltip>
          <button id="delete" onClick={() => handleUserDelete(user._id)}>
            <Icon
              icon="material-symbols:delete-forever"
              className="bg-[#FF0000]  p-1 w-8 h-8 rounded-md text-white"
            />
          </button>
        </div>
      </td>

      {modalIsOpen && (
        <CustomModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
          <h2 className="text-2xl uppercase font-bold">Change Password</h2>

          <ChangePassword id={user._id} setIsOpen={setIsOpen} />
        </CustomModal>
      )}
    </tr>
  );
};

export default AllUserRow;
