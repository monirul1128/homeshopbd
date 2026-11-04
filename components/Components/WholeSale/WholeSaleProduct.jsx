import React, { useContext } from "react";

import Drawer from "react-modern-drawer";
import { MdAddShoppingCart } from "react-icons/md";

import "react-modern-drawer/dist/index.css";
import Link from "next/link";
import CreateContext from '../../components/Components/CreateContex';
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { products } from "../../../lib/helper";
import { useState } from "react";
import { MdOutlineUnfoldMore } from "react-icons/md";
import SelectProductItem2 from '../../components/Shared/drawer/SelectProductItem2';
import { toast } from "react-toastify";
import AuthUser from "../../../lib/AuthUser";

const WholeSaleProduct = ({
  isOpen,
  toggleDrawer,
  dir,
  setGetProductId,
  getProductId,
}) => {
  const router = useRouter();
  const [queryFilterPrice, setQueryFilterPrice] = useState("");
  const [visible, setVisible] = useState(15);

  const { userInfo } = AuthUser();

  const handleCheckout = () => {
    // if (products?.items?.length > 0) {
    //   router.push("/checkout");
    //   toggleDrawer();
    // } else if (products?.items?.length < 1) {
    //   router.push("/shop");
    //   setQueryFromCategory("");
    //   toggleDrawer();
    // } else {
    //   toggleDrawer();
    // }
  };

  const { data, isLoading, refetch } = useQuery(
    ["products", queryFilterPrice],
    () => products(`wholesaleStatus=active${queryFilterPrice}`)
  );

  const handleSelectProduct = (product) => {
    const isSelected = Boolean(
      getProductId.find((grpStud) => grpStud._id === product._id)
    );

    if (isSelected) {
      // Remove product if already selected
      setGetProductId(getProductId.filter((item) => item._id !== product._id));
    } else {
      // Check if the limit of 5 products is reached
      if (getProductId.length >= 5) {
        toast.error("You can only add up to 5 products.");
        return;
      }

      // Add product if not selected
      const items = {
        price: product?.productPrice,
        salePrice: product?.wholesalePrice,
        originalPrice: product?.price,
        discount: 0,
        _id: product?._id,
        path: product?.path,
        createdAt: new Date().toString(),
        image: product.imageURLs[0],
        category: product?.category,
        quantity: 1,
        productTitle: product?.name,
        sku: "",
        userSize: product.size[0] || "",
        size: product.size,
        productColor: product.productColor,
        userColor: product.productColor[0] || "",
        itemTotal: product?.wholesalePrice,
        free_delivery: product?.free_delivery,
        advance: product?.advance,
      };

      setGetProductId((pre) => [...pre, items]);
    }
  };

  const handelChange = (e) => {
    const searchValue = e.target.value;
    setQueryFilterPrice(`&search=${searchValue}`);
  };

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 15);
  };

  const filterData =
    userInfo?.role === "resaller"
      ? data?.data?.products?.filter((item) => item?.wholesaleStatus === "active")
      : data?.data?.products;

  return (
    <>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction={dir}
        className="cart-drawer "
        size="100px"
        style={{ width: "800px", maxWidth: "800px" }}
      >
        <div className="bg-primary max-w-[800px] p-3 md:py-4 md:px-7">
          <div className="flex justify-between max-w-[800px]">
            <span className="flex items-center text-white gap-2">
              {/* <MdAddShoppingCart size={22} /> */}
              <span className="text-xl font-bold">Dropshipping Product</span>
            </span>
            <span className=" p-3">
              <button
                onClick={toggleDrawer}
                className="text-white hover:text-red-500"
              >
                <span>x</span> close
              </button>
            </span>
          </div>
        </div>

        <div className=" bg-white py-2 px-2 w-full">
          <input
            type="text"
            onChange={handelChange}
            placeholder="Search Product...."
            className="input input-bordered  block w-full h-10"
            style={{ outline: "none" }}
            name="search"
          />
        </div>
        {/* ------------------------items------------------- */}

        <div className=" overflow-y-scroll h-[80%]">
          {filterData?.slice(0, visible).map((product) => (
            <SelectProductItem2
              key={product?._id}
              product={product}
              handleSelectProduct={handleSelectProduct}
              getProductId={getProductId}
            />
          ))}
          <div className="w-full text-center">
            {filterData?.length > visible && (
              <button
                onClick={showMoreItems}
                className="bg-primary  px-3 py-2 font-bold mt-5 rounded-md mx-auto flex items-center gap-1 hover:bg-opacity-0 duration-150 text-white hover:text-primary border border-primary"
              >
                <MdOutlineUnfoldMore size={22} />
                Load More
              </button>
            )}
          </div>
        </div>

        {/* <div
          onClick={() => handleCheckout()}
          className=" bg-primary py-4 px-3 flex w-[90%] mx-4 justify-between fixed bottom-6 md:bottom-3 items-center cursor-pointer hover:font-bold rounded-md duration-100"
        >
          <h1 className="text-white text-sm block">Proceed To Checkout</h1>
          <span className="btn btn-sm text-primary bg-white hover:bg-secondary font-warning ">
            ৳{products?.cartTotal}
          </span>
        </div> */}
      </Drawer>
    </>
  );
};

export default WholeSaleProduct;
