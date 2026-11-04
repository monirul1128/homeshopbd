import Image from "next/image";
import { FaFacebookF } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import { IoLogoYoutube } from "react-icons/io";
import { FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
import AuthUser from "../../lib/AuthUser";
import { useMyShopData } from "../components/hooks/useMyShopData";
import { MdLocationOn, MdOutlineAlternateEmail, MdPhone } from "react-icons/md";
import { IoLogoTiktok } from "react-icons/io5";
const Footers = () => {
  const { userInfo } = AuthUser();

  const { data } = useMyShopData();

  return (
    <>
      <div className=" lg:pb-3 pb-20 lg:pt-5">
        <div className="mid-container">
          <div>
            <footer className="footer px-0  sm:px-4 py-10 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 p-10  text-base-content">
              <div>
                {/* <img src={logo} alt=""/> */}
                <Link href={"/"}>
                  <Image
                    src={data?.data?.logo}
                    alt="logo"
                    width={200}
                    height={100}
                  ></Image>
                </Link>

                <p className="capitalize">
                  {data?.data?.shopName}
                  <br />
                  {data?.data?.aboutShop}
                </p>
              </div>
              <div>
                <span className="font-bold text-xl sm:text-2xl">
                  Contact Us
                </span>
                <p className=" flex items-center gap-1">
                  <MdOutlineAlternateEmail size={20} className="text-primary" />
                  {data?.data?.email}
                </p>
                <p className=" flex items-center gap-1">
                  <MdPhone size={20} className="text-primary" />
                  {data?.data?.phone}
                </p>
                <p className=" flex items-center gap-1">
                  <MdLocationOn size={20} className="text-primary" />
                  {data?.data?.address}
                </p>
              </div>
              <div>
                <span className="font-bold text-xl sm:text-2xl">
                  Quick Links
                </span>
                <Link href={"/warranty-policy"} className="link link-hover">
                  Warranty Policy
                </Link>
                <Link href={"/return-policy"} className="link link-hover">
                  Return & Refund Policy
                </Link>
                <Link href={"/privacy-policy"} className="link link-hover">
                  Privacy Policy
                </Link>
                <Link href={"/terms"} className="link link-hover">
                  Terms and Conditions
                </Link>
                <Link href={"/about"} className="link link-hover">
                  About us
                </Link>
              </div>
              <div>
                <span className="font-bold text-xl sm:text-2xl">
                  Customer Service
                </span>

                <Link href={"/contact"}>
                  <p className="link link-hover">Support Center</p>
                </Link>
                {/* <Link href={"/faq"}>
                  <p className="link link-hover">Frequently ask Question</p>
                </Link> */}
                <Link href={"/privacy-policy"}>
                  <p className="link link-hover">Privacy & Policy</p>
                </Link>
                <Link href={"/terms"}>
                  <p className="link link-hover">Terms & Conditions</p>
                </Link>
              </div>
            </footer>
          </div>
          <div>
            <div className="bg-[#9346821c] px-7 py-8 rounded-xl mt-5">
              <div className="md:flex justify-between  items-center">
                <div className="md:w-[33%]">
                  <h1 className="font-bold text-center">Follow Us</h1>
                  <div className="flex justify-center items-center gap-2 mt-2 text-xl">
                    <div className="social-icon">
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
                    <div className="social-icon">
                      <a href={data?.data?.twitter || "/"} target={"_blank"}>
                        <IoLogoTiktok />
                      </a>
                    </div>
                    <div className="social-icon">
                      <a href={data?.data?.Youtube || "/"} target={"_blank"}>
                        <IoLogoYoutube />
                      </a>
                    </div>
                    <div className="social-icon">
                      <a href={data?.data?.linkedin || "/"} target={"_blank"}>
                        <FaLinkedinIn />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="text-center md:w-[33%] mb-7 md:mb-0 hidden md:block">
                  <h1 className="font-bold">Payment</h1>
                  {/* <h1 className="text-xl font-semibold text-warning">
                    {data?.data?.phone}
                  </h1> */}
                  <div className="flex justify-center">
                    <Image
                      src={"/homePageImage/Payment-options.png"}
                      alt="payment"
                      width={300}
                      height={100}
                    ></Image>
                  </div>
                </div>

                <div className="text-end md:w-[32%] flex items-center justify-center">
                  <div className="text-center w-full mb-3 md:mb-0 hidden md:block">
                    <h1 className="font-bold">Download App</h1>
                    <div className=" flex w-full justify-center mt-3 items-center gap-3">
                      <a
                        href="https://apk.digitaloperaocean.com/home-shop-bd-online-shopping-app-in-bangladesh/"
                        className="text-sm text-center block"
                        target={"_blank"}
                      >
                        <Image 
                          src={"/homePageImage/app1.png"}
                          width={300}
                          height={100}
                          alt="app"
                          className=" w-[100px] h-[30px]"
                        />
                      </a>
                      <a
                        href="https://apk.digitaloperaocean.com/home-shop-bd-online-shopping-app-in-bangladesh/"
                        className="text-sm text-center block"
                        target={"_blank"}
                      >
                        <Image 
                          src={"/homePageImage/app2.png"}
                          width={300}
                          height={100}
                          alt="app"
                          className=" w-[100px] h-[30px]"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="https://www.softriple.com/"
              className="text-sm text-center mt-5 block"
              target={"_blank"}
            >
              Design & Developed By{" "}
              <span className="font-bold text-[#FF9800] cursor-pointer">
                SofTriple
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footers;
