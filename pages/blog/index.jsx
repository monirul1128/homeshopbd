import React from "react";
import AppAds from '../../components/Components/Home/AppAds/AppAds';
import SecondaryImageCover from '../../components/Shared/SecondaryImageCover';
import prisma from "../../lib/prisma";
import BlogSection from '../../components/Components/Admin/blog/BlogSection';

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
        blogs: JSON.parse(JSON.stringify(blogs)) || []
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
