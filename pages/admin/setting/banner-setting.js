import React from "react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { FaPlusSquare } from "react-icons/fa";
import { useCustomQuery } from '../../../components/Components/hooks/useMyShopData';
import LoadingComponets from '../../../components/Components/Shared/LoadingComponets';

const AddBanner = dynamic(
  () => import("../../../components/Components/Admin/Banner/AddBanner"),
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
const BannerMangeTable = dynamic(
  () => import("../../../components/Components/Admin/Banner/BannerMangeTable"),
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

const BannerSetting = () => {
  const [addBanner, setAddBanner] = useState(false);
  const { data, isLoading, refetch } = useCustomQuery("banner", "banner");
  if (isLoading) {
    return <LoadingComponets />;
  }

  return (
    <DashboardLayout>
      <AdminDashboardBreadcrumb title={"Banner Setting"} />
      <div className="text-start">
        <span
          onClick={() => setAddBanner(!addBanner)}
          className="btn btn-warning hover:btn-warning mt-5 btn-sm text-white  gap-2 items-center "
        >
          {!addBanner ? <FaPlusSquare size={20} /> : <span>X</span>}
          Add Banner
        </span>
      </div>
      <div>
        {addBanner && (
          <AddBanner setAddBanner={setAddBanner} refetch={refetch} />
        )}
        <BannerMangeTable refetch={refetch} data={data} />
      </div>
    </DashboardLayout>
  );
};

export default BannerSetting;

