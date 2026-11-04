import React from "react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { FaPlusSquare } from "react-icons/fa";
import { useCustomQuery } from '../../../components/hooks/useMyShopData';
import LoadingComponets from '../../../components/Shared/LoadingComponets';

const AddBrand = dynamic(
  () => import("../../../components/Components/Admin/Brand/AddBrand"),
  {
    loading: () => <p>Loading...</p>,
  }
);
const DashboardLayout = dynamic(
  () => import("../../../components/Components/DashboardLayout"),
  {
    loading: () => <p>Loading...</p>,
  }
);
const BrandMangeTable = dynamic(
  () => import("../../../components/Components/Admin/Brand/BrandMangeTable"),
  {
    loading: () => <p>Loading...</p>,
  }
);
const AdminDashboardBreadcrumb = dynamic(
  () => import("../../../components/Shared/AdminDashboardBreadcrumb"),
  {
    loading: () => <p>Loading...</p>,
  }
);



const BrandSetting = () => {
  const [addBrand, setAddBrand] = useState(false);
  const { data, isLoading, refetch } = useCustomQuery("brand", "brands");
  if (isLoading) {
    return <LoadingComponets />;
  }

  return (
    <DashboardLayout>
      <AdminDashboardBreadcrumb title={"Brand Setting"} />
      <div className="text-start">
        <span
          onClick={() => setAddBrand(!addBrand)}
          className="btn btn-warning hover:btn-warning mt-5 btn-sm text-white  gap-2 items-center "
        >
          {!addBrand ? <FaPlusSquare size={20} /> : <span>X</span>}
          Add Brand
        </span>
      </div>
      <div>
        {addBrand && <AddBrand setAddBrand={setAddBrand} refetch={refetch} />}
        <BrandMangeTable refetch={refetch} data={data} />
      </div>
    </DashboardLayout>
  );
};

export default BrandSetting;

