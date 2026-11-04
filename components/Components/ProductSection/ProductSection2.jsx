import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import LoadingComponets from "../../Shared/LoadingComponets";
import ProductCard from "../../Shared/ProductCard";
import { AiFillEye } from "react-icons/ai";
import CreateContext from "../CreateContex";
import { products } from "../../../lib/helper";
import CustomProductSectionSkeleton from "../CustomSkeleton/CustomProductSectionSkeleton";
const ProductSection2 = ({
  query,
  heading,
  viewQuery,
  subtitle = "",
  sliceItem = 10,
  id,
}) => {
  const [queryFilter, setQuery] = useState(query);
  const { queryFromCategory, setQueryFromCategory } = useContext(CreateContext);
  const { data, isLoading, refetch } = useQuery(["products", queryFilter], () =>
    products(queryFilter)
  );

  return (
    <>
      <div className="py-10 bg-accent ">
        <div className="mid-container">
          <div className="">
            <div className=" mb-5">
              <h1 className="text-xl md:text-2xl font-semibold capitalize text-[#444] mt-5 md:mt-0 mb-2">
                {heading}
              </h1>
              <p className=" text-neutral">{subtitle}</p>
            </div>
          </div>
          {!isLoading ? (
            <div className="grid xl:grid-cols-5 lg:grid-cols-4  md:grid-cols-3 grid-cols-2 gap-3 lg:gap-7">
              {data?.data?.products
                ?.filter((i) => i._id != id)
                .slice(0, sliceItem)
                ?.map((item) => (
                  <ProductCard key={item._id} product={item}></ProductCard>
                ))}
            </div>
          ) : (
            <CustomProductSectionSkeleton />
          )}
        </div>
        <div className="text-center mt-10 mb-2">
          <Link
            onClick={() => setQueryFromCategory(viewQuery)}
            href={"/shop"}
            className="inline-block bg-primary px-4 py-2 rounded-md hover:bg-white hover:text-primary border border-primary text-white duration-150  "
          >
            <span className="flex justify-center items-center gap-2 ">
              <AiFillEye size={22} /> View All
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductSection2;
