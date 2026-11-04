import React from "react";
import AdminDashboardBreadcrumb from '../../../../components/Shared/AdminDashboardBreadcrumb';
import AllExpense from '../../../../components/Components/Admin/Acount/TodaysExpense/AllExpense';
import DashboardLayout from '../../../../components/Components/DashboardLayout';

const ALLDueExpense = () => {
  return (
    <>
    <DashboardLayout>
      <div className="mid-container">
        <AdminDashboardBreadcrumb
          title={"All Due Expenses"}
        />
        <div>
            <AllExpense type={"unpaid"}/>
        </div>
      </div>
    </DashboardLayout>
    </>
  );
};

export default ALLDueExpense;
