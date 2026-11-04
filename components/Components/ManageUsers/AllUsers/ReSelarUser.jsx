import { Icon } from "@iconify/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import server_url from "../../../../lib/config";
import FetchGetHook, { FetchGetHook3 } from "../../../../lib/FetchGetHook";
import AllUserRow from "./AllUserRow";
import CustomPagination from '../../../shared/CustomPagination";
import AllUserRow2 from "./AllUserRow2";
import LoadingComponets from '../../../shared/LoadingComponets";
import DownloadButton from "./DownloadButton";
import CustomPagination3 from '../../../shared/CustomPagination3";
import CustomPagination2 from '../../../shared/CustomPagination2";

const ReSelarUser = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [singelUser, setSingeUser] = useState({});
  const handleOpen = () => setOpen(!open);
  const [reloader, setReloder] = useState(true);
  const [loading, setLoading] = useState();
  const [finalQuery, setFinalQuery] = useState("");
  // ---------------for pagination-----------------------
  const [currentItems, setCurrentItems] = useState([]);

  // ---------------for pagination-----------------------

  let baseUrl = server_url + "/user";

  useEffect(() => {
    FetchGetHook3(`${baseUrl}?sort=-createdAt`, setUsers, setLoading);
  }, [baseUrl, reloader]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setFinalQuery(`search=${query}`);
    baseUrl += `?search=${query}&sort=-createdAt`;
    FetchGetHook3(baseUrl, setUsers, setLoading);
  };

  const handleFilterUser = (e) => {
    const query = e.target.value;
    if (query === "all") {
      setFinalQuery(``);
      FetchGetHook3(baseUrl, setUsers, setLoading);
    } else {
      setFinalQuery(`status=${query}`);
      baseUrl += `?status=${query}&sort=-createdAt`;
      FetchGetHook3(baseUrl, setUsers, setLoading);
    }
  };
  const handleFilterRole = (e) => {
    const query = e.target.value;
    if (query === "all") {
      setFinalQuery(``);
      FetchGetHook3(baseUrl, setUsers, setLoading);
    } else {
      setFinalQuery(`role=${query}`);
      baseUrl += `?role=${query}&sort=-createdAt`;
      FetchGetHook3(baseUrl, setUsers, setLoading);
    }
  };

  const handleFilterWholesaler = (e) => {
    const query = e.target.value;
    if (query === "all") {
      setFinalQuery(``);
      FetchGetHook3(baseUrl, setUsers, setLoading);
    } else {
      setFinalQuery(`isWholesale=${query}`);
      baseUrl += `?isWholesale=${query}&sort=-createdAt`;
      FetchGetHook3(baseUrl, setUsers, setLoading);
    }
  };

  // delete user
  const handleUserDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this information!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `${server_url}/user/${id}`;
        fetch(url, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            swal("Successfully Deleted!", {
              icon: "success",
            });
            setReloder(!reloader);
          });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  console.log(currentItems);

  return (
    <div className=" lg:my-16 pr-5 ">
      <div className="flex flex-col md:flex-row  md:justify-between sm:mb-5 md:mb-10">
        <h1 className="text-primary text-2xl font-bold">All Reseller</h1>
        <div className=" flex flex-wrap gap-2 items-center">
          {/* <div>
            <Link href={"/admin/customers/add-user"}>
              <button className=" px-3 py-2 cursor-pointer border flex gap-2 items-center bg-primary outline-none border-primary text-white hover:bg-[#43ff641a] duration-150 hover:text-primary rounded-md">
                <Icon icon="material-symbols:group-add" className="text-xl" />
                Add New
              </button>
            </Link>
          </div> */}
          <div className="border p-2 bg-white border-primary rounded-md">
            <select
              onChange={handleFilterUser}
              className="outline-none cursor-pointer"
            >
              <option value={"all"}>All Status</option>
              <option value={"active"}>Active</option>
              <option value={"blocked"}>Banned</option>
            </select>
          </div>
          {/* <div className="border p-2 bg-white border-primary rounded-md">
            <select
              onChange={handleFilterRole}
              className="outline-none cursor-pointer "
            >
              <option value={"all"}>All Role</option>
              <option value={"user"}>Customers</option>
              <option value={"admin"}>Admin</option>
            </select>
          </div> */}
          {/* <div className="border p-2 bg-white border-primary rounded-md">
            <select
              onChange={handleFilterRole}
              className="outline-none cursor-pointer "
            >
              <option value={"all"}>All Role</option>
              <option value={"user"}>Customers</option>
              <option value={"admin"}>Admin</option>
            </select>
          </div> */}
          <div className="border p-2 bg-white border-primary rounded-md">
            <select
              onChange={handleFilterWholesaler}
              className="outline-none cursor-pointer "
            >
              <option value={"all"}>All Wholesaler</option>
              <option value={"active"}>Active</option>
              <option value={"inactive"}>Inactive</option>
            </select>
          </div>
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
          <div>
            <DownloadButton query={finalQuery} />
          </div>
        </div>
      </div>
      <div className="w-full sm:overflow-x-scroll mt-3 md:mt-0 md:overflow-x-scroll">
        <div className="border-b border-gray-200 shadow">
          <table className="w-full table-auto bg-[#F3F7FB] divide-y divide-gray-300	">
            <thead className=" bg-primary text-white font-bold text-lg">
              <tr>
                <th className="px-6 py-4 text-start text-white">User</th>
                <th className="px-6 py-4 text-start text-white">Email</th>
                <th className="px-6 py-4 text-start text-white">Phone</th>
                <th className="px-6 py-4 text-start text-white">Status</th>
                <th className="px-6 py-4 text-start text-white">
                  Date & Coupon
                </th>
                <th className="px-6 py-4 text-start text-white">End Date</th>
                <th className="px-6 py-4 text-start text-white">Profit</th>
                {/* <th className="px-6 py-4 text-start text-white">Pay</th> */}
                <th className="px-6 py-4 text-start text-white">Wholesaler</th>
                <th className="px-6 py-4 text-start text-white">Action</th>
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
                  <AllUserRow2
                    key={user}
                    handleUserDelete={handleUserDelete}
                    user={user}
                    setSingeUser={setSingeUser}
                    handleOpen={handleOpen}
                    setReloder={setReloder}
                    reloader={reloader}
                  />
                ))}
              </tbody>
            )}
          </table>
          <CustomPagination2
            arrayData={users}
            setCurrentItems={setCurrentItems}
            itemsPerPage={10}
          />

          {/* <div>
            <CustomPagination3 total={data?.data?.total} itemsPerPage={limit} />
          </div> */}
        </div>
      </div>
      {/* <DetailsUser open={open} handleClose={handleClose} user={singelUser} /> */}
    </div>
  );
};

export default ReSelarUser;
