import Head from "next/head";
import { useEffect, useState, useCallback } from "react";
import server_url from "../lib/config";
import AuthUser from "../lib/AuthUser";
import { updateMethodHook55 } from "../lib/usePostHooks";
import Banner from "../components/Components/Home/Banner/Banner";
import Category from "../components/Components/Home/Category/Category";
import FlashProductSection from "../components/Components/ProductSection/FlashProductSection";
import ProductSection from "../components/Components/ProductSection/ProductSection";
import OurBrand from "../components/Shared/OurBrand";
import NewsLetter from "../components/Components/Home/NewsLetter/NewsLetter";
import AppAds from "../components/Components/Home/AppAds/AppAds";
import prisma from "../lib/prisma";

export async function getStaticProps() {
  try {
    // Query database directly instead of fetching from API routes
    const [banners, category, products, discountedProducts] = await Promise.all([
      // Banners - TODO: create Banner table or return empty for now
      Promise.resolve([]),
      
      // Categories
      prisma.category.findMany({
        where: { status: true },
        take: 100
      }),
      
      // Products
      prisma.product.findMany({
        where: { status: true },
        orderBy: { createdAt: 'desc' },
        take: 100
      }),
      
      // Discounted products
      prisma.product.findMany({
        where: { 
          status: true,
          discount: { gte: 1 }
        },
        take: 100
      })
    ]);

    // Flash data - TODO: implement when Flash model is ready
    const flashData = null;

    return {
      props: { 
        banners, 
        category: category || [], 
        products: products || [], 
        discountedProducts: discountedProducts || [], 
        flashData 
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: { 
        banners: [], 
        category: [], 
        products: [], 
        discountedProducts: [], 
        flashData: null 
      },
      revalidate: 60,
    };
  }
}

export default function Home({
  banners,
  category,
  products,
  discountedProducts,
  flashData,
}) {
  const [discountProduct, setDiscountProduct] = useState([]);
  const { userInfo: user } = AuthUser();

  const updateStatus = useCallback(() => {
    if (user) {
      const lastCall = localStorage.getItem("lastWalletUpdate");
      const now = new Date();

      if (
        !lastCall ||
        new Date(lastCall).toDateString() !== now.toDateString()
      ) {
        updateMethodHook55(`${server_url}/user/wallet`, { userId: user?._id });

        // Update the timestamp in localStorage
        localStorage.setItem("lastWalletUpdate", now);
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) updateStatus();
  }, [user, updateStatus]);
  useEffect(() => {
    if (discountedProducts?.data) {
      const products = discountedProducts.data.products;
      // Sorting by discount for discounted products
      const discounted = [...products].sort((a, b) => b.discount - a.discount);
      setDiscountProduct(discounted);
    }
  }, [discountedProducts]);

  return (
    <>
      <Head>
        <title>Home Shop BD - Best Online Shopping in Bangladesh</title>
        <meta
          name="description"
          content="Shop the best deals on electronics, fashion, home appliances, and more at Home Shop BD. Get amazing discounts and fast delivery!"
        />
        <meta
          name="keywords"
          content="online shopping, e-commerce, best deals, discounts, electronics, fashion, home appliances, Bangladesh shopping"
        />
        <meta name="author" content="Home Shop BD" />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="Home Shop BD - Best Online Shopping in Bangladesh"
        />
        <meta
          property="og:description"
          content="Shop the best deals on electronics, fashion, home appliances, and more at Home Shop BD. Get amazing discounts and fast delivery!"
        />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:url" content="https://homeshopbd.com" />
        <link rel="icon" href="/favicon.ico" />
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GTM-5HDG238Q');
          `}
        </script>
      </Head>

      <Banner data={banners} catagories={category} />
      <Category catagories={category} />
      <FlashProductSection heading="Flash Sale" data={flashData} />
      <ProductSection
        heading="New Arrivals"
        data={products.data?.products ?? []}
      />
      <ProductSection
        heading="Latest Discounted Products"
        data={discountProduct ?? []}
      />

      <ProductSection
        heading="Just For You"
        data={products.data?.products ?? []}
        sliceItem={1000}
      />
      {/* <PopularProducts /> */}
      <OurBrand />
      <NewsLetter />
      <AppAds />
    </>
  );
}

