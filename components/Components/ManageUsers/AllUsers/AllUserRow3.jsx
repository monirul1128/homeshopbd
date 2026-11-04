import { Icon } from "@iconify/react";
import React, { useState } from "react";
import server_url from "../../../../lib/config";
import FetchUpdateHook from "../../../../lib/FetchUpdateHook";
import Link from "next/link";
import { Tooltip } from "react-tooltip";
import swal from "sweetalert";
import CustomModal from '../../../components/Shared/CustomModal';
import PayModal from "./PayModal";

const AllUserRow3 = ({
  user,
  setSingeUser,
  handleOpen,
  handleUserDelete,
  setReloder,
  reloader,
}) => {
  const [open, setOpen] = useState(false);

  const handleChangeStatus = (event) => {
    const updateUrl = `${server_url}/user/${user._id}`;
    FetchUpdateHook(updateUrl, { status: event.target.value });
  };

  const handlePay = (id) => {
    const body = {
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

  return (
    <>
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
            {user?.fullName ? (
              user?.fullName
            ) : (
              <p className="text-[#cc3300] text-xs">Not Found</p>
            )}
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="text-sm font-semibold text-light-dark ">
            {user?.email ? (
              user?.email
            ) : (
              <p className="text-[#cc3300] text-xs">Not Found</p>
            )}
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="text-sm text-light-dark">{user.phone}</div>
        </td>
        <td className="px-6 py-4 flex flex-col">
          <span className=" ">{user.bikash_Number}</span>
          <span className=" "> Account Name : {user.account_Type}</span>
        </td>
        <td className="px-6 py-4 ">
          <div className=" flex flex-col">
            <span className=" ">{user?.totalBaleens} ৳</span>
          </div>
        </td>
        <td className="px-6 py-4 ">
          <div className=" flex flex-col">
            <span className=" ">{user?.pendingBaleens} ৳</span>
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="flex flex-wrap gap-2">
            <Tooltip anchorSelect="#delete">Pay </Tooltip>
            <button
              id="delete"
              className="bg-primary   p-1 w-10 h-8 rounded-md text-white"
              onClick={() => setOpen(true)}
            >
              Pay
            </button>

            <Tooltip anchorSelect="#view">View Orders</Tooltip>
            <Link
              id="view"
              href={"customers/user-details/" + user._id}
              className="bg-primary font-bold text-white rounded-md py-1 px-2 flex items-center justify-center "
            >
              <Icon icon="fa:arrow-circle-right" className=" text-white" />
            </Link>
          </div>
        </td>
      </tr>

      <CustomModal modalIsOpen={open} setIsOpen={setOpen}>
        <PayModal
          user={user}
          setReloder={setReloder}
          reloader={reloader}
          setOpen={setOpen}
        />
      </CustomModal>
    </>
  );
};

export default AllUserRow3;
