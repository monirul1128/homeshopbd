import { useState } from "react";
import { MdOutlineUnfoldMore } from "react-icons/md";
import BlogCard from "./BlogCard";

const BlogSection = ({ data }) => {
  const [limit, setLimit] = useState(10);

  console.log(data.data.result);

  const showMoreItems = () => {
    setLimit((pre) => pre + 20);
  };

  return (
    <>
      {!data ? (
        <div className=" w-full h-full py-5 flex items-center justify-center">
          <h2>Loading...</h2>
        </div>
      ) : (
        <div className="py-1 md:py-10 bg-accent">
          <div className="mid-container">
            <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
              {data.data.result.slice(0, limit).map((item) => (
                <BlogCard key={item._id} blog={item} />
              ))}
            </div>
          </div>
          {limit < data?.data?.result.length && (
            <div className="w-full text-center">
              <button
                onClick={showMoreItems}
                className="bg-primary  px-3 py-2 font-bold mt-5 rounded-md mx-auto flex items-center gap-1 hover:bg-opacity-0 duration-150 text-white hover:text-primary border border-primary"
              >
                <MdOutlineUnfoldMore size={22} />
                Load More
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default BlogSection;
