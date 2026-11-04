import React, { useState } from "react";

import DashboardLayout from '../../../components/Components/DashboardLayout';
import AllUsers from '../../../components/Components/ManageUsers/AllUsers/AllUsers';

const Customers = () => {
  return (
    <DashboardLayout>
      <AllUsers />
    </DashboardLayout>
  );
};

export default Customers;

