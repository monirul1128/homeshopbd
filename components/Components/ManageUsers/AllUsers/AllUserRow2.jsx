import { Icon } from "@iconify/react";
import React, { useState } from "react";
import server_url from "../../../../lib/config";
import FetchUpdateHook from "../../../../lib/FetchUpdateHook";
import Link from "next/link";
import { Tooltip } from "react-tooltip";
import swal from "sweetalert";
import {
  convertTimestamp,
  convertTimestamp12,
} from "../../../../lib/convertTimestampDateAndTime";
import CustomModal from '../../../Shared/CustomModal";
import ChangePassword from "./ChangePassword";
import { RiLockPasswordFill } from "react-icons/ri";

const AllUserRow2 = ({
  user,
  setSingeUser,
  handleOpen,
  handleUserDelete,
  setReloder,
  reloader,
}) => {
  const handleChangeStatus = (event) => {
    const updateUrl = `${server_url}/user/${user._id}`;
    FetchUpdateHook(updateUrl, { status: event.target.value });
  };

  const [modalIsOpen, setIsOpen] = useState(false);

  const { date, time } = convertTimestamp(user.createdAt);

  const { date: endDate } = convertTimestamp12(user.joiningDate);

  const handlePay = (id) => {
    const body = {
      activeBaleens: 0,
      with_dro: "inactive",
    };

    swal({
      title: "Are you sure?",
      text: `Pay the user amount of ${user?.activeBaleens}`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `${server_url}/user/${id}`;
        fetch(url, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(body),
        })
          .then((res) => res.json())
          .then((data) => {
            swal("Successfully pay !", {
              icon: "success",
            });
            setReloder(!reloader);
          });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  const lastData =
    new Date() >
    new Date(
      new Date(user?.joiningDate).setFullYear(
        new Date(user?.joiningDate).getFullYear() + 1
      )
    );

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
            user?.email.length >= 18 ? (
              user?.email.slice(0, 18) + "..."
            ) : (
              user?.email
            )
          ) : (
            <p className="text-[#cc3300] text-xs">Not Found</p>
          )}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-light-dark">{user.phone}</div>
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
      <td className="px-6 py-4 flex flex-col">
        <span className=" text-sm"> {date}</span>
        <span className=" ">{user?.coupon}</span>
      </td>

      <td className="px-6 py-4">
        {user?.joiningDate ? (
          <span
            className={
              lastData ? "text-red-500" : ""
            }
          >
            {endDate}
          </span>
        ) : (
          "--"
        )}
      </td>

      <td className="px-6 py-4 ">
        <div className=" flex flex-col">
          <span title="সেলার কে পে করতে হবে" className=" ">
            Payable : {user?.activeBaleens}
          </span>
          <span title="সেলারের অর্ডার পেন্ডিং ব্যালেন্স" className=" ">
            Pending : {user?.dueBaleens}
          </span>
        </div>
      </td>
      {/* <td className="px-6 py-4 ">
        <button
          onClick={()=>handlePay(user._id)}
          disabled={user.with_dro === "inactive"}
          className={`${
            user.with_dro === "active"
              ? " bg-green-500  rounded-md px-3 py-1"
              : " bg-gray-400 rounded-full px-3 py-1"
          } flex items-center gap-1 justify-center`}
        >
          {user.with_dro === "active" ? "Pay" : "Not Pay"}
        </button>
      </td> */}
      <td className="px-6 py-4 ">
        <div
          className={`${
            user.isWholesale === "active"
              ? " bg-green-200  rounded-full px-3 py-1"
              : " bg-gray-200 rounded-full px-3 py-1"
          } flex items-center gap-1 justify-center`}
        >
          <div
            className={`${
              user.isWholesale === "active"
                ? " bg-green-500  rounded-full"
                : " bg-gray-400 rounded-full"
            } w-[10px] h-[10px] mt-1`}
          ></div>
          {user.isWholesale}
        </div>
      </td>
      <td className="px-6  w-[300px] py-2">
        <div className=" w-[80px]">
          <div className=" grid w-full grid-cols-2 gap-2">
            <Tooltip anchorSelect="#view">View Details</Tooltip>
            <Link
              id="view"
              href={"/admin/customers/user-details/" + user._id}
              className="bg-primary font-bold text-white w-8  rounded-md py-1 px-2 flex items-center justify-center "
            >
              <Icon icon="fa:arrow-circle-right" className=" text-white" />
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

export default AllUserRow2;
