import { useRouter } from "next/router";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

import Descriptions from '../../Components/Components/ProductsDetails/Descriptions/Descriptions";
import AppAds from '../../Components/Components/Home/AppAds/AppAds";
import AlreadyProductHave from '../../Components/Components/Home/PopularProducts/AlreadyProductHave";
import CreateContext from '../../Components/Components/CreateContex";
import StarRating from '../../Components/Shared/StarRating";
import ProductSection from '../../Components/Components/ProductSection/ProductSection";
import setCartInLocalStorageFromPorductDetails from "../../lib/setCartInLocalStorageFromPorductDetails";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { TiInputChecked } from "react-icons/ti";
import ProductColorPicker from '../../Components/Components/ProductSection/ProductColorPicker";
import ProductSizePicker from '../../Components/Components/ProductSection/ProductSizePicker";
import WhatsAppButton from '../../Components/Shared/WhatsAppButton";
import CustomMetaSetting from '../../Components/Shared/CustomMetaSetting";
import CustomProductDetailsSkeleton from '../../Components/Components/CustomSkeleton/CustomProductDetailsSkeleton";

import { BsBagPlus, BsCart4, BsTelephoneFill } from "react-icons/bs";
import Head from "next/head";
import Image from "next/image";
import { useQuery } from "react-query";
import AuthUser from "../../lib/AuthUser";
import ImageDownloader from '../../Components/Shared/ImageDownloader";
import ProductSection2 from '../../Components/Components/ProductSection/ProductSection2";
import CustomModal from '../../Components/Shared/CustomModal";
import { MdSlowMotionVideo } from "react-icons/md";
/**
 * TODO: have to upload two image
 * 1 - Thumbnail image size 150px * 150px
 * 2 - Upload original image size 900w 600h
 */

