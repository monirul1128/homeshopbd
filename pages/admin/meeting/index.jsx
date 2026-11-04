import React, { useState } from "react";
import DashboardLayout from '../../../Components/Components/DashboardLayout";
import MeetingTable from '../../../Components/Components/meeting/MeetingTable";
import Link from "next/link";
import { useCustomQuery } from '../../../Components/hooks/useMyShopData";
import CustomPagination from '../../../Components/Shared/CustomPagination";

const Meeting = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [currentItems, setCurrentItems] = useState([]);

  const { data, isLoading, refetch } = useCustomQuery(
    ["meeting", searchQuery],
    `meeting?search=${searchQuery}&sort=-createdAt`
  );

  return (
    <DashboardLayout>
      <div className="">
        <h1 className="font-semibold mt-5 mb-2 text-xl">Meeting Link</h1>

        <div className="p-8 rounded bg-white shadow flex justify-center items-center gap-4">
          <div className="w-full md:w-[75%]">
            <input
              type="text"
              id="name"
              name="user_name"
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
              placeholder="Search by meeting name"
            />
          </div>

          <Link href={"/admin/meeting/add"} className="w-full md:w-[25%]">
            <button className="btn btn-primary font-medium w-full text-white">
              Add Meeting
            </button>
          </Link>
        </div>
        {/* -----------------------bellow table------------------------- */}
        <div className="mt-6">
          <div className="overflow-x-auto">
            <table className="table table-compact w-full">
              <thead>
                <tr>
                  <th className="bg-[#f3f3f3] text-center">Title</th>
                  <th className="bg-[#f3f3f3] text-center">Date</th>
                  <th className="bg-[#f3f3f3] text-center">Link</th>
                  <th className="bg-[#f3f3f3] text-center">Meeting Time</th>
                  <th className="bg-[#f3f3f3] text-center">Description</th>
                  <th className="bg-[#f3f3f3] text-center">User</th>
                  <th className="bg-[#f3f3f3] text-center">Add User</th>
                  <th className="bg-[#f3f3f3] text-center">ACTIONS </th>
                </tr>
              </thead>
              <tbody>
                {currentItems?.map((item, index) => (
                  <MeetingTable
                    key={item?._id}
                    coupon={item}
                    index={index}
                    refetch={refetch}
                  ></MeetingTable>
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
      </div>
    </DashboardLayout>
  );
};

export default Meeting;
