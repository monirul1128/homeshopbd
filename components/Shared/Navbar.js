import React, { useContext, useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsBagCheck, BsTwitter } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import CartDrawer from "./drawer/CartDrawer";
import CreateContext from '../components/Components/CreateContex';
import WishlilstDrawer from "./drawer/WishlilstDrawer";
import CatagoryMenu from "./CatagoryMenu";
import { useRouter } from "next/router";
import { reactLocalStorage } from "reactjs-localstorage";
import AuthUser from "../../lib/AuthUser";
import { useMyShopData, useUserData } from "../components/hooks/useMyShopData";
import { SlUser } from "react-icons/sl";
import NavbarSearch from '../components/Components/NavbarSerach/NavbarSearch';
import userImage from "../assets/image/user.jpg";
import { Icon } from "@iconify/react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import NewNavbarSearch from '../components/Components/NavbarSerach/NewNavbarSearch';
import LogoLoader from "./LogoLoader";
import CryptoJS from "crypto-js";
import { IoLogoTiktok } from "react-icons/io5";

const secretKey = "your-secret-key";

const Navbar = () => {
  const router = useRouter();
  const { logout, userInfo } = AuthUser();

  const { data, isLoading } = useMyShopData();

  const {
    addToCartRefresher,
    isOpen,
    setIsOpen,
    localStorageCartItems,
    setlocalStorageCartItems,
    localStorageWishlistItems,
    setlocalStorageWishlistItems,
    wishlistRefresher,
    isOpenWishlist,
    setIsOpenWishlist,
    user,
    token,
    setUser,
    setToken,
    setQueryFromCategory,
    setLastUser,
  } = useContext(CreateContext);

  const userRole = user?.role;
  // const { isLoading, data: shopData, error } = useMyShopData();
  const { user: userData } = useUserData();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user_info"));
    const token = localStorage.getItem("access");
    setUser(user);
    setToken(token);
  }, [router, setUser, setToken]);

  useEffect(() => {
    if (userData) {
      setLastUser(userData?.data);
    }
  }, [userData]);

  const { pathname } = useRouter();

  // const [isOpen, setIsOpen] = React.useState(false);
  // use for open cart drawer
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  // ---------use for open wishlist drawer--------------
  const toggleDrawerWishlist = () => {
    setIsOpenWishlist(!isOpenWishlist);
  };

  const decryptData = (encryptedData) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      console.error("Decryption error:", error);
      return null;
    }
  };
  
  useEffect(() => {
    const encryptedCarts = reactLocalStorage.get("shopping-cart");
    const cart = encryptedCarts ? decryptData(encryptedCarts) : null;
    setlocalStorageCartItems(cart);
  
    const encryptedWishlists = reactLocalStorage.get("wishlist");
    setlocalStorageWishlistItems(encryptedWishlists);
  }, [
    setlocalStorageCartItems,
    setlocalStorageWishlistItems,
    wishlistRefresher,
    addToCartRefresher,
  ]);
  
  const handleLogOut = () => {
    // reactLocalStorage.clear();
    // remove user from local storage to log user out
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  const handleAdminDashboard = async () => {
    await router.push("/admin/dashboard");
  };
  const handleUserDashboard = async () => {
    await router.push("/user/dashboard");
  };

  return (
    <>
      {/* --------------------main navbar------------------------ */}
      <div className="sticky top-0 z-[15]">
        <div className="bg-white border-b border-gray-200 flex items-center">
          <div className="navbar mid-container mx-auto">
            <div className="navbar-start hidden lg:block w-[25%]">
              {/* {isLoading ? (
                <>
                  <div className="">
                    <LogoLoader />
                  </div>
                </>
              ) : ( */}
              <>
                <Link href={"/"} className="">
                  <Image
                    src={"/logo.png"}
                    alt="logo"
                    height={40}
                    width={150}
                    className="w-[100px]  contain py-2 "
                  />
                </Link>
              </>
              {/* )} */}
            </div>
            {/* ------serachbar center-------- */}
            {/* <NavbarSearch /> */}
            <NewNavbarSearch />
            <div className="navbar-end text-end w-[40%]  lg:block hidden">
              <div className="flex justify-end gap-7">
                {/* --------------wishilist--------------------------- */}
                <div className="flex items-center gap-7">
                  <div className="">
                    <label
                      onClick={toggleDrawerWishlist}
                      tabIndex={0}
                      className="cursor-pointer"
                    >
                      <div className=" flex items-center gap-1 relative">
                        <AiOutlineHeart className="font-bold" size={24} />
                        <span className="text-[10px] ">Wishilist</span>
                        <span className="badge badge-sm absolute top-[-9px] right-6 bg-primary border-none text-white">
                          {localStorageWishlistItems?.totalItems
                            ? localStorageWishlistItems.totalItems
                            : 0}
                        </span>
                      </div>
                    </label>
                  </div>
                  {/* -------------------------cart box----------------------- */}
                  <div className="">
                    <label
                      tabIndex={0}
                      className="cursor-pointer"
                      onClick={toggleDrawer}
                    >
                      <div className="flex items-center gap-1 relative">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 "
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        <span className="text-[10px] ">Cart</span>
                        <span className="badge badge-sm bg-primary absolute top-[-9px] right-3 border-none text-white">
                          {localStorageCartItems?.totalItems
                            ? localStorageCartItems.totalItems
                            : 0}
                        </span>
                      </div>
                    </label>
                  </div>
                  {!token && (
                    <div className="flex items-center justify-center ">
                      <label tabIndex={0} className="cursor-pointer">
                        <div className="flex items-center gap-2 ">
                          <Icon
                            className="text-2xl text-black"
                            icon="ant-design:user-outlined"
                          />
                          <div className="text-white text-xs flex flex-col items-start">
                            <Link
                              className="text-black duration-150"
                              href={"/auth/login"}
                            >
                              Login
                            </Link>
                            <Link
                              className="text-black duration-150"
                              href={"/auth/register"}
                            >
                              Register
                            </Link>
                          </div>
                        </div>
                      </label>
                    </div>
                  )}
                </div>
                {/* nav drop */}

                {token && (
                  <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="">
                      <div className="w-10 rounded-full flex items-center gap-1 cursor-pointer">
                        <Image
                          src={user?.imageURL || userImage}
                          className="rounded-full"
                          height={100}
                          width={100}
                          alt="profile"
                        ></Image>
                      </div>
                    </label>

                    <ul
                      tabIndex={0}
                      className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        {token && userRole === "user" && (
                          <Link
                            href={"/user/dashboard"}
                            className="justify-between"
                          >
                            Dashboard
                          </Link>
                        )}

                        {token && userRole === "resaller" && (
                          <Link
                            href={"/user/dashboard"}
                            className="justify-between"
                          >
                            Dashboard
                          </Link>
                        )}

                        {token && userRole === "admin" && (
                          <Link
                            href={"/admin/dashboard"}
                            className="justify-between"
                          >
                            Dashboard
                          </Link>
                        )}
                      </li>

                      {token && userRole === "user" && (
                        <li>
                          <Link
                            href={"/user/my-order"}
                            className="justify-between"
                          >
                            My Order
                          </Link>
                        </li>
                      )}

                      {token &&
                      (userRole === "admin" ||
                        userRole === "user" ||
                        userRole === "resaller") ? (
                        <>
                          <li>
                            <span
                              onClick={() => {
                                logout(), setLastUser({});
                              }}
                            >
                              Logout
                            </span>
                          </li>
                        </>
                      ) : (
                        <></>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* -------------------------3rd menu--------------- */}
        <div className="lg:block hidden border-b shadow-sm z-50 bg-white py-2.5">
          {/* ------second bg color write in global.css */}
          <div className="mid-container mx-auto">
            <div>
              {/* ----------catgoriy dropdown---- */}

              <div className="navbar px-0 py-0 min-h-0 z-50 flex items-center justify-between">
                <div className="flex-none">
                  <ul className="menu menu-horizontal p-0 w-50 text-gray-600 ">
                    {pathname !== "/" && (
                      <li
                        className="bg-primary text-white rounded"
                        tabIndex={0}
                      >
                        <a className="w-[200px] shadow-sm py-2 ">
                          <Icon icon="tabler:category" />
                          Browse Categories
                          <svg
                            className="fill-current ml-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                          >
                            <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                          </svg>
                        </a>
                        <CatagoryMenu />
                      </li>
                    )}
                    <li>
                      <Link
                        onClick={() => setQueryFromCategory("")}
                        className="py-2 hover:text-primary"
                        href="/shop"
                      >
                        Shop
                      </Link>
                    </li>
                    <li>
                      <Link href="/offer" className="py-2 hover:text-primary">
                        Offer
                      </Link>
                    </li>
                    <li>
                      <Link href="/about" className="py-2 hover:text-primary">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog" className="py-2 hover:text-primary">
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link
                        target="_blank"
                        href="/dropshipping"
                        className="py-2 hover:text-primary"
                      >
                        Become a Dropshipper
                      </Link>
                    </li>
                    <li>
                      <Link
                        target="_blank"
                        href="https://apk.digitaloperaocean.com/home-shop-bd-online-shopping-app-in-bangladesh/"
                        className="py-2 hover:text-primary"
                      >
                        Download App
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/order-track"
                        className="py-2 hover:text-primary"
                      >
                        Order Track
                      </Link>
                    </li>

                    {userData?.data && (
                      <li>
                        <span
                          href="/order-track"
                          className="py-2 bg-gray-200 rounded-lg  hover:text-primary"
                        >
                          My Point :{" "}
                          {userData?.data?.wallet ? userData?.data?.wallet : 0}
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="flex justify-end items-center gap-6 text-lg">
                  <div className="text-gray-400 hover:text-primary">
                    <a
                      href={
                        data?.data?.facebookPage ||
                        data?.data?.facebookGroup ||
                        "/"
                      }
                      target={"_blank"}
                    >
                      <FaFacebookF />
                    </a>
                  </div>
                  <div className="text-gray-400 hover:text-primary">
                    <a href={data?.data?.twitter || "/"} target={"_blank"}>
                      <IoLogoTiktok />
                    </a>
                  </div>
                  <div className="text-gray-400 hover:text-primary">
                    <a href={data?.data?.Youtube || "/"} target={"_blank"}>
                      <IoLogoYoutube />
                    </a>
                  </div>
                  <div className="text-gray-400 hover:text-primary">
                    <a href={data?.data?.linkedin || "/"} target={"_blank"}>
                      <FaLinkedinIn />
                    </a>
                  </div>
                </div>
              </div>
              {/* -----------end 3rd emnu dropdown */}
            </div>
          </div>
        </div>
      </div>
      <CartDrawer
        isOpen={isOpen}
        toggleDrawer={toggleDrawer}
        dir={"right"}
        products={localStorageCartItems}
      />
      <WishlilstDrawer
        isOpenWishlist={isOpenWishlist}
        toggleDrawerWishlist={toggleDrawerWishlist}
        dir={"right"}
        products={localStorageWishlistItems}
      />

      {/* shopping bag for dekstop */}

      {localStorageCartItems?.totalItems > 0 && (
        <div
          className="toast toast-end toast-middle z-10 cursor-pointer hidden md:block"
          onClick={toggleDrawer}
        >
          <div className="alert p-0 bg-primary">
            <div className="flex flex-col text-xs">
              <div className="text-white font-bold flex flex-col items-center px-5 bg-slate-300  rounded-t-md py-3">
                <BsBagCheck size={25} className="text-primary mb-1" />
                <span className="text-slate-600 text-sm">
                  {localStorageCartItems?.totalItems} Items
                </span>
              </div>
              <p className="text-white font-bold  text-sm pb-2">
                ${localStorageCartItems?.cartTotal}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* shopping bag for mobile */}
      {localStorageCartItems?.totalItems > 0 && (
        <div
          className="toast toast-end toast-middle z-10 mr-[-20px] cursor-pointer block md:hidden "
          onClick={toggleDrawer}
        >
          <div className="alert p-0 bg-primary">
            <div className="flex flex-col text-xs">
              <div className="text-white font-bold flex flex-col items-center px-3 bg-slate-300  rounded-md py-3">
                <BsBagCheck size={22} className="text-primary mb-1" />
                <span className="text-slate-600 text-sm">
                  {localStorageCartItems?.totalItems} Items
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

// cart drawer
