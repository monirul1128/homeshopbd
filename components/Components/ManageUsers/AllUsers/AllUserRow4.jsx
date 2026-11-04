import React from "react";

const AllUserRow4 = ({ user, select, setSelect }) => {
  const handleFilterByCategory = (event) => {
    const category = event.target.value;

    const selected = select.find((item) => item?.user === user?._id);

    if (selected) {
      setSelect((prev) => prev.filter((u) => u.user !== category));
    } else {
      setSelect((prev) => [...prev, { user: category }]);
    }
  };

  const selected = select.find((item) => item.user === user?._id);

  return (
    <tr key={user?._id} className="whitespace-nowrap ">
      <td className="px-6 py-4">
        <div className="text-sm text-light-dark">
          <label className="label justify-start gap-2 cursor-pointer hover:text-primary">
            <input
              onChange={handleFilterByCategory}
              type="checkbox"
              checked={selected}
              value={user?._id}
              className="checkbox border-2 border-[#777] checkbox-sm rounded-xs checkbox-primary"
            />
          </label>
        </div>
      </td>

      <td className="px-6 py-4 text-sm text-light-dark">
        {user?.imageURL ? (
          <img
            src={user.imageURL}
            alt={"user profile"}
            className="w-8 h-8 rounded-md object-cover"
          />
        ) : (
          <p className="text-[#cc3300] text-xs font-semibold">Not Found</p>
        )}
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-light-dark">{user?.fullName}</div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm font-semibold text-light-dark ">
          {user?.email ? (
            user?.email.length >= 18 ? (
              user?.email.slice(0, 18) + "..."
            ) : (
              user?.email
            )
          ) : (
            <p className="text-[#cc3300] text-xs">Not Found</p>
          )}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-light-dark">{user?.phone}</div>
      </td>
      <td className="px-6 py-4 ">{user?.status}</td>
      <td className="px-6 py-4 ">
        <div className=" flex flex-col">
          <span title="সেলার কে পে করতে হবে" className=" ">
            Payable : {user?.activeBaleens}
          </span>
          <span title="সেলারের অর্ডার পেন্ডিং ব্যালেন্স" className=" ">
            Pending : {user?.dueBaleens}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 ">
        <div
          className={`${
            user?.isWholesale === "active"
              ? " bg-green-200  rounded-full px-3 py-1"
              : " bg-gray-200 rounded-full px-3 py-1"
          } flex items-center gap-1 justify-center`}
        >
          <div
            className={`${
              user?.isWholesale === "active"
                ? " bg-green-500  rounded-full"
                : " bg-gray-400 rounded-full"
            } w-[10px] h-[10px] mt-1`}
          ></div>
          {user?.isWholesale}
        </div>
      </td>
    </tr>
  );
};

export default AllUserRow4;