const ProductDetails = ({ product }) => {
  const [sizeIndex, setSizeIndex] = useState(0);
  const [inputSize, setInputSize] = useState("");
  const [userProductColor, setUserProductColor] = useState("");
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [number, setNumber] = useState();
  const [isAlreadyAvailable, setIsAlreadyAvailable] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  const {
    addToCartRefresher,
    lastUser,
    setAddToCartRefresher,
    setQueryFromCategory,
    setGetProductId,
    getProductId,
  } = useContext(CreateContext);
  const handleSetLocalStorage = () => {
    setAddToCartRefresher(!addToCartRefresher);
    const localStorageMessage = setCartInLocalStorageFromPorductDetails(
      product,
      inputSize,
      userProductColor
    );
    setIsAlreadyAvailable(false);
    if (localStorageMessage) {
      setIsAlreadyAvailable("Added In Cart");
    }
  };

  // const { data, refetch, isSuccess, isLoading } = useQuery({
  //   queryKey: ["product", id],
  //   queryFn: () =>
  //     fetch(`https://server-homeshopbd-2-kohl.vercel.app/api/v1/product/${id}`).then(
  //       (res) => res.json()
  //     ),
  // });

  // const { data: productCount } = useQuery({
  //   queryKey: ["count", id],
  //   queryFn: () =>
  //     fetch(
  //       `https://server-homeshopbd-2-kohl.vercel.app/api/v1/order/product-order/${id}`
  //     ).then((res) => res.json()),
  // });

  // console.log("order product cont=======", productCount);

  // const product = data?.data;

  useEffect(() => {
    if (product) {
      setInputSize(product?.size[0]);
      setUserProductColor(product?.productColor[0]);
    }
  }, [product]);

  const handleSize = (index, size) => {
    setSizeIndex(index);
    setInputSize(size);
  };
  const { asPath } = useRouter();
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const productUrl = `${origin}${asPath}`;

  const handleBuyNowButtonClick = () => {
    window.gtag("event", "begin_checkout", {
      currency: "BDT",
      value: product?.salePrice,
      items: [
        {
          product: product?._id,
          name: product?.name,
          price: product?.salePrice,
          quantity: 1,
        },
      ],
    });
  };

  function getRandomNumber(min = 15, max = 30) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    setNumber(getRandomNumber());
  }, [product]);

  useEffect(() => {
    if (product && typeof window.gtag === "function") {
      const handleBuyNowButtonClick = () => {
        window.gtag("event", "view_item", {
          currency: "BDT",
          value: product.salePrice,
          items: [
            {
              product: product._id,
              name: product.name,
              price: product.salePrice,
              quantity: 1,
            },
          ],
        });
      };

      handleBuyNowButtonClick();
    }
  }, [product]);

  const handleAddCartButtonClick = () => {
    window.gtag("event", "add_to_cart", {
      currency: "BDT",
      value: product?.salePrice,
      items: [
        {
          item_id: product?._id,
          item_name: product?.name,
          price: product?.salePrice,
          item_brand: product.brand,
          item_category: product.category,
          quantity: 1,
        },
      ],
    });
  };

  const handelCategoryParams = (cat) => {
    const params = new URLSearchParams();
    params.append("category", cat);
    const url = `${params.toString()}`;
    return url;
  };

  const handleSelectProduct = (product) => {
    const isSelected = Boolean(
      getProductId.find((grpStud) => grpStud._id === product._id)
    );
    if (isSelected) {
      // setGetProductId(getProductId.filter((item) => item._id !== product._id))
    } else {
      const items = {
        price: product?.productPrice,
        salePrice: product?.wholesalePrice,
        originalPrice: product?.price,
        discount: 0,
        _id: product?._id,
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
      };

      setGetProductId((pre) => [...pre, items]);
    }
  };

  return (
    <>
      <Head>
        {/* General Meta Tags for SEO */}
        <meta
          name="title"
          content={product?.name || "We Are Best E-commerce in Bangladesh"}
        />
        <meta
          name="description"
          content={
            product?.description
              ? product?.description.replace(/</g, " ").replace(/>/g, " ")
              : "Check out this amazing product!"
          }
        />
        <meta
          name="image"
          content={product?.imageURLs && product?.imageURLs[0]}
        />

        <meta property="og:url" content={productUrl} />
        <meta property="og:type" content="product" />
        <meta
          property="og:title"
          content={product?.name || "We Are Best E-commerce in Bangladesh"}
        />
        <meta
          property="og:description"
          content={
            product?.description
              ? product?.description.replace(/</g, " ").replace(/>/g, " ")
              : "Check out this amazing product!"
          }
        />
        <meta
          property="og:image"
          content={product?.imageURLs && product?.imageURLs[0]}
        />

        <meta
          name="twitter:title"
          content={product?.name || "We Are Best E-commerce in Bangladesh"}
        />
        <meta
          name="twitter:description"
          content={
            product?.description
              ? product?.description.replace(/</g, " ").replace(/>/g, " ")
              : "Check out this amazing product!"
          }
        />
        <meta
          name="twitter:image"
          content={product?.imageURLs && product?.imageURLs[0]}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {!product && <CustomProductDetailsSkeleton />}
      {product && (
        <div className="sm:bg-accent py-1">
          <div className="mid-container">
            <div className=" bg-white rounded-2xl overflow-hidden shadow-none md:shadow-xl mt-5 p-0 sm:p-4">
              {lastUser?.isWholesale === "active" && (
                <div className=" flex items-center justify-between w-full">
                  <ImageDownloader
                    imageUrl={`${product?.imageURLs[activeIndex]}`}
                    fileName={`${product?.name}.png`}
                  />

                  <button
                    onClick={() => setVideoOpen(!videoOpen)}
                    className=" bg-blue-500 text-white flex items-center gap-2 py-1 px-3 text-sm rounded-md"
                  >
                    কিভাবে অডার দিবেন তা জানতে ভিডিও টি দেখুন{" "}
                    <MdSlowMotionVideo />
                  </button>
                </div>
              )}

              <div className="grid grid-cols-12 gap-5 md:gap-16    ">
                <div className="md:col-span-5 col-span-12 rounded-none md:rounded-2xl  md:overflow-hidden ">
                  <Carousel
                    showArrows={false}
                    showStatus={false}
                    showIndicators={true}
                    autoPlay={true}
                    stopOnHover={true}
                    axis="horizontal"
                    preventMovementUntilSwipeScrollTolerance={true}
                    swipeScrollTolerance={50}
                    onChange={(index) => setActiveIndex(index)}
                    className=""
                    emulateTouch={false}
                    showThumbs={true}
                    renderThumbs={() =>
                      product?.imageURLs.map((image, index) => (
                        <Image
                          key={index}
                          src={image?.replace("http://", "https://")}
                          alt="product details thumbs image"
                          width={100}
                          height={100}
                          className="w-10"
                        />
                      ))
                    }
                  >
                    {product?.imageURLs?.map((url, index) => (
                      <div key={index}>
                        <Image
                          src={url?.replace("http://", "https://")}
                          width={1000}
                          height={1000}
                          className="w-full "
                          alt={"product details page image"}
                        />
                      </div>
                    ))}
                  </Carousel>
                </div>
                {product === null ? (
                  <>
                    <CustomProductDetailsSkeleton />
                  </>
                ) : (
                  <>
                    <div className="md:col-span-7 col-span-12 pt-0  md:pt-14 p-2  md:mr-10 mr-0">
                      <Link
                        href={"/shop"}
                        onClick={() =>
                          setQueryFromCategory(
                            handelCategoryParams(product.category)
                          )
                        }
                      >
                        <span className=" text-[#9234D2] hover:text-black duration-150 mb-2">
                          <TiInputChecked className="text-xl  font-bold inline-block" />
                          <span className="text-sm  font-extrabold">
                            {product?.category}
                          </span>
                        </span>
                      </Link>
                      <h1 className=" font-semibold text-xl md:text-3xl font-serif mb-2">
                        {product?.name}
                      </h1>
                      {/* <p className="text-sm">SKU <span className='text-[17px]'>:</span> {product?.sku}</p> */}
                      <div className="flex  items-end gap-2">
                        <StarRating
                          ratingValue={product?.ratingValue}
                          disabled={true}
                        />
                        {product?.quantity > 0 ? (
                          <p className="text-green-600 font-bold mt-1">
                            {" "}
                            In Stock
                          </p>
                        ) : (
                          <p className="text-red-600 font-bold mt-1">
                            Out Of Stock
                          </p>
                        )}
                      </div>

                      {lastUser.role ? (
                        <>
                          {" "}
                          {lastUser?.role === "resaller" &&
                          lastUser?.isWholesale === "active" ? (
                            <div className="my-5">
                              <div className="flex items-center gap-6 mt-1 ">
                                <p className="text-sm text-gray-500 line-through ">
                                  TK {product?.productPrice}.00
                                </p>
                                <p className="uppercase font-extrabold text-orange-600 text-2xl md:text-4xl">
                                  TK {product?.salePrice}.00
                                </p>
                                <p className=" bg-red-600 text-white rounded-2xl btn-sm text-xs btn btn-warning hover:bg-red-600">
                                  {product?.discount}% OFF
                                </p>
                              </div>
                            </div>
                          ) : (
                            // <div className="sm:flex items-start flex-col gap-1 mb-1 md:text-3xl text-[11px] font-medium ">
                            //   <p className=" text-red-500 mt-5 ">
                            //     Join As Dropshipper to See Price
                            //   </p>
                            //   <p
                            //     onClick={() => handleSelectProduct(product)}
                            //     className=" text-[20px] py-5"
                            //   >
                            //     <Link
                            //       href={"/user/wholesale"}
                            //       className=" text-red-500 underline"
                            //     >
                            //       Click here
                            //     </Link>{" "}
                            //     to order Dropshipping
                            //   </p>
                            // </div>

                            <></>
                          )}
                          {lastUser?.role === "resaller" &&
                          lastUser?.isWholesale === "inactive" ? (
                            <div className="sm:flex items-start flex-col gap-1 mb-1 md:text-3xl text-[11px] font-medium ">
                              <p className=" text-red-500 mt-5 ">
                                Join As Dropshipper to See Price
                              </p>
                              <p
                                onClick={() => handleSelectProduct(product)}
                                className=" text-[20px] py-5"
                              >
                                <Link
                                  href={"/user/wholesale"}
                                  className=" text-red-500 underline"
                                >
                                  Click here
                                </Link>{" "}
                                to order Dropshipping
                              </p>
                            </div>
                          ) : (
                            <></>
                          )}
                          {lastUser?.role === "user" ||
                          lastUser?.role === "admin" ? (
                            <div className="my-5">
                              <div className="flex items-center gap-6 mt-1 ">
                                <p className="text-sm text-gray-500 line-through ">
                                  TK {product?.productPrice}.00
                                </p>
                                <p className="uppercase font-extrabold text-orange-600 text-2xl md:text-4xl">
                                  TK {product?.salePrice}.00
                                </p>
                                <p className=" bg-red-600 text-white rounded-2xl btn-sm text-xs btn btn-warning hover:bg-red-600">
                                  {product?.discount}% OFF
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className=""></div>
                          )}
                          {lastUser?.role === "resaller" &&
                          lastUser?.isWholesale === "active" ? (
                            <div className="my-5">
                              <h2 className=" text-green-500 text-xl font-medium">
                                Dropshipping Price : TK{" "}
                                {product?.wholesalePrice}
                              </h2>

                              {product?.wholesalePrice > 0 && (
                                <p
                                  onClick={() => handleSelectProduct(product)}
                                  className=" text-[20px] py-5"
                                >
                                  <Link
                                    href={"/user/wholesale"}
                                    className=" text-red-500 underline"
                                  >
                                    Click here
                                  </Link>{" "}
                                  to order Dropshipping
                                </p>
                              )}
                            </div>
                          ) : (
                            <></>
                          )}
                        </>
                      ) : (
                        <div className="my-5">
                          <div className="flex items-center gap-6 mt-1 ">
                            <p className="text-sm text-gray-500 line-through ">
                              TK {product?.productPrice}.00
                            </p>
                            <p className="uppercase font-extrabold text-orange-600 text-2xl md:text-4xl">
                              TK {product?.salePrice}.00
                            </p>
                            <p className=" bg-red-600 text-white rounded-2xl btn-sm text-xs btn btn-warning hover:bg-red-600">
                              {product?.discount}% OFF
                            </p>
                          </div>
                        </div>
                      )}

                      {/* product size */}

                      <div>
                        <span className=" font-medium text-base bg-blue-500 text-white px-3 py-1 rounded-md">
                          Today Sale This Product : {number}
                        </span>
                      </div>

                      <ProductSizePicker
                        size={product?.size}
                        sizeIndex={sizeIndex}
                        handleSize={handleSize}
                      />
                      {/* product color-------------- */}
                      <ProductColorPicker
                        productColor={product?.productColor}
                        setUserProductColor={setUserProductColor}
                        userProductColor={userProductColor}
                      />

                      {/* <SocialShare /> */}

                      <div className="mt-10 grid grid-cols-2  gap-4 ">
                        {product?.quantity < 1 && (
                          <p className="text-red-600 font-bold mt-1 col-span-2">
                            Out Of Stock
                          </p>
                        )}
                        <Link
                          href={
                            product?.quantity < 1
                              ? "#"
                              : `/checkout/direct-buy/${product._id}`
                          }
                        >
                          <button
                            disabled={product?.quantity < 1}
                            title={
                              product?.quantity < 1 ? "Out of Stock" : "Buy Now"
                            }
                            onClick={handleBuyNowButtonClick}
                            className="btn btn-primary w-full  rounded flex items-center gap-2  text-base-100 "
                          >
                            <BsBagPlus size={22} />
                            <h1>Buy Now</h1>
                          </button>
                        </Link>
                        <button
                          onClick={() => {
                            handleSetLocalStorage();
                            handleAddCartButtonClick();
                          }}
                          className="btn bg-[#ff8b2c] hover:bg-[#D0611E] border-none w-full flex items-center gap-2 rounded  text-base-100 "
                          disabled={product?.quantity < 1}
                          title={
                            product?.quantity < 1
                              ? "Out of Stock"
                              : "Add to Cart"
                          }
                        >
                          <BsCart4 size={22} />
                          <h1>Add To Cart</h1>
                        </button>

                        <div>
                          <WhatsAppButton
                            productUrl={productUrl}
                            productQuantity={product?.quantity}
                            productName={product?.name}
                            productPrice={product?.salePrice}
                          />
                        </div>

                        {/* direct call button */}
                        <a
                          href="tel:+8801647096379"
                          disabled={product?.quantity < 1}
                          title={
                            product?.quantity < 1
                              ? "Out of Stock"
                              : "Direct Call"
                          }
                          className="btn bg-red-600 hover:bg-red-800 border-none w-full  flex items-center gap-1 rounded font-bold  text-base-100 "
                        >
                          <BsTelephoneFill size={22} />
                          <h1>+8801910903717</h1>
                          <h1></h1>
                        </a>
                      </div>

                      <div className=" pt-5 flex items-center justify-end">
                        <a
                          href={"https://wa.me/+8801910903717"}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <button className="flex justify-end items-center  ">
                            <Image
                              src={"/homePageImage/EoQ7V4p8Y8.jpg"}
                              width={500}
                              height={100}
                              alt="dd"
                              className=" h-[40px] w-[400px]"
                            />
                          </button>
                        </a>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className=" bg-white  mb-10 p-1 md:p-5 rounded-xl">
                <div className="">
                  <Descriptions
                    description={product?.description}
                    youtube={product?.youtube}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mid-container" style={{ padding: 0 }}>
            <div className=" my-8">
              <ProductSection2
                query={`&${handelCategoryParams(product?.category)}`}
                heading={"Related Product"}
                viewQuery={`&${handelCategoryParams(product?.category)}`}
                sliceItem={10}
                id={product?._id}
              />
            </div>
          </div>
          <div className="my-10">
            <AppAds />
          </div>
        </div>
      )}

      <>
        {isAlreadyAvailable && (
          <AlreadyProductHave
            setIsAlreadyAvailable={setIsAlreadyAvailable}
            isAlreadyAvailable={isAlreadyAvailable}
          />
        )}
      </>

      <CustomModal modalIsOpen={videoOpen} setIsOpen={setVideoOpen}>
        <div className=" w-[700px] h-[500px]">
          <iframe
            width="100%"
            height="500"
            src="https://www.youtube.com/embed/bmNV_PY9chA"
            title="YouTube video player"
            // frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </CustomModal>
    </>
  );
};

export default ProductDetails;

export async function getServerSideProps({ params }) {
  try {
    const res = await fetch(
      `https://server-homeshopbd-2-kohl.vercel.app/api/v1/product/path/${params.id}`
    );

    // যদি response ঠিক না আসে
    if (!res.ok) {
      return { notFound: true };
    }

    const data = await res.json();

    // যদি data বা product না থাকে
    if (!data || !data.data) {
      return { notFound: true };
    }

    // 🧹 undefined → null করে দাও
    const product = JSON.parse(
      JSON.stringify(data.data, (key, value) =>
        value === undefined ? null : value
      )
    );

    return {
      props: { product },
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return {
      notFound: true,
    };
  }
}
