import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogCard = ({ blog }) => {
  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white">
      {blog?.image && (
        <Image width={500} height={500} className="w-full h-48 object-cover" src={blog?.image} alt={blog?.title} />
      )}
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 truncate">{blog?.title}</h2>
        <p className="text-gray-600 text-sm my-2">{blog?.sort_description}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Views: {blog?.view}</span>
          <span>{new Date(blog?.publishDate).toDateString()}</span>
        </div>
        <Link
          href={`/blog/${blog?.path}`}
          className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
