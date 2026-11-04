import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  sumOfCartPrice,
  sumOfProductPrice,
  sumOfSalePrice,
} from "../../../lib/commonFunction";
import updateCartLocalStorage from "../../../lib/updateCartLocalStorage";
import { handlePostMethod } from "../../../lib/usePostHooks";
import BdCity from '../../../Components/Components/BdCity";
import PaymentIndex from '../../../Components/Components/CheckoutPayment/PaymentIndex";
import CheckoutProductItems from '../../../Components/Components/CheckoutProductItems/CheckoutProductItems";
import CreateContext from '../../../Components/Components/CreateContex";
import CustomModal from '../../../Components/Shared/CustomModal";
import CartProductItems from '../../../Components/Shared/drawer/CartProductItems";
import ApplyCoupon from '../../../Components/Components/Coupons/ApplyCoupon";
import AuthUser from "../../../lib/AuthUser";
import swal from "sweetalert";
import CheckoutProductItemsDirectBuy from '../../../Components/Components/CheckoutProductItems/CheckoutProductItemsDirectBuy";
import SizeAndColorInCheckout from '../../../Components/Components/CheckoutProductItems/SizeAndColorInCheckout";
import SizeAndColorInCheckoutDirectBuy from '../../../Components/Components/CheckoutProductItems/SizeAndColorInCheckoutDirectBuy";
import RequireAuth from '../../../Components/RequireAuth/RequireAuth";
import useFacebookPixel from '../../../Components/hooks/useFacebookPixel";
import BDAutoCity from '../../../Components/Components/BDAutoCity";
import { useQuery } from "react-query";
import { getUserInfo } from "../../../lib/helper";
import ApplyWallet from '../../../Components/Components/Coupons/ApplyWallet";
const DirectBuy = () => {
  const router = useRouter();
  const id = router.query.id;

  const [product, setProduct] = useState({});
  const [sizeIndex, setSizeIndex] = useState(0);
  const [inputSize, setInputSize] = useState("");
  const [userColor, setUserColor] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState({});
  const [productData, setProductData] = useState({});
  const [selectedCity, setSelectedCity] = useState("");
  const [cityErrorMessage, setCityErrorMessage] = useState(false);
  const [shippingCost, setShippingCost] = useState(130);
  const [originalPriceTotal, setOriginalPriceTotal] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [productId, setProductId] = useState(0);
  const [modalIsOpenSizeAndColor, setIsOpenSizeAndColor] = useState(false);
  // when user click in size set product item
  const [productItem, setProductItem] = useState({});
  const [qyt, setQyt] = useState(1);
  const [applyWallet, setApplyWallet] = useState();
  const [pointAmount, setPointAmount] = useState();

  const {
    buyNowProduct,
    setAddToCartRefresher,
    addToCartRefresher,
    setQueryFromCategory,
  } = useContext(CreateContext);
  const { userInfo: user } = AuthUser();

  const { data: userData } = useQuery(["user"], () => {
    if (user._id) {
      return getUserInfo(user._id);
    }
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
    reset,
  } = useForm({
    defaultValues: {
      firstName: user?.fullName?.split(" ")[0],
      email: user?.email,
    },
  });
  // -------------------find product using id----------------
  const productUrl = `https://server-homeshopbd-2-kohl.vercel.app/api/v1/product/${id}`;

  useEffect(() => {
    setLoading(true);
    if (id) {
      fetch(productUrl)
        .then((res) => res.json())
        .then((data) => {
          setProduct({ items: [data.data] });
          setOriginalPriceTotal(data.data.productPrice);
          setCartTotal(data.data.salePrice);
          setProductId(data.data._id);
          setProductData(data.data);
          if (data?.data?.size) {
            setInputSize(data.data.size[0]);
          }
          if (data?.data?.productColor?.length > 0) {
            setUserColor(data.data.productColor[0]);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [id]);
  // cartTotal and originalProductPrice

  useEffect(() => {
    setCouponDiscount(0);
    setOriginalPriceTotal(productData.productPrice * qyt);
    setCartTotal(productData.salePrice * qyt);
  }, [product, qyt, productData]);

  // console.log("form local storage", productIdAndQuantity);
  let productsArr = [];
  if (productData?.name) {
    productsArr = [
      {
        product: productData._id,
        name: productData.name,
        price: productData.salePrice,
        originalProductPrice: productData.productPrice,
        quantity: qyt,
        imageURL: productData?.imageURLs[0],
        size: inputSize,
        color: userColor,
        category: productData.category,
      },
    ];
  }

  const { trackEvent } = useFacebookPixel();
  const handlePlaceOrderButtonClick = () => {
    trackEvent("ButtonClick", { buttonName: "Place Order" });
  };

  const onSubmitForm = async (data) => {
    if (product.items.length < 1) {
      return swal("error", "Product cart is empty!!", "error");
    }
    if (!selectedCity) {
      return setCityErrorMessage(true);
    }
    setCityErrorMessage(false);
    setIsOpen(true);

    const newOrder = {
      orderItem: productsArr,
      user: user?._id,
      email: data.email,
      name: data.firstName,
      shippingPrice: shippingCost,
      totalAmount:
        cartTotal +
        Number(shippingCost) -
        couponDiscount -
        (pointAmount ? pointAmount : 0),
      afterDiscountPrice: cartTotal - couponDiscount,
      originalProductPrice: originalPriceTotal,
      discount: originalPriceTotal - cartTotal + couponDiscount,
      wallet: applyWallet ? applyWallet : 0,
      couponDiscount,
      shippingAddress: {
        address: data.address,
        city: selectedCity,
        thana: data.thana || "",
        email: data.email,
        firstName: data.firstName, //frisName mane backend a fullName hisabe jacche, ekhan theke firstName e pathate hobe
        lastName: data.lastName || "",
        phone: data.phone,
        postalCode: data.postal || "",
        useWallet: pointAmount ? pointAmount : 0,
      },
      paymentDetails: {},
    };
    setOrder(newOrder);
    return;
  };

  const handleSaveSizeInLocal = (size) => {
    setInputSize(size);
  };

  return (
    <>
      <div className="bg-accent">
        <div className="mid-container">
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <div className=" block md:grid grid-cols-5 justify-center gap-5 py-16">
              {/*    <div className="w-full md:w-[60%] bg-white p-5 rounded-xl shadow h-fit">
                <h1 className="font-semibold mb-2">01. Personal Address</h1>
                <div className="grid grid-cols-2 gap-5">
                  <div className=" p mb-4">
                    <label htmlFor="name" className="leading-7 text-sm ">
                      First Name
                    </label>
                    <input
                      type="name"
                      id="firstName"
                      name="first_name"
                      className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                      placeholder="First Name"
                      {...register("firstName", {
                        required: "First Name is required",
                      })}
                      onKeyUp={(e) => {
                        trigger("firstName");
                      }}
                    />
                    <small className="text-[#FF4B2B] text-xs font-medium my-2">
                      {errors?.firstName?.message}
                    </small>
                  </div>
                  <div className=" p mb-4">
                    <label htmlFor="name" className="leading-7 text-sm ">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="last-name"
                      className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                      placeholder="last Name"
                      {...register("lastName")}
                      onKeyUp={(e) => {
                        trigger("lastName");
                      }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div className=" p mb-4">
                    <label htmlFor="name" className="leading-7 text-sm ">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                      placeholder="Email Address"
                      disabled
                      {...register("email")}
                      onKeyUp={(e) => {
                        trigger("email");
                      }}
                    />
                    <small className="text-[#FF4B2B] text-xs font-medium my-2">
                      {errors?.email?.message}
                    </small>
                  </div>
                  <div className=" p mb-4">
                    <label htmlFor="name" className="leading-7 text-sm ">
                      Phone Number
                    </label>
                    <input
                      type="number"
                      id="phone"
                      name="phone"
                      className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                      placeholder="Phone Number"
                      {...register("phone", {
                        required: "Phone is required",
                      })}
                      onKeyUp={(e) => {
                        trigger("phone");
                      }}
                    />
                    <small className="text-[#FF4B2B] text-xs font-medium my-2">
                      {errors?.phone?.message}
                    </small>
                  </div>
                </div>

                <h1 className="font-semibold my-2">02. Shipping Address</h1>
                <div className="relative mb-4">
                  <label htmlFor="message" className="leading-7 text-sm">
                    Street Address
                  </label>
                  <input
                    type="address"
                    id="address"
                    name="address"
                    className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none "
                    placeholder="house:12, road:5, Nikunja-2"
                    {...register("address", {
                      required: "Address is required",
                    })}
                    onKeyUp={(e) => {
                      trigger("address");
                    }}
                  />
                  <small className="text-[#FF4B2B] text-xs font-medium my-2">
                    {errors?.address?.message}
                  </small>
                </div>
                <div>
                  <BdCity
                    selectedCity={selectedCity}
                    setSelectedCity={setSelectedCity}
                    setShippingCost={setShippingCost}
                  />
                  <p className="text-red-500 text-xs">
                    {cityErrorMessage && "Please Select city"}
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                  <div className=" p mb-4">
                    <label htmlFor="name" className="leading-7 text-sm ">
                      Thana
                    </label>
                    <input
                      type="text"
                      id="thana"
                      name="thana"
                      className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                      placeholder="Khilkhet"
                      {...register("thana", {
                        required: "thana Name is required",
                      })}
                      onKeyUp={(e) => {
                        trigger("thana");
                      }}
                    />
                    <small className="text-[#FF4B2B] text-xs font-medium my-2">
                      {errors?.thana?.message}
                    </small>
                  </div>
                  <div className=" p mb-4">
                    <label htmlFor="name" className="leading-7 text-sm ">
                      ZIP / Postal
                    </label>
                    <input
                      type="text"
                      id="postal"
                      name="postal"
                      className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                      placeholder="2345"
                      {...register("postal", {
                        required: "ZIP/ Postal is required",
                      })}
                      onKeyUp={(e) => {
                        trigger("postal");
                      }}
                    />
                    <small className="text-[#FF4B2B] text-xs font-medium my-2">
                      {errors?.postal?.message}
                    </small>
                  </div>
                </div>
              </div> */}
              {/* old code avboe */}

              <div className="w-full md:col-span-3 bg-white p-5 md:p-9 rounded-xl shadow h-fit mb-3 md:mb-0 ">
                <h1 className="font-semibold mb-2">01. Personal Address</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-5">
                  <div className=" p mb-4">
                    <label htmlFor="name" className="leading-7 text-sm ">
                      {/* ekhane first name chilo, ekhon sudo diract fulll name hobe, tai ekhane first name er poriborte sudo label ta change hobe, last name a kichu jabe na, tai empnty string jabe */}
                      Full Name
                    </label>
                    <input
                      type="name"
                      id="firstName"
                      name="first_name"
                      className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                      placeholder="Full Name"
                      {...register("firstName", {
                        required: "Full Name is required",
                      })}
                      onKeyUp={(e) => {
                        trigger("firstName");
                      }}
                    />
                    <small className="text-[#FF4B2B] text-xs font-medium my-2">
                      {errors?.firstName?.message}
                    </small>
                  </div>
                  <div className=" p mb-4">
                    <label htmlFor="name" className="leading-7 text-sm ">
                      Phone Number
                    </label>
                    <input
                      type="number"
                      id="phone"
                      name="phone"
                      className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                      placeholder="Phone Number"
                      {...register("phone", {
                        required: "Phone is required",
                      })}
                      onKeyUp={(e) => {
                        trigger("phone");
                      }}
                    />
                    <small className="text-[#FF4B2B] text-xs font-medium my-2">
                      {errors?.phone?.message}
                    </small>
                  </div>
                  {/* ----------last name ta comment karon full name jacche ekhon jodi kichu na jay tobe, empnty string jay */}
                  {/*  <div className=" p mb-4">
                    <label htmlFor="name" className="leading-7 text-sm ">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="last-name"
                      className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                      placeholder="last Name"
                      {...register("lastName")}
                      onKeyUp={(e) => {
                        trigger("lastName");
                      }}
                    />
                  </div> */}
                </div>
                <div className="grid grid-cols-1 gap-5">
                  <div className=" p mb-4">
                    <label htmlFor="name" className="leading-7 text-sm ">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                      placeholder="Email Address"
                      {...register("email")}
                      onKeyUp={(e) => {
                        trigger("email");
                      }}
                    />
                    <small className="text-[#FF4B2B] text-xs font-medium my-2">
                      {errors?.email?.message}
                    </small>
                  </div>
                  {/*  <div className=" p mb-4">
                    <label htmlFor="name" className="leading-7 text-sm ">
                      Phone Number
                    </label>
                    <input
                      type="number"
                      id="phone"
                      name="phone"
                      className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                      placeholder="Phone Number"
                      {...register("phone", {
                        required: "Phone is required",
                      })}
                      onKeyUp={(e) => {
                        trigger("phone");
                      }}
                    />
                    <small className="text-[#FF4B2B] text-xs font-medium my-2">
                      {errors?.phone?.message}
                    </small>
                  </div> */}
                </div>

                <h1 className="font-semibold my-2">02. Shipping Address</h1>
                <div className="w-full my-3">
                  <BDAutoCity
                    selectedCity={selectedCity}
                    setSelectedCity={setSelectedCity}
                    setShippingCost={setShippingCost}
                  />
                  <p className="text-red-500 text-xs">
                    {cityErrorMessage && "Please Select city"}
                  </p>
                </div>
                <div className="relative mb-4">
                  <label htmlFor="message" className="leading-7 text-sm">
                    Full Address
                  </label>
                  <input
                    type="address"
                    id="address"
                    name="address"
                    className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none "
                    placeholder="Enter Your Full Address"
                    {...register("address", {
                      required: "Address is required",
                    })}
                    onKeyUp={(e) => {
                      trigger("address");
                    }}
                  />
                  <small className="text-[#FF4B2B] text-xs font-medium my-2">
                    {errors?.address?.message}
                  </small>
                </div>

                {/* -----------------thana and postal code coment kora hoyche and er poriborte empty stirng pathanu hoyeche jeno error na dey */}
                {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                  <div className=" p mb-4">
                    <label htmlFor="name" className="leading-7 text-sm ">
                      Thana
                    </label>
                    <input
                      type="text"
                      id="thana"
                      name="thana"
                      className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                      placeholder="Khilkhet"
                      {...register("thana", {
                        required: "thana Name is required",
                      })}
                      onKeyUp={(e) => {
                        trigger("thana");
                      }}
                    />
                    <small className="text-[#FF4B2B] text-xs font-medium my-2">
                      {errors?.thana?.message}
                    </small>
                  </div>
                  <div className=" p mb-4">
                    <label htmlFor="name" className="leading-7 text-sm ">
                      ZIP / Postal
                    </label>
                    <input
                      type="text"
                      id="postal"
                      name="postal"
                      className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                      placeholder="2345"
                      {...register("postal", {
                        required: "ZIP/ Postal is required",
                      })}
                      onKeyUp={(e) => {
                        trigger("postal");
                      }}
                    />
                    <small className="text-[#FF4B2B] text-xs font-medium my-2">
                      {errors?.postal?.message}
                    </small>
                  </div>
                </div> */}
              </div>

              {/* Cart Product */}
              <div className="w-full md:col-span-2 bg-white rounded-xl shadow p-5 relative">
                <h1 className="mb-1 font-semibold title-font">Product List</h1>

                <div className=" overflow-y-scroll max-h-96">
                  {product &&
                    product?.items?.map((productData) => (
                      // row

                      <CheckoutProductItemsDirectBuy
                        product={productData}
                        handleSaveSizeInLocal={handleSaveSizeInLocal}
                        qyt={qyt}
                        setQyt={setQyt}
                        setIsOpenSizeAndColor={setIsOpenSizeAndColor}
                        setProductItem={setProductItem}
                        inputSize={inputSize}
                        userColor={userColor}
                      />
                    ))}
                </div>

                <div className="mt-14">
                  <h1 className="font-semibold border-b-[1px] pb-2 mb-5">
                    Order Summery
                  </h1>

                  <div className="flex justify-between items-center text-sm mb-2">
                    <h1 className="font-medium">Products Total</h1>
                    <p>৳ {originalPriceTotal}</p>
                  </div>
                  <div className="flex justify-between items-center text-sm mb-2">
                    <h1 className="font-medium">After Discount Total</h1>
                    <p className="font-bold">৳ {cartTotal - couponDiscount}</p>
                  </div>
                  {couponDiscount > 0 && (
                    <small className="text-green-500 text-end block font-bold">
                      You got Coupon Discount {couponDiscount} TK.
                    </small>
                  )}
                  <div className="flex justify-between items-center text-sm mb-2">
                    <h1 className="font-medium">Discount Amount</h1>
                    <p>৳ {originalPriceTotal - cartTotal + couponDiscount}</p>
                  </div>
                  <div className="flex justify-between items-center  text-sm mb-2">
                    <h1 className="font-medium">Delivery Fee</h1>
                    <p className="font-bold">৳{shippingCost}</p>
                  </div>
                  <div className="flex justify-between items-center  text-sm">
                    <h1 className="font-medium">Total</h1>
                    <p className="text-green-800 font-bold">
                      ৳ {cartTotal + shippingCost - couponDiscount}
                    </p>
                  </div>
                  <p className="text-xs text-end">
                    VAT included, where applicable
                  </p>

                  {pointAmount && (
                    <div className="flex justify-between items-center  text-sm">
                      <h1 className="font-medium">Use Cashback</h1>
                      <p className="text-yellow-800 font-bold">
                        ৳ {pointAmount}
                      </p>
                    </div>
                  )}
                  {pointAmount && (
                    <div className="flex justify-between items-center  text-sm">
                      <h1 className="font-medium">After Total</h1>
                      <p className="text-green-800 font-bold">
                        ৳ {cartTotal + Number(shippingCost) - pointAmount}
                      </p>
                    </div>
                  )}

                  <div>
                    {userData && (
                      <ApplyWallet
                        data={userData}
                        applyWallet={applyWallet}
                        setWalletAmount={setApplyWallet}
                        setPointAmount={setPointAmount}
                      />
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-5 mt-5">
                    <div
                      onClick={() => {
                        router.push("/shop");
                        setQueryFromCategory("");
                      }}
                      className="text-white btn btn-primary border-0 py-2 px-6 focus:outline-none w-full rounded"
                    >
                      Continue Shopping
                    </div>

                    <button
                      onClick={handlePlaceOrderButtonClick}
                      type="submit"
                      className="text-white btn btn-success border-0 py-2 px-6 focus:outline-none w-full rounded hover:bg-green-900"
                    >
                      Place Order
                    </button>
                  </div>
                  {/* --------------coupon method ------------------- */}
                  <ApplyCoupon
                    setCouponDiscount={setCouponDiscount}
                    query={{
                      from: "true",
                      id: productId,
                      quantity: qyt,
                    }}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        <CustomModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
          {/* -----------this modal for when user placed order then open modal for payment and there have 4 type payment system */}
          <PaymentIndex order={order} setIsOpen={setIsOpen} direct={true} />
        </CustomModal>
        <CustomModal
          modalIsOpen={modalIsOpenSizeAndColor}
          setIsOpen={setIsOpenSizeAndColor}
        >
          {/* -----------this modal for when user change size and color */}
          <SizeAndColorInCheckoutDirectBuy
            product={productItem}
            setIsOpen={setIsOpenSizeAndColor}
            userSizeAndColor={{
              inputSize,
              setInputSize,
              userColor,
              setUserColor,
            }}
          />
        </CustomModal>
      </div>
    </>
  );
};

export default DirectBuy;
