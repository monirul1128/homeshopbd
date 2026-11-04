import axios from "axios";
import React from "react";
import * as XLSX from "xlsx";

const DownloadButton = ({ query }) => {
  const downloadCSV = async () => {
    try {
      const response = await axios.get(
        `https://server-homeshopbd-2-kohl.vercel.app/api/v1/user?sort=-createdAt&${query}`
      );

      // Prepare the data for the CSV file
      const tableRows = response?.data?.data?.data?.result
        ?.filter((item) => item?.role === "resaller")
        .map((order) => ({
          fullName: order.fullName,
          Email: order.email,
          phone: order?.phone,
          Wholesale: order?.isWholesale,
          role: order.role,
          "Payable Amount": order?.activeBaleens,
          "Pending Amount": order?.dueBaleens,
        }));

      const worksheet = XLSX.utils.json_to_sheet(tableRows);
      const csvData = XLSX.utils.sheet_to_csv(worksheet);

      // Create a blob from the CSV data
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");

      // Download the CSV file
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = "expense.csv";
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the CSV file", error);
    }
  };

  return (
    <div>
      <button
        onClick={() => downloadCSV()}
        className=" py-2 px-5 bg-blue-500 text-white rounded-md"
      >
        Download CSV
      </button>
    </div>
  );
};

export default DownloadButton;
