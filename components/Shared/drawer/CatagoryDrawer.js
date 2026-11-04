import Link from "next/link";
import React, { useContext, useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import Drawer from "react-modern-drawer";
import CreateContext from "../../Components/CreateContex";
import CatagoryMenu from "../CatagoryMenu";
import AuthUser from "../../../lib/AuthUser";

const CatagoryDrawer = ({
  isOpenCatgory,
  toggleDrawerCatagory,
  dir,
  products,
}) => {
  const [selectMenu, setSelectMenu] = useState("menu");
  const { setQueryFromCategory } = useContext(CreateContext);
  const { logout } = AuthUser();
  const { token, user } = useContext(CreateContext);
  const userRole = user?.role;
  let menus = [
    {
      title: "Shop",
      path: "/shop",
    },
    {
      title: "Offer",
      path: "/offer",
    },
    {
      title: "About Us",
      path: "/about",
    },
    {
      title: "Blog",
      path: "/blog",
    },
    // {
    //   title: "FAQ",
    //   path: "/faq",
    // },
  ];

  return (
    <>
      <Drawer
        open={isOpenCatgory}
        onClose={toggleDrawerCatagory}
        direction={dir}
        className="cart-drawer "
        style={{ width: "400px" }}
      >
        <div className="bg-primary h-full">
          <div className=" p-3 md:py-4 md:px-7">
            <div className="flex justify-between">
              <span className="flex items-center text-white gap-2">
                <MdAddShoppingCart size={30} />
                <span className="text-2xl font-bold ">Home Shop BD</span>
              </span>
              <span className=" p-3">
                <button
                  onClick={toggleDrawerCatagory}
                  className="text-red-500 btn btn-sm bg-white btn-circle text-xl font-bold"
                >
                  <span className="">x</span>
                </button>
              </span>
            </div>
          </div>

          <div className="p-3">
            <div className="w-full  grid grid-cols-2  border border-white rounded-md overflow-hidden">
              <button
                onClick={() => setSelectMenu("menu")}
                className={`py-2 font-bold cursor-pointer ${
                  selectMenu === "menu"
                    ? "bg-white text-primary"
                    : "bg-primary text-white"
                }`}
              >
                Menu
              </button>
              <button
                onClick={() => setSelectMenu("cat")}
                className={`py-2 font-bold cursor-pointer ${
                  selectMenu === "cat"
                    ? "bg-white text-primary"
                    : "bg-primary text-white"
                }`}
              >
                Categories
              </button>
            </div>
          </div>

          {selectMenu === "cat" && (
            <CatagoryMenu
              toggleDrawerCatagory={toggleDrawerCatagory}
              toggle={true}
            />
          )}
          {selectMenu === "menu" && (
            <>
              <ul
                className="p-2 overflow-y-auto h-[70vh]"
                id="test-catagory-menus"
              >
                {menus.map((menu, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => {
                        if (menu.path === "/shop") {
                          setQueryFromCategory("");
                        }
                      }}
                    >
                      <Link
                        onClick={toggleDrawerCatagory}
                        href={menu.path}
                        className="flex items-center gap-2 text-white hover:bg-white hover:text-gray-600 py-2 px-3 rounded-md font-bold "
                      >
                        - {menu.title}
                      </Link>
                    </li>
                  );
                })}

                <li>
                  <Link
                    target="_blank"
                    href="https://apk.digitaloperaocean.com/home-shop-bd-online-shopping-app-in-bangladesh/"
                    className="flex items-center gap-2 text-white hover:bg-white hover:text-gray-600 py-2 px-3 rounded-md font-bold "
                  >
                    - Download App
                  </Link>
                </li>

                <li>
                  <Link
                    target="_blank"
                    href="/dropshipping"
                    className="flex items-center gap-2 text-white hover:bg-white hover:text-gray-600 py-2 px-3 rounded-md font-bold "
                  >
                    - Become a Dropshipper
                  </Link>
                </li>

                <li>
                  <Link
                    href="/order-track"
                    className="flex items-center gap-2 text-white hover:bg-white hover:text-gray-600 py-2 px-3 rounded-md font-bold "
                  >
                    - Order Track
                  </Link>
                </li>

                {/* here show admin menu */}
                {token && (
                  <h2 className="text-white font-bold  px-3 mt-3 text-xl">
                    My Dashboard
                  </h2>
                )}

                <li>
                  {token && userRole === "user" && (
                    <Link
                      className="flex items-center gap-2 text-white hover:bg-white hover:text-gray-600 py-2 px-3 rounded-md font-bold "
                      href={"/user/dashboard"}
                    >
                      - Dashboard
                    </Link>
                  )}
                  {userRole === "admin" && (
                    <Link
                      className="flex items-center gap-2 text-white hover:bg-white hover:text-gray-600 py-2 px-3 rounded-md font-bold "
                      href={"/admin/dashboard"}
                    >
                      - Dashboard
                    </Link>
                  )}
                </li>

                {token && userRole === "user" && (
                  <li>
                    <Link
                      className="flex items-center gap-2 text-white hover:bg-white hover:text-gray-600 py-2 px-3 rounded-md font-bold "
                      href={"/user/my-order"}
                    >
                      - My Order
                    </Link>
                  </li>
                )}

                {token && (userRole === "admin" || userRole === "user") ? (
                  <>
                    <li>
                      <span
                        className="flex items-center gap-2 text-white hover:bg-white hover:text-gray-600 py-2 px-3 rounded-md font-bold "
                        onClick={logout}
                      >
                        - Logout
                      </span>
                    </li>
                  </>
                ) : (
                  <></>
                )}
              </ul>
            </>
          )}
        </div>
      </Drawer>
    </>
  );
};

export default CatagoryDrawer;
