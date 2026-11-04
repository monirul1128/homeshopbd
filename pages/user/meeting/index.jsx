import React, { useState } from "react";
import { useCustomQuery } from "../../../components/hooks/useMyShopData";
import Link from "next/link";
import MeetingTableUser from "../../../components/Components/meeting/MeetingTableUser";
import CustomPagination from "../../../components/Shared/CustomPagination";
import UserDashLayout from "../../../components/Components/userDashLayout";
import AuthUser from "../../../lib/AuthUser";

const Meeting = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { userInfo } = AuthUser();
  const id = userInfo?._id;

  const [currentItems, setCurrentItems] = useState([]);

  const { data, isLoading, refetch } = useCustomQuery(
    ["meeting", searchQuery, userInfo?._id],
    `meeting?assignedUser=${userInfo?._id}&search=${searchQuery}&sort=-createdAt`
  );

  console.log("hello", data);

  const userStatuses = data?.data?.result?.map((meeting) => {
    const user = meeting?.assignedUsers?.find((u) => u.user === id);
    return {
      meetingTitle: meeting?.title,
      status: user ? user?.status : "Not Assigned",
    };
  });

  const read = userStatuses?.filter((item) => item?.status === "unread");

  return (
    <UserDashLayout>
      <div className=" px-7">
        <div>
          <div>
            <h1 className="font-semibold mt-5 text-2xl">Announcements</h1>
            <span className=" text-sm font-normal text-gray-500">
              You have {read?.length ? read?.length : 0} unread announcements.
            </span>
          </div>

          <button></button>
        </div>

        {/* -----------------------bellow table------------------------- */}

        {isLoading ? (
          <>
          <h2 className=" text-xl font-semibold">Loading...</h2>
          </>
        ) : (
          <div className="mt-2">
            <div className="overflow-x-auto">
              <table className="table table-compact w-full">
                <thead>
                  <tr className=" text-start">
                    <th className="bg-[#f3f3f3] text-start">Subject</th>
                    <th className="bg-[#f3f3f3] text-start">Date published</th>
                    <th className="bg-[#f3f3f3] text-start">Meeting Time</th>
                    <th className="bg-[#f3f3f3] text-start">Status</th>
                    <th className="bg-[#f3f3f3] text-start"></th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems?.map((item, index) => (
                  <MeetingTableUser
                    key={item?._id}
                    coupon={item}
                    index={index}
                    userId={id}
                    refetch={refetch}
                  ></MeetingTableUser>
                ))}
                </tbody>
              </table>

              {
                <CustomPagination
                  arrayData={data?.data?.result ? data?.data?.result : []}
                  setCurrentItems={setCurrentItems}
                  itemsPerPage={10}
                />
              }
            </div>
          </div>
        )}
      </div>
    </UserDashLayout>
  );
};

export default Meeting;
