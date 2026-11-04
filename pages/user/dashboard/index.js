import React, { useContext, useState } from "react";
import UserDashLayout from "../../../components/Components/userDashLayout";
import { MdLocalShipping, MdOutlineDone, MdPending } from "react-icons/md";
import { useQuery } from "react-query";
import { getUserDashboardInfo, getUsersById } from "../../../lib/helper";
import AuthUser from "../../../lib/AuthUser";
import DasboardOrderTable from "../../../components/Components/User/DasboardOrderTable";
import { FcPaid } from "react-icons/fc";
import CreateContext from "../../../components/Components/CreateContex";
import { TbCalendarDue } from "react-icons/tb";
import { updateMethodHook } from "../../../lib/usePostHooks";
import server_url from "../../../lib/config";
import swal from "sweetalert";
import { SiVirustotal } from "react-icons/si";
import { MdOutlinePending } from "react-icons/md";
import CustomModal from "../../../components/Shared/CustomModal";
import PaymentHistory from "../../../components/Components/User/paymentHistory/PaymentHistory";
import SubmitModal from "../../../components/Components/User/SubmitModal";

const UserDashboard = () => {
  const { userInfo } = AuthUser();
  const [open2, setOpen2] = useState(false);
  const id = userInfo?._id;
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { data, refetch: userRefetch } = useQuery(["users", id], () => {
    if (id) {
      return getUsersById(id);
    }
  });


  const {
    data: dashboard,
    isLoading,
    refetch,
  } = useQuery(["user-dashboard"], () => {
    if (userInfo._id) {
      return getUserDashboardInfo(userInfo._id);
    }
  });

  const url = `${server_url}/user/pay-request/${id}`;

  const handleUpdateUser = (final) => {
    setLoading(true);
    if (data?.data?.activeBaleens <= 50) {
      swal(
        "error",
        "Your Active Balance is low You can withdraw your balance if it is at least 50 TK",
        "error"
      );
      setLoading(false);
    } else {
      if (!final) {
        swal("error", "Please Add Bkash Number First", "error");
        setLoading(false);
      } else {
        const newData = {
          baleens: data?.data?.activeBaleens,
          account_Type: final?.name,
          bikash_Number: final?.number,
        };
        updateMethodHook(url, newData, successData, setLoading);
      }
    }
  };

  const successData = () => {
    userRefetch();
    setOpen2(false);
  };

  return (
    <UserDashLayout>
      <div className="my-8 md:my-16 mx-2 ">
        <h2 className="text-3xl font-bold mx-6 uppercase ">Dashboard</h2>
        <section className="p-6 my-6 mx-6 bg-gray-100  rounded-md text-gray-800">
          <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
            <div className="flex p-4 space-x-4 rounded-lg md:space-x-6  shadow-md bg-white text-gray-800">
              <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-red-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  className="h-9 w-9 text-red-500"
                >
                  <polygon points="160 96.039 160 128.039 464 128.039 464 191.384 428.5 304.039 149.932 304.039 109.932 16 16 16 16 48 82.068 48 122.068 336.039 451.968 336.039 496 196.306 496 96.039 160 96.039"></polygon>
                  <path d="M176.984,368.344a64.073,64.073,0,0,0-64,64h0a64,64,0,0,0,128,0h0A64.072,64.072,0,0,0,176.984,368.344Zm0,96a32,32,0,1,1,32-32A32.038,32.038,0,0,1,176.984,464.344Z"></path>
                  <path d="M400.984,368.344a64.073,64.073,0,0,0-64,64h0a64,64,0,0,0,128,0h0A64.072,64.072,0,0,0,400.984,368.344Zm0,96a32,32,0,1,1,32-32A32.038,32.038,0,0,1,400.984,464.344Z"></path>
                </svg>
              </div>
              <div className="flex flex-col justify-center align-middle ">
                <p className="text-3xl font-semibold leading-none">
                  {dashboard?.data?.totalOrders}
                </p>
                <p className="capitalize">Total Order</p>
              </div>
            </div>
            <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-white shadow-md text-gray-800">
              <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-orange-200">
                <MdPending size={35} className="text-orange-500" />
              </div>
              <div className="flex flex-col justify-center align-middle">
                <p className="text-3xl font-semibold leading-none">
                  {dashboard?.data?.pendingOrders}
                </p>
                <p className="capitalize">Pending Order</p>
              </div>
            </div>
            <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-white shadow-md text-gray-800">
              <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-blue-200">
                <MdLocalShipping size={35} className="text-blue-500" />
              </div>
              <div className="flex flex-col justify-center align-middle">
                <p className="text-3xl font-semibold leading-none">
                  {dashboard?.data?.processingOrders}
                </p>
                <p className="capitalize">Processing Order</p>
              </div>
            </div>
            <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-white shadow-md text-gray-800">
              <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-emerald-200">
                <MdOutlineDone size={35} className="text-emerald-500" />
              </div>
              <div className="flex flex-col justify-center align-middle">
                <p className="text-3xl font-semibold leading-none">
                  {dashboard?.data?.completeOrders}
                </p>
                <p className="capitalize">Complete Order</p>
              </div>
            </div>
            {data?.data?.role === "resaller" && (
              <>
                <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-white shadow-md text-gray-800">
                  <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-orange-200">
                    <SiVirustotal size={35} className=" text-orange-500" />
                  </div>
                  <div className="flex flex-col justify-center align-middle">
                    <p className="text-3xl font-semibold leading-none">
                      ৳{data?.data?.totalBaleens ? data?.data?.totalBaleens : 0}
                    </p>
                    <p className="capitalize">Total Withdraw</p>
                  </div>
                </div>
                <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-white shadow-md text-gray-800">
                  <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-orange-200">
                    <FcPaid size={35} className=" text-orange-500" />
                  </div>
                  <div className="flex flex-col justify-center align-middle">
                    <p className="text-3xl font-semibold leading-none">
                      ৳
                      {data?.data?.activeBaleens
                        ? data?.data?.activeBaleens -
                          (data?.data?.pendingBaleens
                            ? data?.data?.pendingBaleens
                            : 0)
                        : 0}
                    </p>
                    <p className="capitalize">My Balance</p>
                  </div>
                </div>
                <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-white shadow-md text-gray-800">
                  <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-emerald-200">
                    <TbCalendarDue size={35} className="text-emerald-500" />
                  </div>
                  <div className="flex flex-col justify-center align-middle">
                    <p className="text-3xl font-semibold leading-none">
                      ৳{data?.data?.dueBaleens ? data?.data?.dueBaleens : 0}
                    </p>
                    <p className="capitalize">Pending Balance</p>
                  </div>
                </div>

                <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-white shadow-md text-gray-800">
                  <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-emerald-200">
                    <MdOutlinePending size={35} className="text-emerald-500" />
                  </div>
                  <div className="flex flex-col justify-center align-middle">
                    <p className="text-3xl font-semibold leading-none">
                      ৳
                      {data?.data?.pendingBaleens
                        ? data?.data?.pendingBaleens
                        : 0}
                    </p>
                    <p className="capitalize">Withdraw Pending</p>
                  </div>
                </div>
              </>
            )}
          </div>
          {data?.data?.role === "resaller" && (
            <div className=" flex items-center justify-start gap-3 mt-7">
              {data?.data?.with_dro === "active" ? (
                <button
                  disabled
                  className=" py-2 px-5 bg-gray-500  duration-200 rounded-lg text-white"
                >
                  Withdraw request send
                </button>
              ) : (
                <>
                  {data?.data?.activeBaleens && (
                    <button
                      disabled={loading}
                      onClick={() => setOpen2(true)}
                      className=" py-2 px-5 bg-green-700 hover:bg-green-900 duration-200 rounded-lg text-white"
                    >
                      {"Withdraw Amount"}
                    </button>
                  )}
                </>
              )}

              <button
                onClick={() => setOpen(true)}
                className=" py-2 px-5 bg-yellow-600 hover:bg-yellow-700 duration-200 rounded-lg text-white"
              >
                Payment History
              </button>
            </div>
          )}
        </section>

        <DasboardOrderTable style={{ mx: "mx-6" }} dataRight="user" />
      </div>
      <CustomModal modalIsOpen={open} setIsOpen={setOpen}>
        <PaymentHistory id={data?.data?._id} />
      </CustomModal>

      <CustomModal modalIsOpen={open2} setIsOpen={setOpen2}>
        <SubmitModal
          data={data?.data}
          loading={loading}
          handleUpdateUser={handleUpdateUser}
        />
      </CustomModal>
    </UserDashLayout>
  );
};

export default UserDashboard;

