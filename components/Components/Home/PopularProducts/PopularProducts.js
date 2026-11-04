import { useContext, useEffect, useState } from "react";
import { MdOutlineUnfoldMore } from "react-icons/md";
import { useQuery } from "react-query";
import { products } from "../../../../lib/helper";
import { getCookie, setCookie } from "../../../hooks/useCustomCookie";
import { useCustomQuery } from "../../../hooks/useMyShopData";
import ProductCard from '../../../Shared/ProductCard';
import CreateContext from "../../CreateContex";
import CustomProductSectionSkeleton from "../../CustomSkeleton/CustomProductSectionSkeleton";

const PopularProducts = () => {
  const { setUser, setToken } = useContext(CreateContext);
  const [queryFilter, setQuery] = useState("");
  const [userInterest, setUserInterest] = useState("");
  const [visible, setVisible] = useState(10);

  const { data, isLoading, refetch } = useCustomQuery(
    ["products", userInterest],
    `product/user-interested-product?interest=${userInterest}&status=true`
  );

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 10);
  };

  useEffect(() => {
    const searchCookie = getCookie("searchQuery");
    if (!searchCookie) {
      return setUserInterest("a");
    }
    setUserInterest(searchCookie);
  }, []);

  return (
    <>
      {isLoading ? <CustomProductSectionSkeleton/>:
      <div className="py-10 bg-accent">
      <div className="mid-container">
        <div className="">
          <div className=" mb-4">
            <h1 className="text-xl md:text-2xl font-semibold text-start capitalize text-[#444]  mt-2 ">
              Just For You
            </h1>
            {/* <p className=" text-neutral">
              Find Products Tailored to Your Unique Style and Preferences
            </p> */}
          </div>
        </div>
        <div className="grid xl:grid-cols-5 lg:grid-cols-4  md:grid-cols-3 grid-cols-2 gap-3 lg:gap-7">
          {data?.data.result?.map((item) => (
            <ProductCard key={item._id} product={item}></ProductCard>
          ))}
        </div>
      </div>
      {/* <div className="w-full text-center">
        <button
          onClick={showMoreItems}
          className="bg-primary  px-3 py-2 font-bold mt-5 rounded-md mx-auto flex items-center gap-1 hover:bg-opacity-0 duration-150 text-white hover:text-primary border border-primary"
        >
          <MdOutlineUnfoldMore size={22} />
          Load More
        </button>
      </div> */}
    </div>

      }
    </>
  );
};

export default PopularProducts;
