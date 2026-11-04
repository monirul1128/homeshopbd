import React, { useState } from "react";

import DashboardLayout from '../../../components/Components/Components/DashboardLayout';
import AllUsers from '../../../components/Components/Components/ManageUsers/AllUsers/AllUsers';

const Customers = () => {
  return (
    <DashboardLayout>
      <AllUsers />
    </DashboardLayout>
  );
};

export default Customers;

