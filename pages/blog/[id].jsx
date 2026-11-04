import React from "react";
import SecondaryImageCover from '../../Components/Shared/SecondaryImageCover";
import AppAds from '../../Components/Components/Home/AppAds/AppAds";
import { FaShareAlt, FaUserCircle } from "react-icons/fa";
import Head from "next/head";
import { useRouter } from "next/router";

const BlogDetailsPage = ({ blog }) => {
  const { asPath } = useRouter();
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const productUrl = `${origin}${asPath}`;

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: blog.title,
          text: blog.sort_description,
          url: window.location.href,
        })
        .catch((error) => console.error("Error sharing", error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (!blog) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <>
      <Head>
        {/* General Meta Tags for SEO */}
        <meta
          name="title"
          content={blog?.title || "We Are Best E-commerce in Bangladesh"}
        />
        <meta
          name="description"
          content={
            blog?.sort_description
              ? blog?.sort_description
              : "Check out this amazing blog!"
          }
        />
        <meta name="image" content={blog?.imageURLs && blog?.imageURLs} />

        <meta property="og:url" content={productUrl} />
        <meta property="og:type" content="blog" />
        <meta
          property="og:title"
          content={blog?.title || "We Are Best E-commerce in Bangladesh"}
        />
        <meta
          property="og:description"
          content={
            blog?.sort_description
              ? blog?.sort_description
              : "Check out this amazing product!"
          }
        />
        <meta
          property="og:image"
          content={blog?.imageURLs && blog?.imageURLs}
        />
        <meta
          name="twitter:image"
          content={blog?.imageURLs && blog?.imageURLs}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <SecondaryImageCover title={"Blog Details"} />
      <div className="max-w-3xl mx-auto p-6">
        {blog.image && (
          <img
            className="w-full rounded-lg mb-6"
            src={blog.image}
            alt={blog.title}
          />
        )}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h1>
        <div className=" flex items-center md:flex-row flex-col gap-3 justify-between">
          <div className="flex items-center gap-4 mb-4">
            {blog.user?.imageURL ? (
              <img
                className="w-10 h-10 rounded-full"
                src={blog.user.imageURL}
                alt={blog.user.fullName}
              />
            ) : (
              <FaUserCircle className="w-10 h-10 text-gray-500" />
            )}
            <div>
              <p className="text-gray-700 font-medium">
                {blog.user?.fullName || "Anonymous"}
              </p>
              <p className="text-gray-500 text-sm">
                Published on {new Date(blog.publishDate).toDateString()}
              </p>
            </div>
          </div>
          <div className=" flex items-center gap-2">
            <p className="text-gray-600">Views: {blog.view}</p>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition"
            >
              <FaShareAlt /> Share
            </button>
          </div>
        </div>
        <div
          className="text-gray-900 text-base font-serif leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        ></div>
      </div>
      <AppAds />
    </>
  );
};

export default BlogDetailsPage;

export async function getServerSideProps({ params }) {
  const res = await fetch(
    `https://server-homeshopbd-2-kohl.vercel.app/api/v1/blog/path/${params.id}`
  );
  const data = await res.json();

  return {
    props: { blog: data.data },
  };
}
