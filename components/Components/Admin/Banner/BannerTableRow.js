import { data } from "autoprefixer";
import Image from "next/image";
import React, { useState } from "react";
import server_url from "../../../../lib/config";
import { deleteMethod, updateMethodHook } from "../../../../lib/usePostHooks";
import CustomModal from '../../../Shared/CustomModal";
import EditBannerInfo from "./EditBannerInfo";
import EditBannerPostion from "./EditBannerPostion";
import { useRouter } from "next/router";

const BannerTableRow = ({ banner, index, refetch }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpenBanner, setIsOpenBanner] = useState(false);
  const url = `${server_url}/banner/${banner?._id}`;
  const router = useRouter();

  const handleStatus = () => {
    let data;
    if (banner.status === "active") {
      data = { status: "inactive" };
    } else {
      data = { status: "active" };
    }
    updateMethodHook(url, data, refetch);
  };
  const handleDelete = () => {
    deleteMethod(url, refetch);
  };
  return (
    <>
      <tr className="border-b border-opacity-20 border-gray-300 bg-gray-50">
        <td className="p-3">
          <p>{index + 1}</p>
        </td>
        <td className="p-3">
          <Image
            src={banner?.image}
            width={100}
            height={100}
            alt={"banner image"}
            className="w-12 rounded-md"
          />
        </td>
        <td className="p-3">
          <p>{banner.title}</p>
        </td>
        <td className="p-3 capitalize">
          <p>{banner.type}</p>
        </td>
        <td className="p-3">
          <span
            onClick={handleStatus}
            className={`btn btn-xs font-medium hover:btn-info text-white ${
              banner.status === "active" ? "btn-success" : "btn-warning"
            }`}
          >
            {banner.status}
          </span>
        </td>
        <td className="p-3">
          <span
            onClick={() => setIsOpen(true)}
            className={`btn btn-xs btn-primary font-medium text-white`}
          >
            Set Position {banner.position}
          </span>
        </td>
        <td className="p-3 ">
          <span
            onClick={() =>
              router.push(`/admin/setting/banner-setting/${banner?._id}`)
            }
            className="btn btn-success btn-xs bg-blue-500 font-medium text-white hover:bg-blue-600"
          >
            Add Product
          </span>
          <span
            onClick={() => setIsOpenBanner(true)}
            className="btn btn-success btn-xs font-medium ml-2 text-white hover:bg-green-600"
          >
            Edit
          </span>
          <span
            onClick={handleDelete}
            className="btn font-medium btn-warning btn-xs ml-2 text-white hover:bg-red-500"
          >
            Delete
          </span>
        </td>
      </tr>
      {modalIsOpen && (
        <CustomModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
          <h2 className="text-2xl uppercase font-bold">Update Position</h2>

          <EditBannerPostion banner={banner} refetch={refetch} />
        </CustomModal>
      )}
      {modalIsOpenBanner && (
        <CustomModal
          modalIsOpen={modalIsOpenBanner}
          setIsOpen={setIsOpenBanner}
        >
          <h2 className="text-2xl uppercase font-bold">Update Banner</h2>
          <EditBannerInfo banner={banner} refetch={refetch} />
        </CustomModal>
      )}
    </>
  );
};

export default BannerTableRow;
