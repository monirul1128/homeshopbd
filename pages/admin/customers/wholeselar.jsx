import React, { useState } from "react";

import DashboardLayout from "../../../components/Components/DashboardLayout";
import ReSelarUser from "../../../components/Components/ManageUsers/AllUsers/ReSelarUser";

const Customers = () => {
  return (
    <DashboardLayout>
      <ReSelarUser />
    </DashboardLayout>
  );
};

export default Customers;
