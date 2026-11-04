import React, { useEffect, useState } from "react";
import server_url from "../../../../lib/config";
import { FetchHistory } from "../../../../lib/FetchGetHook";
import { Icon } from "@iconify/react";
import { convertTimestamp2, convertTimestamp3 } from "../../../../lib/convertTimestampDateAndTime";

const PaymentHistory = ({ id }) => {
  const [history, setHistory] = useState([]);

  let baseUrl = server_url + "/user/pay-history/" + id;
  useEffect(() => {
    FetchHistory(baseUrl, setHistory);
  }, [id]);

  console.log(history);

  const sortData = history.sort((a, b) => {
    // Convert createdAt strings to Date objects
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
  
    // Compare the dates
    return  dateB-dateA;
  });


  return (
    <div className="md:w-[500px] w-full px-5 pb-5 ">
      <h2 className=" pb-5 text-[25px] ">Payment History</h2>
      <div className=" flex flex-col gap-4 h-[60vh] pb-7 mb-7 overscroll-y-auto">
        {!sortData.length ? <><h2>History Not found</h2></> : sortData?.map((item, index) => (
          <div
            key={index}
            className=" bg-white flex items-start gap-3 shadow-md py-4 px-5 rounded-lg border"
          >
            <div className={`w-[70px] h-[70px] flex items-center justify-center rounded-md ${item?.type==="pay" ? " bg-green-500" : "bg-yellow-500"}`}>
              {item?.type === "pay" ? (
                <Icon icon="ri:wechat-pay-fill"  className=" text-[45px] text-white"/>
              ) : (
                <Icon
                  icon="octicon:feed-pull-request-open-16"
                  className=" text-[45px] text-white"
                />
              )}
            </div>
            <div className=" w-[80%]">
              <div className=" flex items-center justify-between">
                <h2 className=" font-semibold">{item?.historyTitle}</h2>
                <p className=" text-[12px]">{convertTimestamp3(item?.createdAt)}</p>
              </div>
              {item?.type === "pay" ? (
                <h2 className=" font-medium">
                  {" "}
                  Request Amount : {item?.requestAmount}, Admin Pay Amount :{" "}
                  {item?.payAmount}
                </h2>
              ) : (
                <h2>Request Amount {item?.requestAmount}</h2>
              )}
              <p className=" text-[14px]">{item?.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;
