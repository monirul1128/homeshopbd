import React from "react";
import AppAds from '../../components/Components/Home/AppAds/AppAds';
import SecondaryImageCover from '../../components/Shared/SecondaryImageCover';
import connectDB from "../../lib/mongodb";
import Blog from "../../models/Blog";
import BlogSection from '../../components/Components/Admin/blog/BlogSection';

export async function getStaticProps() {
  try {
    // Connect to MongoDB
    await connectDB();

    // Query MongoDB for blogs
    const blogs = await Blog.find({ status: 'SHOW' })
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    return {
      props: { 
        blogs: JSON.parse(JSON.stringify(blogs || []))
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching blogs:', error);
    // Return empty array on error to allow build to complete
    return {
      props: { blogs: [] },
      revalidate: 60,
    };
  }
}

const BlogPage = ({ blogs = [] }) => {
  // Wrap blogs in the expected structure for BlogSection
  const blogData = {
    data: {
      result: blogs
    }
  };

  return (
    <div>
      <>
        <SecondaryImageCover title={"Our Blog"} />
        <BlogSection data={blogData} />
        <AppAds />
      </>
    </div>
  );
};

export default BlogPage;
