import React, { useState } from "react";
import DashboardLayout from '../../../components/Components/Components/DashboardLayout';
import AdminDashboardBreadcrumb from '../../../components/Components/Shared/AdminDashboardBreadcrumb';
import { useForm } from "react-hook-form";
import { postMethodHook } from "../../../lib/usePostHooks";
import server_url from "../../../lib/config";
import "react-datepicker/dist/react-datepicker.css";

const AddCategory = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const handleAddCoupon = (data) => {
    setLoading(true);
    const url = server_url + "/meeting";
    postMethodHook(url, data, () => {}, setLoading, reset);
  };

  return (
    <DashboardLayout>
      <div className="mid-container">
        <AdminDashboardBreadcrumb
          title={"Add Meeting Link"}
          subtitle={"Add your meeting link and necessary information from here"}
        />
        <div className="mt-5 md:px-7">
          {/* ----------------------end image------------------- */}
          <form onSubmit={handleSubmit(handleAddCoupon)}>
            <div className="md:flex block items-center gap-5 mb-4">
              <div className="w-full md:w-[30%] text-lg font-semibold">
                <p>Meeting title</p>
              </div>
              <div className="w-full md:w-[70%]">
                <input
                  type={"text"}
                  {...register("title", { required: true })}
                  className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                  placeholder="Coupon Title "
                />
              </div>
            </div>
            <div className="md:flex block items-center gap-5 mb-4">
              <div className="w-full md:w-[30%] text-lg font-semibold">
                <p>Meeting Date</p>
              </div>
              <div className="w-full md:w-[70%]">
                <input
                  type={"date"}
                  {...register("date", { required: true })}
                  className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                  placeholder="Meeting Date "
                />
              </div>
            </div>

            <div className="md:flex block items-center gap-5 mb-4">
              <div className="w-full md:w-[30%] text-lg font-semibold">
                <p>Meeting Link</p>
              </div>
              <div className="w-full md:w-[70%]">
                <input
                  type={"url"}
                  {...register("link", { required: false })}
                  className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                  placeholder="Meeting Link"
                />
              </div>
            </div>

            <div className="md:flex block items-center gap-5 mb-4">
              <div className="w-full md:w-[30%] text-lg font-semibold">
                <p>Meeting time</p>
              </div>
              <div className="w-full md:w-[70%]">
                <input
                  type={"text"}
                  {...register("time", { required: false })}
                  className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                  placeholder="Meeting time"
                />
              </div>
            </div>

            <div className="md:flex block items-center gap-5 mb-4">
              <div className="w-full md:w-[30%] text-lg font-semibold">
                <p>Meeting Description</p>
              </div>
              <div className="w-full md:w-[70%]">
                <input
                  type={"text"}
                  {...register("description", { required: false })}
                  className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                  placeholder="Meeting description"
                />
              </div>
            </div>

            <div className="md:flex block items-center gap-5 mb-4">
              <div className="w-[30%] text-lg font-semibold md:block hidden"></div>
              <div className="w-full md:w-[70%]">
                <input
                  type={"submit"}
                  disabled={loading}
                  className="btn btn-primary w-full text-white"
                  value={loading ? "Loading...." : "Add Meeting Link"}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddCategory;
