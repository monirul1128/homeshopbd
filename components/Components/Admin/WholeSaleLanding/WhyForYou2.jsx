import React, { useState } from "react";
import { server_url_v3 } from "../../../../lib/config";
import { updateMethodHook } from "../../../../lib/usePostHooks";
import swal from "sweetalert";
import { Icon } from "@iconify/react";

const WhyForYou2 = ({ allPages, refetch }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const updateFunction = () => {
    const url = `${server_url_v3}/landing-page/wholesale/${allPages?._id}`;

    if (title === "") {
      swal("error", "Please Enter Title", "error");
      console.log("error");
    } else {
      const data = {
        type: "why_for_you",
        data: {
          title: title,
        },
      };
      updateMethodHook(url, data, fetchFun, setLoading);
    }
  };

  const deleteFunction = (id) => {
    console.log("is====", id);

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this item.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `${server_url_v3}/landing-page/wholesale/delete/${allPages?._id}`;
        const data = {
          type: "why_for_you",
          bodyId: id,
        };
        updateMethodHook(url, data, fetchFun, setLoading);
      } else {
        swal("item is safe!");
      }
    });
  };

  const fetchFun = () => {
    refetch();
    setTitle("");
  };

  return (
    <div>
      <div className=" flex items-center gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
          className="w-full rounded input py-3 px-5 input-bordered bg-transparent focus:border-primary duration-300 ease-in-out  outline-none"
        />
        <button
          onClick={() => updateFunction()}
          className="py-3 px-5 bg-primary w-[150px] font-medium text-base rounded-md text-white"
        >
          {loading ? "Loading..." : "Add New"}
        </button>
      </div>
      <div className=" pt-5">
        {allPages?.why_for_you?.map((item, index) => (
          <div key={index} className=" flex items-center gap-2">
            <Icon
              className=" text-[20px] text-green-500"
              icon="game-icons:check-mark"
            />
            <h2 className=" text-[18px]">{item?.title}</h2>
            <button
              onClick={() => deleteFunction(index)}
              className=" text-[20px] text-red-400 hover:text-red-700 duration-300"
            >
              <Icon icon="mdi:delete" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyForYou2;
