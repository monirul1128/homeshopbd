import React, { useEffect, useState } from "react";
import DashboardLayout from '../../../../Components/DashboardLayout";
import AdminDashboardBreadcrumb from '../../../../Shared/AdminDashboardBreadcrumb";
import { FetchGetHook3 } from "../../../../lib/FetchGetHook";
import server_url from "../../../../lib/config";
import { Icon } from "@iconify/react";
import CustomPagination from '../../../../Shared/CustomPagination";
import LoadingComponets from '../../../../Shared/LoadingComponets";
import AllUserRow4 from '../../../../Components/ManageUsers/AllUsers/AllUserRow4";
import { updateMethodHook } from "../../../../lib/usePostHooks";
import { useRouter } from "next/router";

const AddUser = () => {
  const [loading, setLoading] = useState();
  const [loading2, setLoading2] = useState();
  const [users, setUsers] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [select, setSelect] = useState([]);

  const router = useRouter();

  const id = router.query.id;

  let baseUrl = server_url + "/user";
  let url = server_url + "/meeting";
  useEffect(() => {
    if (id) {
      url += `/${id}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            setSelect(data?.data?.assignedUsers);
          }
        });
    }
  }, [url]);

  useEffect(() => {
    FetchGetHook3(
      `${baseUrl}?isWholesale=active&sort=-createdAt`,
      setUsers,
      setLoading
    );
  }, [baseUrl]);

  const handleSearch = (e) => {
    const query = e.target.value;
    baseUrl += `?search=${query}&isWholesale=active&sort=-createdAt`;
    FetchGetHook3(baseUrl, setUsers, setLoading);
  };

  const handleFilterByCategory = () => {
    if (select.length) {
      setSelect([]);
    } else {
      const ids = users?.map((item) => item._id);
      setSelect(ids);
    }
  };

  const handleAddCoupon = () => {
    setLoading2(true);
    const url = server_url + `/meeting/add-user/${id}`;
    const data = {
      userIds: select,
    };
    updateMethodHook(url, data, () => {}, setLoading2);
  };

  return (
    <DashboardLayout>
      <div className="mid-container">
        <AdminDashboardBreadcrumb
          title={"Add Meeting User"}
          subtitle={"Add your meeting user and necessary information from here"}
        />

        <div className=" bg-white shadow-sm mt-5 p-5 rounded-md">
          <div className=" flex flex-wrap gap-2 justify-between items-center">
            <div className="flex sm:my-2 md:my-0 ">
              <input
                onChange={handleSearch}
                type="text"
                placeholder="Phone or Email"
                className="placeholder:text-lightGray p-2 rounded-s-md text-md border border-primary  focus:outline-none sm:w-full"
              />
              <div className="bg-primary rounded-e-md py-2 px-3 flex items-center justify-center">
                <Icon icon="fa:search" className=" text-white text-lg " />
              </div>
            </div>

            <div className=" flex items-center justify-between gap-4">
              <div>
                <h2 className=" font-semibold text-xl">
                  {select.length} User Select
                </h2>
              </div>

              <button
                onClick={() => handleAddCoupon()}
                className=" py-2 px-5 bg-primary text-white shadow-md rounded-md"
              >
                {loading2 ? "Loading..." : "Add User"}
              </button>
            </div>
          </div>

          <div className="w-full sm:overflow-x-scroll  mt-5 md:overflow-x-scroll lg:overflow-x-hidden">
            <div className="border-b border-gray-200 shadow">
              <table className="w-full table-auto bg-[#F3F7FB]  divide-y divide-gray-300	">
                <thead className=" bg-primary text-white font-medium text-lg">
                  <tr>
                    <th className="px-6 py-4 text-start  text-white">
                      <label className="label bg-white rounded-md flex items-center justify-center  gap-2 cursor-pointer hover:text-primary">
                        <input
                          onChange={handleFilterByCategory}
                          type="checkbox"
                          checked={select.length}
                          //   value={user?._id}
                          className="checkbox border-2 border-[#777] checkbox-sm rounded-xs checkbox-primary"
                        />
                      </label>
                    </th>
                    <th className="px-6 py-4 text-start text-white">User</th>
                    <th className="px-6 py-4 text-start text-white">
                      Full Name
                    </th>
                    <th className="px-6 py-4 text-start text-white">Email</th>
                    <th className="px-6 py-4 text-start text-white">Phone</th>
                    <th className="px-6 py-4 text-start text-white">Status</th>
                    <th className="px-6 py-4 text-start text-white">Profit</th>
                    {/* <th className="px-6 py-4 text-start text-white">Pay</th> */}
                    <th className="px-6 py-4 text-start text-white">
                      Wholesaler
                    </th>
                  </tr>
                </thead>
                {loading ? (
                  <tbody className=" relative divide-y h-[250px] divide-secondary">
                    <div className=" absolute left-[50%]">
                      <LoadingComponets />
                    </div>
                  </tbody>
                ) : (
                  <tbody className="bg-white divide-y divide-secondary">
                    {currentItems?.map((user) => (
                      <AllUserRow4
                        user={user}
                        select={select}
                        setSelect={setSelect}
                      />
                    ))}
                  </tbody>
                )}
              </table>
              <CustomPagination
                arrayData={users}
                setCurrentItems={setCurrentItems}
                itemsPerPage={10}
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddUser;
