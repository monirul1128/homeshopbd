import React, { useState } from "react";
import DashboardLayout from '../../../components/Components/DashboardLayout';
import Link from "next/link";
import { useCustomQuery } from '../../../components/hooks/useMyShopData';
import CustomPagination from '../../../components/Shared/CustomPagination';
import BlogTable from '../../../components/Components/Admin/blog/BlogTable';

const Blogs = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [currentItems, setCurrentItems] = useState([]);

  const { data, isLoading, refetch ,error} = useCustomQuery(
    ["blog", searchQuery],
    `blog?search=${searchQuery}&sort=-createdAt`
  );

  console.log(error)

  return (
    <DashboardLayout>
      <div className="">
        <h1 className="font-semibold mt-5 mb-2 text-xl">Blog</h1>

        <div className="p-8 rounded bg-white shadow flex justify-center items-center gap-4">
          <div className="w-full md:w-[75%]">
            <input
              type="text"
              id="name"
              name="user_name"
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
              placeholder="Search by blog title"
            />
          </div>

          <Link href={"/admin/blog/add"} className="w-full md:w-[25%]">
            <button className="btn btn-primary font-medium w-full text-white">
              Add Blog
            </button>
          </Link>
        </div>
        {/* -----------------------bellow table------------------------- */}
        <div className="mt-6">
          <div className="overflow-x-auto">
            <table className="table table-compact w-full">
              <thead>
                <tr>
                    <th className="bg-[#f3f3f3] text-center">Image</th>
                  <th className="bg-[#f3f3f3] text-center">Title</th>
                  <th className="bg-[#f3f3f3] text-center">View</th>
                  <th className="bg-[#f3f3f3] text-center">Author</th>
                  <th className="bg-[#f3f3f3] text-center">Published Date</th>
                  <th className="bg-[#f3f3f3] text-center">Sort Description</th>
                  <th className="bg-[#f3f3f3] text-center">ACTIONS </th>
                </tr>
              </thead>
              <tbody>
                {currentItems?.map((item, index) => (
                  <BlogTable
                    key={item?._id}
                    coupon={item}
                    index={index}
                    refetch={refetch}
                  ></BlogTable>
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

export default Blogs;
