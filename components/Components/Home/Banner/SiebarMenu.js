import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { useQuery } from "react-query";
import { getCategories } from "../../../../lib/helper";
import CreateContext from "../../CreateContex";
import CustomCategorySkeleton from "../../CustomSkeleton/CustomCategorySkeleton";
import { useRouter } from "next/router";

const SiebarMenu = ({categories}) => {
  const { setQueryFromCategory } = useContext(CreateContext);
  const [activeParentCategory, setActiveParentCategory] = useState(null);


  const router = useRouter();

  const handleParentCategoryMouseEnter = (parentCategory) => {
    setActiveParentCategory(parentCategory);
  };

  const handleParentCategoryMouseLeave = () => {
    setActiveParentCategory(null);
  };

  const handelCategoryParams = (cat) => {
    const params = new URLSearchParams();
    params.append("category", cat);
    const url = `${params.toString()}`;
    setQueryFromCategory(url);
  };

  const handelChildeCategoryParams = (cat) => {
    const params = new URLSearchParams();
    params.append("subCategory", cat);
    const url = `${params.toString()}`;
    setQueryFromCategory(url);
  };

  const handelSub = (category, subCategory) => {
    const params = new URLSearchParams();
    params.append("category", category);

    params.append("subCategory", subCategory);
    const url2 = `${params.toString()}`;
    router.push(`/category?${url2}`);
  };

  const handelCat = (category) => {
    const params = new URLSearchParams();
    params.append("category", category);
    const url2 = `${params.toString()}`;
    router.push(`/category?${url2}`);
  };

  return (
    <div className="">
      <ul
        id="catagory-menu"
        className=" bg-white first-letter h-[350px] rounded-md"
      >
        <div>
          <span className="w-full flex items-center justify-center bg-primary text-white font-bold p-2 gap-5 -mt-3 shadow-sm py-2">
            <GiHamburgerMenu size={25} />
            <span className=" font-medium">Shop By Department</span>
            <svg
              className="fill-current ml-auto"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
            </svg>
          </span>
        </div>
        <>
          {!categories ? (
            <CustomCategorySkeleton />
          ) : (
            <>
              {categories?.data?.result?.slice(0, 8).map((category) => {
                const isParentCategoryActive =
                  activeParentCategory === category.parentCategory;
                const hasChildCategories = category.childCategory.length > 0;
                return (
                  <li
                    key={category._id}
                    id="parent-category"
                    onMouseEnter={() =>
                      handleParentCategoryMouseEnter(category.parentCategory)
                    }
                    onMouseLeave={handleParentCategoryMouseLeave}
                  >
                    <Link
                      onClick={
                        () => {
                          handelCategoryParams(category.parentCategory);
                          handelCat(category.parentCategory)
                        }
                        // setQueryFromCategory(`category=${category.parentCategory}`)
                      }
                      href="/shop"
                      className="border-t-0 border-l-0 border-r-0 border-b-2   border border-accent"
                    >
                      <span className="flex items-center justify-between">
                        <span className="flex items-center gap-2 font-medium text-sm">
                          <Image
                            alt="category icon"
                            src={category?.imageURLs[0]?.replace("http://", "https://")}
                            width={35}
                            height={35}
                            className="rounded-md object-fill w-5 h-5"
                          />
                          {category.parentCategory}
                        </span>
                        {hasChildCategories && <BiChevronRight size={25} />}
                      </span>
                    </Link>
                    {/* dropdown */}
                    {hasChildCategories && (
                      <ul
                        id="child-category"
                        className={`${
                          isParentCategoryActive ? "visible" : "hidden"
                        } absolute mt-1 ml-2 h-[500px] overflow-y-auto bg-white shadow-lg p-2`}
                      >
                        <p className=" font-medium text-md py-2 pl-5 border-b-2 border border-accent">
                          {category.parentCategory}
                        </p>
                        {category.childCategory.map((child, index) => (
                          <li key={index} className="text-sm font-medium">
                            <button
                              onClick={
                                () => {
                                  handelChildeCategoryParams(child);
                                  handelSub(category?.parentCategory, child);
                                }
                                // setQueryFromCategory(`subCategory=${child}`)
                              }
                              className="text-sm font-medium capitalize cursor-pointer"
                            >
                              - {child}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </>
          )}
        </>
      </ul>
    </div>
  );
};

export default SiebarMenu;
