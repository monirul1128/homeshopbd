import React, { useEffect, useState } from "react";
import { FaRegPaperPlane } from "react-icons/fa";
import { useMyShopData } from "../../hooks/useMyShopData";

const ApplyWallet = ({
  data,
  applyWallet,
  setWalletAmount,
  setPointAmount,
}) => {
  const [coupon, setCouponCode] = useState();
  const [error, setError] = useState(false);
  const { data: shopData } = useMyShopData();

  const handleApplyCoupon = () => {
    const data = (applyWallet ? applyWallet : null) + Number(coupon);

    setPointAmount(
      data / (shopData?.data?.pointBalance ? shopData?.data?.pointBalance : 50)
    );
    setWalletAmount(data);
    setCouponCode("");
  };

  useEffect(() => {
    if (data?.data?.wallet - applyWallet < coupon) {
      setError(true);
    } else {
      setError(false);
    }
  }, [coupon, data]);

  return (
    <div>
      {data?.data?.wallet > 0 && (
        <div className="my-5">
          <div className="collapse collapse-plus rounded-md">
            <input type="checkbox" className="peer" />
            <div className="collapse-title bg-base-300 text-black-content font-bold peer-checked:bg-base-300 peer-checked:text-black-content uppercase">
              <h2>
                Your total Point :{" "}
                <span className=" text-red-500">
                  {data?.data?.wallet - Number(applyWallet ? applyWallet : 0)}
                </span>
              </h2>
            </div>
            <div className="collapse-content bg-base-300  peer-checked:bg-base-300 ">
              <div className="">
                <div className="form-control">
                  <input
                    type="number"
                    placeholder="Use Cashback Amount"
                    value={coupon}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="input input-bordered outline-none focus:outline-none max-w-[300px]"
                  />
                  {error && (
                    <p className="text-error mt-1">
                      Your use point is more than total point!
                    </p>
                  )}
                </div>
                <div className=" flex items-center gap-2">
                  <span
                    onClick={handleApplyCoupon}
                    disabled={
                      !coupon ||
                      data?.data?.wallet -
                        Number(applyWallet ? applyWallet : 0) <
                        coupon
                    }
                    className="btn btn-sm btn-primary gap-2 mt-3"
                  >
                    Apply Now
                    <FaRegPaperPlane />
                  </span>
                  <span
                    onClick={() => {
                      setWalletAmount(null), setPointAmount(null);
                    }}
                    disabled={!applyWallet}
                    className="btn btn-sm btn-primary gap-2 mt-3"
                  >
                    Reset Amount
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyWallet;
