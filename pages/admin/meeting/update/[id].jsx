import React, { useState } from "react";
import DashboardLayout from '../../../../components/Components/DashboardLayout';
import AdminDashboardBreadcrumb from '../../../../components/Shared/AdminDashboardBreadcrumb';
import { useForm } from "react-hook-form";
import { updateMethodHook } from "../../../../lib/usePostHooks";
import server_url from "../../../../lib/config";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AddCategory = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const [coupon, setCoupon] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const id = router.query.id;
  let url = server_url + "/meeting";

  useEffect(() => {
    if (id) {
      setLoading(true);
      url += `/${id}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            const endTime = new Date(data?.data?.date);
            if (!isNaN(endTime.getTime())) {
              setValue("date", endTime?.toISOString().split("T")[0]);
            }
            setCoupon(data?.data);
            setValue("title", data?.data?.title);
            setValue("link", data?.data?.link);
            setValue("time", data?.data?.time);
            setValue("description", data?.data?.description);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [id, url]);

  const handleAddCoupon = (data) => {
    url += `/${id}`;
    updateMethodHook(url, data);
  };
  return (
    <DashboardLayout>
      <div className="mid-container">
        <AdminDashboardBreadcrumb
          title={"Update Coupons"}
          subtitle={"update your Coupons and necessary information from here"}
        />
        {coupon?.title && (
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
                    value={loading ? "Loading...." : "Update Meeting Link"}
                  />
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AddCategory;
