import React, { useState } from "react";

import DashboardLayout from '../../../Components/Components/DashboardLayout";
import AllUsers from '../../../Components/Components/ManageUsers/AllUsers/AllUsers";

const Customers = () => {
  return (
    <DashboardLayout>
      <AllUsers />
    </DashboardLayout>
  );
};

export default Customers;

