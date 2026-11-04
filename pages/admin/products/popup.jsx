import React, { useEffect, useState } from "react";
import DashboardLayout from '../../../components/Components/Components/DashboardLayout';
import FlashProductRight from '../../../components/Components/Components/Admin/flashProduct/FlashProductRight';
import AdminDashboardBreadcrumb from '../../../components/Components/Shared/AdminDashboardBreadcrumb';
import PopUpProductLeft from '../../../components/Components/Components/Admin/flashProduct/PopUpProductLeft';

const flashProduct = () => {
  const id = "693e47c05f133d7f48c32bd3";
  const [products, setProducts] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState();
  const [status, setStatus] = useState("");
  let url = `https://server-homeshopbd-2-kohl.vercel.app/api/v1/banner/flash/${id}`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setProducts(data?.data?.product);
          setImageUrl(data?.data?.image);
          setTitle(data?.data?.title);
          setStatus(data?.data?.status);
          const endTime = new Date(data?.data?.end_time);
          if (!isNaN(endTime.getTime())) {
            setTime(endTime.toISOString().split("T")[0]);
          }
        }
      });
  }, [id]);

  return (
    <DashboardLayout>
      <AdminDashboardBreadcrumb title={"Pop Up Product"} />

      <div className=" flex md:flex-row flex-col-reverse gap-5 mt-6">
        <div className=" w-full">
          <PopUpProductLeft
            setGetProductId={setProducts}
            getProductId={products}
            id={id}
            time={time}
            setTime={setTime}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            title={title}
            setTitle={setTitle}
            status={status}
            setStatus={setStatus}
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
