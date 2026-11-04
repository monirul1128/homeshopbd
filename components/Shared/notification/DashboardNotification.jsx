import React, { useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { useCustomQuery } from "../../hooks/useMyShopData";
import Image from "next/image";
import userImage from "../../assets/image/user.jpg";
import moment from "moment/moment";
import server_url from "../../../lib/config";

const DashboardNotification = () => {
  const [loading, setLoading] = useState(false);
  const { data, isLoading, refetch } = useCustomQuery(
    ["notification"],
    `notification?status=unread`
  );

  const url = `${server_url}/notification/update`;

  const updateData = () => {
    fetch(url, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data?.status === "success") {
          setLoading(false);
          refetch();
        }
        if (data.status === "fail") {
          setLoading(false);
        }
      });
  };

  return (
    <div className=" mr-5">
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="">
          <button className=" relative">
            <IoNotificationsOutline className=" text-2xl" />
            <div className=" absolute top-[-4px] right-[-2px] bg-yellow-500 flex items-center justify-center text-white h-[15px] w-[15px] rounded-full">
              <span className=" text-[10px]">{data?.data?.result?.length}</span>
            </div>
          </button>
        </label>
        <div
          tabIndex={0}
          className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-md w-[300px]"
        >
          <div className=" flex items-center border-b pb-2 px-2 justify-between">
            <h2>Notification</h2>
            <div className=" flex items-center gap-2">
              <button
                onClick={() => updateData()}
                disabled={loading}
                className=" text-sm font-normal bg-gray-200 py-1 px-2 rounded-md"
              >
                Read
              </button>
            </div>
          </div>

          <div className=" max-h-[300px] mt-1 min-h-[250px] flex flex-col gap-2 overflow-y-auto">
            {data?.data?.result?.map((item) => {
              return (
                <div
                  key={item?._id}
                  className={`rounded-md py-1 px-2 flex items-center gap-1 ${
                    item.type === "payment" ? " bg-red-100" : " bg-green-100"
                  }`}
                >
                  <div>
                    <Image
                      src={
                        item?.userId?.imageURL
                          ? item?.userId?.imageURL
                          : userImage
                      }
                      width={100}
                      height={100}
                      alt="user"
                      className="w-[40px] h-[40px] rounded-full object-cover"
                    />
                  </div>

                  <div className=" w-[80%]">
                    <div className=" flex items-center justify-between w-full">
                      <h2>{item?.userId?.fullName}</h2>
                      <span className=" text-[12px] font-normal">
                        {moment(item?.createdAt).fromNow()}
                      </span>
                    </div>
                    <div>
                      <p className=" text-sm font-normal">
                        {item.title}{" "}
                        {item.type === "order" && (
                          <span
                            className={`
                          rounded-md text-sm`}
                          >
                            {item?.userId?.isWholesale === "active"
                              ? "(Wholesale Order)"
                              : "( Normal Order )"}
                          </span>
                        )}{" "}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNotification;
