import React, { useEffect, useState } from "react";
import DashboardLayout from '../../../components/Components/Components/DashboardLayout';
import FlashProductLeft from '../../../components/Components/Components/Admin/flashProduct/FlashProductLeft';
import FlashProductRight from '../../../components/Components/Components/Admin/flashProduct/FlashProductRight';
import AdminDashboardBreadcrumb from '../../../components/Components/Shared/AdminDashboardBreadcrumb';

const flashProduct = () => {
  const id = "67286ae0d61c251be5f2a286";
  const [products, setProducts] = useState([]);
  const [time, setTime] = useState();
  let url = `https://server-homeshopbd-2-kohl.vercel.app/api/v1/banner/flash/${id}`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setProducts(data?.data?.product);
          const endTime = new Date(data?.data?.end_time);
          if (!isNaN(endTime.getTime())) {
            setTime(endTime.toISOString().split("T")[0]);
          }
        }
      });
  }, [id]);

  return (
    <DashboardLayout>
      <AdminDashboardBreadcrumb title={"Flash Deal Product"} />

      <div className=" flex md:flex-row flex-col-reverse gap-5 mt-6">
        <div className=" w-full">
          <FlashProductLeft
            setGetProductId={setProducts}
            getProductId={products}
            id={id}
            time={time}
            setTime={setTime}
          />
        </div>

        <div className=" w-full">
          <FlashProductRight
            setGetProductId={setProducts}
            getProductId={products}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default flashProduct;
