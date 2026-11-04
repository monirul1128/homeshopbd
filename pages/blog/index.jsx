import React from "react";
import AppAds from '../../Components/Components/Home/AppAds/AppAds";
import SecondaryImageCover from '../../Components/Shared/SecondaryImageCover";
import prisma from "../../lib/prisma";
import BlogSection from '../../Components/Components/Admin/blog/BlogSection";

export async function getStaticProps() {
  try {
    // Query database directly instead of fetching from API
    const blogs = await prisma.blog.findMany({
      where: { status: 'SHOW' },
      orderBy: { createdAt: 'desc' },
      take: 100
    });

    return {
      props: { 
        blogs: blogs || []
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return {
      props: { blogs: [] },
      revalidate: 60,
    };
  }
}

const BlogPage = ({ blogs }) => {
  console.log(blogs);

  return (
    <div>
      <>
        <SecondaryImageCover title={"Our Blog"} />
        <BlogSection data={blogs} />
        <AppAds />
      </>
    </div>
  );
};

export default BlogPage;
