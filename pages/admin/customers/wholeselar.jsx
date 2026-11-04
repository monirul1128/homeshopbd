import React, { useState } from "react";

import DashboardLayout from '../../../Components/Components/DashboardLayout";
import ReSelarUser from '../../../Components/Components/ManageUsers/AllUsers/ReSelarUser";

const Customers = () => {
  return (
    <DashboardLayout>
      <ReSelarUser />
    </DashboardLayout>
  );
};

export default Customers;
