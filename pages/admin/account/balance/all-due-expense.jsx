import React from "react";
import AdminDashboardBreadcrumb from '../../../../Shared/AdminDashboardBreadcrumb";
import AllExpense from '../../../../Components/Admin/Acount/TodaysExpense/AllExpense";
import DashboardLayout from '../../../../Components/DashboardLayout";

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
