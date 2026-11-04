import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";

const CustomPagination3 = ({ total, itemsPerPage = 10 }) => {
  const router = useRouter();
  const { query } = router;
  
  const currentPage = Number(query.page) || 1; // Get current page from URL
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    setPageCount(Math.ceil(Number(total) / itemsPerPage));
  }, [total, itemsPerPage]);

  const handlePageClick = (event) => {
    const newPage = event.selected + 1;

    router.push({
      pathname: router.pathname,
      query: { ...query, page: newPage }
    });
  };

  return (
    <div className="flex justify-center">
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel="<<"
        renderOnZeroPageCount={null}
        forcePage={currentPage - 1} // Keep UI in sync with the URL
        containerClassName="btn-group pagination"
        pageLinkClassName="btn btn-sm bg-white hover:bg-[#5ab1bb] hover:text-white text-black"
        previousLinkClassName="btn btn-sm bg-white hover:bg-[#5ab1bb] hover:text-white text-black"
        nextLinkClassName="btn btn-sm bg-white hover:bg-[#5ab1bb] hover:text-white text-black"
        activeClassName="pagination-active"
      />
    </div>
  );
};

export default CustomPagination3;
