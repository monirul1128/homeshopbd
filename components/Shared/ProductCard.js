import Image from "next/image";
import { useContext, useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import CreateContext from '../components/CreateContex";
import setCartInLocalStorage from "../../lib/setCartInLocalStorage";
import AlreadyProductHave from '../components/Home/PopularProducts/AlreadyProductHave";
import { AiOutlineHeart } from "react-icons/ai";
import setWishlistInLocalStorage from "../../lib/setWishlistInLocalStorage";
import Link from "next/link";
import { useRouter } from "next/router";
import useFacebookPixel from "../hooks/useFacebookPixel";
import { Icon } from "@iconify/react";

const ProductCard = ({ product }) => {
  // use for toast
  const [isAlreadyAvailable, setIsAlreadyAvailable] = useState(false);

  const handleBuyNowButtonClick = () => {
    navigate.push(`/checkout/direct-buy/${product?._id}`);
    window.gtag("event", "begin_checkout", {
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

  const navigate = useRouter();

  // for facebook pexel setup-----------------------
  const { trackEvent } = useFacebookPixel();
  const handleWishListButtonClick = (productName) => {
    trackEvent("ButtonClick", { buttonName: `Wishlist (${productName})` });

    window.gtag("event", "add_to_wishlist", {
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

  const handleAddCartButtonClick = (productName) => {
    trackEvent("ButtonClick", { buttonName: `Add to cart (${productName})` });
  };

  const {
    addToCartRefresher,
    setAddToCartRefresher,
    setWishlistRefresher,
    wishlistRefresher,
    setBuyNowProduct,
    setGetProductId,
    getProductId,
    lastUser,
  } = useContext(CreateContext);

  const handleSetLocalStorage = () => {
    setAddToCartRefresher(!addToCartRefresher);
    const localStorageMessage = setCartInLocalStorage(product);

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

    setIsAlreadyAvailable(false);

    if (localStorageMessage) {
      setIsAlreadyAvailable("Already Added In Cart");
    }
  };

  const handleSetLocalStorageWishlist = () => {
    setWishlistRefresher(!wishlistRefresher);
    const localStorageMessageWishlist = setWishlistInLocalStorage(product);

    setIsAlreadyAvailable(false);

    if (localStorageMessageWishlist) {
      setIsAlreadyAvailable("Already Added In Wishlist");
    }
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
      };

      setGetProductId((pre) => [...pre, items]);
    }
  };

  return (
    <div className="bg-white rounded-md  box-border  shadow-lg duration-100  overflow-hidden">
      <div className="mb-auto overflow-hidden relative">
        <Link
          href={`/product/${product?.path}`}
          className="w-full h-[200px] overflow-hidden relative cursor-pointer  "
        >
          <img
            src={product?.imageURLs[0]?.replace("http://", "https://")}
            alt="product image"
            width={300}
            height={200}
            className="rounded-t-md object-cover h-[200px] hover:scale-110 duration-150 overflow-hidden"
          />
        </Link>

        <label
          onClick={() => {
            handleSetLocalStorageWishlist();
            handleWishListButtonClick(product?.name?.slice(0, 50));
          }}
          disabled={product?.quantity < 1}
          tabIndex={0}
          className="btn btn-sm btn-ghost btn-circle absolute top-0 right-0 bg-[#00000033]"
        >
          <AiOutlineHeart
            className="text-secondary hover:text-primary"
            size={22}
          />
        </label>

        <span className=" absolute bottom-0 right-0">
          <div className="text-xs  px-1 rounded-sm cursor-pointer bg-red-600 bg-opacity-80  text-white   ">
            <span className="">{product.discount}% off</span>
          </div>
        </span>
      </div>

      {lastUser?.role ? (
        <div className="p-4 flex flex-col  justify-between ">
          {lastUser?.role === "resaller" &&
          lastUser?.isWholesale === "active" &&
          product?.wholesaleStatus === "active" ? (
            <div className="sm:flex items-center gap-1 mb-1 md:text-lg text-[11px]  sm:font-bold ">
              <p className=" text-primary ">BDT {product?.salePrice}</p>
              <s className=" text-gray-400 ">BDT {product?.productPrice}</s>
            </div>
          ) : (
            <div className="sm:flex items-center gap-1 mb-1 md:text-lg text-[11px]  sm:font-bold "></div>
          )}

          {lastUser?.role === "user" || lastUser?.role === "admin" ? (
            <div className="sm:flex items-center gap-1 mb-1 md:text-lg text-[11px]  sm:font-bold ">
              <p className=" text-primary ">BDT {product?.salePrice}</p>
              <s className=" text-gray-400 ">BDT {product?.productPrice}</s>
            </div>
          ) : (
            <div className="sm:flex items-center gap-1 mb-1 md:text-lg text-[11px]  sm:font-bold "></div>
          )}

          <div>
            <h1
              className="text-sm h-[65px] md:h-[50px] font-semibold hover:text-primary cursor-pointer duration-150"
              onClick={() => navigate.push(`/product/${product?.path}`)}
            >
              {product?.name?.length > 30
                ? product?.name.slice(0, 29) + "..."
                : product?.name}
            </h1>
          </div>

          {lastUser?.role === "resaller" &&
          lastUser?.isWholesale === "active" ? (
            <div className="my-0">
              <h2 className=" text-green-500 text-sm font-medium">
                Dropshipping Price : TK {product?.wholesalePrice}
              </h2>
            </div>
          ) : (
            <></>
          )}

          {lastUser?.role === "resaller" &&
          lastUser?.isWholesale === "active" ? (
            <div className="md:flex flex-wrap items-center justify-between w-full mt-2 mb-2">
              <div className="w-full md:w-[48%]">
                <button
                  disabled={product?.quantity < 1}
                  onClick={() => {
                    handleSetLocalStorage();
                    handleAddCartButtonClick(product?.name?.slice(0, 50));
                  }}
                  // onClick={handleSetLocalStorage}
                  className=" text-xs justify-center p-1 rounded cursor-pointer bg-white hover:bg-primary duration-150  text-primary hover:text-white   border-2 border-primary hover:scale-110  flex items-center gap-1 w-full"
                >
                  <Icon icon="bi:cart-plus-fill" />
                  Add To Cart
                </button>
              </div>
              <div className="w-full mt-3 md:mt-0 md:w-[48%]">
                <Link
                  href={`/checkout/direct-buy/${product?._id}`}
                  tabIndex={0}
                  className="w-full"
                >
                  <div
                    onClick={() =>
                      handleBuyNowButtonClick(product?.name?.slice(0, 50))
                    }
                    className="flex items-center gap-1 text-xs  p-1 rounded cursor-pointer justify-center bg-primary duration-150 text-white     border-2 border-primary hover:scale-110"
                  >
                    <span className="flex items-center gap-1 ">
                      <Icon icon="solar:money-bag-bold" />
                      Order Now
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          ) : (
            <></>
          )}

          {lastUser?.role === "resaller" &&
          lastUser?.isWholesale === "inactive" ? (
            <div className="sm:flex items-center flex-col gap-1 mb-1 md:text-lg text-[11px] font-medium ">
              <p className=" text-sm text-gray-600 ">
                Start Dropshipping Today – Check Out Our Prices!
              </p>
              <button
                onClick={() => handleSelectProduct(product)}
                className=" text-[20px] text-start text-sm"
              >
                <Link
                  href={"/user/wholesale"}
                  className=" text-red-500 underline"
                >
                  Click here
                </Link>{" "}
                to order Dropshipping
              </button>
            </div>
          ) : (
            <></>
          )}

          {lastUser?.role === "user" || lastUser?.role === "admin" ? (
            <div className="md:flex flex-wrap items-center justify-between w-full mt-2 mb-2">
              <div className="w-full md:w-[48%]">
                <button
                  disabled={product?.quantity < 1}
                  onClick={() => {
                    handleSetLocalStorage();
                    handleAddCartButtonClick(product?.name?.slice(0, 50));
                  }}
                  // onClick={handleSetLocalStorage}
                  className=" text-xs justify-center p-1 rounded cursor-pointer bg-white hover:bg-primary duration-150  text-primary hover:text-white   border-2 border-primary hover:scale-110  flex items-center gap-1 w-full"
                >
                  <Icon icon="bi:cart-plus-fill" />
                  Add To Cart
                </button>
              </div>
              <div className="w-full mt-3 md:mt-0 md:w-[48%]">
                <Link
                  href={`/checkout/direct-buy/${product?._id}`}
                  tabIndex={0}
                  className="w-full"
                >
                  <div
                    onClick={() =>
                      handleBuyNowButtonClick(product?.name?.slice(0, 50))
                    }
                    className="flex items-center gap-1 text-xs  p-1 rounded cursor-pointer justify-center bg-primary duration-150 text-white     border-2 border-primary hover:scale-110"
                  >
                    <span className="flex items-center gap-1 ">
                      <Icon icon="solar:money-bag-bold" />
                      Order Now
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          ) : (
            <div className="sm:flex items-center gap-1 mb-1 md:text-lg text-[11px]  sm:font-bold "></div>
          )}

          {/* {lastUser?.isWholesale === "active" &&
        product?.wholesaleStatus === "active" ? (
          <button
            onClick={() => handleSelectProduct(product)}
            className=" text-[20px] text-start text-sm"
          >
            <Link href={"/user/wholesale"} className=" text-red-500 underline">
              Click here
            </Link>{" "}
            to order Dropshipping
          </button>
        ) : (
          <div className="flex items-center mt-auto ">
            {product?.quantity < 1 ? (
              <span className="text-xs text-red-600 font-extrabold">
                Out Of Stock
              </span>
            ) : (
              <div className="md:flex flex-wrap items-center justify-between w-full mt-2 mb-2">
                <div className="w-full md:w-[48%]">
                  <button
                    disabled={product?.quantity < 1}
                    onClick={() => {
                      handleSetLocalStorage();
                      handleAddCartButtonClick(product?.name?.slice(0, 50));
                    }}
                    // onClick={handleSetLocalStorage}
                    className=" text-xs justify-center p-1 rounded cursor-pointer bg-white hover:bg-primary duration-150  text-primary hover:text-white   border-2 border-primary hover:scale-110  flex items-center gap-1 w-full"
                  >
                    <Icon icon="bi:cart-plus-fill" />
                    Add To Cart
                  </button>
                </div>
                <div className="w-full mt-3 md:mt-0 md:w-[48%]">
                  <Link
                    href={`/checkout/direct-buy/${product?._id}`}
                    tabIndex={0}
                    className="w-full"
                  >
                    <div
                      onClick={() =>
                        handleBuyNowButtonClick(product?.name?.slice(0, 50))
                      }
                      className="flex items-center gap-1 text-xs  p-1 rounded cursor-pointer justify-center bg-primary duration-150 text-white     border-2 border-primary hover:scale-110"
                    >
                      <span className="flex items-center gap-1 ">
                        <Icon icon="solar:money-bag-bold" />
                        Order Now
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )} */}
        </div>
      ) : (
        <div className="p-4 flex flex-col  justify-between ">
          <div className="sm:flex items-center gap-1 mb-1 md:text-lg text-[11px]  sm:font-bold ">
            <p className=" text-primary ">BDT {product?.salePrice}</p>
            <s className=" text-gray-400 ">BDT {product?.productPrice}</s>
          </div>
          <div>
            <h1
              className="text-sm h-[65px] md:h-[50px] font-semibold hover:text-primary cursor-pointer duration-150"
              onClick={() => navigate.push(`/product/${product?.path}`)}
            >
              {product?.name?.length > 30
                ? product?.name.slice(0, 29) + "..."
                : product?.name}
            </h1>
          </div>

          <div className="md:flex flex-wrap items-center justify-between w-full mt-2 mb-2">
            <div className="w-full md:w-[48%]">
              <button
                disabled={product?.quantity < 1}
                onClick={() => {
                  handleSetLocalStorage();
                  handleAddCartButtonClick(product?.name?.slice(0, 50));
                }}
                // onClick={handleSetLocalStorage}
                className=" text-xs justify-center p-1 rounded cursor-pointer bg-white hover:bg-primary duration-150  text-primary hover:text-white   border-2 border-primary hover:scale-110  flex items-center gap-1 w-full"
              >
                <Icon icon="bi:cart-plus-fill" />
                Add To Cart
              </button>
            </div>
            <div className="w-full mt-3 md:mt-0 md:w-[48%]">
              <Link
                href={`/checkout/direct-buy/${product?._id}`}
                tabIndex={0}
                className="w-full"
              >
                <div
                  onClick={() =>
                    handleBuyNowButtonClick(product?.name?.slice(0, 50))
                  }
                  className="flex items-center gap-1 text-xs  p-1 rounded cursor-pointer justify-center bg-primary duration-150 text-white     border-2 border-primary hover:scale-110"
                >
                  <span className="flex items-center gap-1 ">
                    <Icon icon="solar:money-bag-bold" />
                    Order Now
                  </span>
                </div>
              </Link>
            </div>
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
    </div>
  );
};

export default ProductCard;
