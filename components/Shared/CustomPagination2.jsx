"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import ReactPaginate from "react-paginate";

const CustomPagination2 = ({
  arrayData = [],
  setCurrentItems,
  itemsPerPage = 10,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  // ✅ যখনই currentPage change হবে, itemOffset reset হবে
  useEffect(() => {
    const newOffset = (currentPage - 1) * itemsPerPage;
    setItemOffset(newOffset);
  }, [currentPage, itemsPerPage]);

  // ✅ data slice করে currentItems set করবো
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(arrayData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(arrayData.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, arrayData]);

  const handlePageClick = ({ selected }) => {
    const newPage = selected + 1;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage);
    router.push(`${pathname}?${params.toString()}`);
  };

  if (arrayData.length <= itemsPerPage) return null;

  return (
    <div className="flex justify-center">
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        previousLabel="<<"
        onPageChange={handlePageClick}
        pageCount={pageCount}
        forcePage={currentPage - 1} // ✅ URL এর সাথে sync থাকবে
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        renderOnZeroPageCount={null}
        containerClassName="btn-group pagination"
        pageLinkClassName="btn btn-sm bg-white hover:bg-[#5ab1bb] hover:text-white text-black"
        previousLinkClassName="btn btn-sm bg-white hover:bg-[#5ab1bb] hover:text-white text-black"
        nextLinkClassName="btn btn-sm bg-white hover:bg-[#5ab1bb] hover:text-white text-black"
        activeClassName="pagination-active"
      />
    </div>
  );
};

export default CustomPagination2;
