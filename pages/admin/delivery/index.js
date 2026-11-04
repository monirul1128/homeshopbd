import React from "react";
import DashboardLayout from '../../../Components/Components/DashboardLayout";
import AddDelivery from '../../../Components/Components/Dlivery/AddDelivery";
import ShowDailvery from '../../../Components/Components/Dlivery/ShowDailvery";
import { useState } from "react";
import { useQuery } from "react-query";
import { shippingCost } from "../../../lib/helper";
import LoadingComponets from '../../../Components/Shared/LoadingComponets";
const DeliveryIndex = () => {
  const [query, setQuery] = useState();
  const [reloader, setReloader] = useState(true);

  const {
    data: shipping,
    isLoading,
    refetch,
  } = useQuery(["shipping-cost"], () => shippingCost(query));

  return (
    <DashboardLayout>
      <div className="my-8">
        <div>
          <AddDelivery refetch={refetch} />
        </div>
        {/* -----------here shipping cost table -------------------- */}
        {isLoading ? (
          <LoadingComponets />
        ) : (
          <ShowDailvery shipping={shipping} refetch={refetch} />
        )}
      </div>
    </DashboardLayout>
  );
};

export default DeliveryIndex;

