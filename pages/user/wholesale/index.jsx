import React, { useContext, useState } from "react";
import UserDashLayout from "../../../components/Components/userDashLayout";
import { Icon } from "@iconify/react";
import WholeSaleUserInformation from "../../../components/Components/WholeSale/WholeSaleUserInformation";
import CustomModal from "../../../components/Shared/CustomModal";
import WholeSaleProduct from "../../../components/Components/WholeSale/WholeSaleProduct";
import AuthUser from "../../../lib/AuthUser";
import CreateContext from "../../../components/Components/CreateContex";

const WholeSale = () => {
  const { userInfo } = AuthUser();
  const [selectedUser, setSelectedUser] = useState({});
  const [selectProductModalOpen, setSelectProductModalOpen] = useState(false);
  const { setGetProductId, getProductId } = useContext(CreateContext);
  const [show, setShow] = useState(false);
  const [codAmount, setCodAmount] = useState(0);

  // use for open cart drawer


  const toggleDrawer = () => {
    setShow(!show);
  };
  return (
    <>
      <UserDashLayout>
        <div className="bg-white font-bold my-5  p-7 mx-5  shadow-md rounded-md flex items-center justify-between">
          <h1 className="text-2xl">Dropshipping Order</h1>
          <button
            onClick={() => toggleDrawer()}
            className=" font-medium text-white rounded-md bg-primary p-2 flex items-center gap-1"
          >
            {" "}
            <Icon icon="ooui:add" />
            Select Product
          </button>
        </div>
        <div className="mb-5 w-full">
          {/* ---------------------here will be post order----------------------- */}
          <WholeSaleUserInformation
            getProductId={getProductId}
            setGetProductId={setGetProductId}
            user={userInfo}
            {...{ codAmount, setCodAmount }}
          />
        </div>
      </UserDashLayout>
      <WholeSaleProduct
        isOpen={show}
        toggleDrawer={toggleDrawer}
        dir={"right"}
        setGetProductId={setGetProductId}
        getProductId={getProductId}
      />
    </>
  );
};

export default WholeSale;
