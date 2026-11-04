import React, { useState } from "react";

const SubmitModal = ({ data,loading, handleUpdateUser }) => {
  const [account, setAccount] = useState();

  console.log("hello",data?.account);

  const submit = ()=>{
    const final = data?.account?.find((item)=>item?.name===account)

    console.log(final);

    handleUpdateUser(final)
  }


  return (
    <div className="md:w-[500px] w-full px-5 pb-5 ">
      <h2 className=" text-[20px] font-semibold">Select Payment Account</h2>
      <div>
        <div>
          <div className="col-span-6 mt-3 sm:col-span-3">
            <select
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              className="select select-bordered shadow-sm w-full mt-1"
            >
              <option disabled selected>
                Select Account
              </option>
              {data?.account?.map((item, index) => (
                <option value={item?.name}>
                  {item?.name} - {item?.number}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => submit(true)}
            className=" py-2 px-5 mt-7 w-full bg-green-700 hover:bg-green-900 duration-200 rounded-lg text-white"
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitModal;
