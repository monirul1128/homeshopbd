import React from "react";
import AdminDashboardBreadcrumb from '../../../../shared/AdminDashboardBreadcrumb";
import AllExpense from '../../../../components/Admin/Acount/TodaysExpense/AllExpense";
import DashboardLayout from '../../../../components/DashboardLayout";

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
