import React, { useEffect, useState } from "react";
import DashboardLayout from '../../../../components/DashboardLayout";
import AdminDashboardBreadcrumb from '../../../../shared/AdminDashboardBreadcrumb";
import AddProductLeft from '../../../../components/Admin/Banner/AddProduct/AddProductLeft";
import AddProductRight from '../../../../components/Admin/Banner/AddProduct/AddProductRight";
import { useRouter } from "next/router";

const BannerProduct = () => {
  const router = useRouter();
  const id = router.query.id;
  const [products, setProducts] = useState([]);
  let url = `https://server-homeshopbd-2-kohl.vercel.app/api/v1/banner/${id}`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setProducts(data?.data?.product);
        }
      });
  }, [id]);

  return (
    <DashboardLayout>
      <AdminDashboardBreadcrumb title={"Add Banner Product"} />

      <div className=" flex md:flex-row flex-col-reverse gap-5 mt-6">
        <div className=" w-full">
          <AddProductLeft
            setGetProductId={setProducts}
            getProductId={products}
            id={id}
          />
        </div>

        <div className=" w-full">
          <AddProductRight
            setGetProductId={setProducts}
            getProductId={products}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BannerProduct;
