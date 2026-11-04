import React from "react";
import SecondaryImageCover from "../../components/Shared/SecondaryImageCover";
import Head from "next/head";

const AboutUs = () => {
  return (
    <div>
      <Head>
        <title>About Us | Ecommerce Website</title>
        <meta
          name="description"
          content="Learn more about Home Shop BD, our mission, and what makes us a leading e-commerce platform."
        />
        <meta
          name="keywords"
          content="about us, ecommerce, Home Shop BD, online shopping, best e-commerce platform"
        />
        <meta name="author" content="Home Shop BD" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="About Us | Home Shop BD" />
        <meta
          property="og:description"
          content="Discover Home Shop BD, your trusted online shopping destination with a wide range of quality products and excellent service."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homeshopbd.com/about-us" />
        <meta
          property="og:image"
          content="https://homeshopbd.com/images/about-us.jpg"
        />
      </Head>
      <SecondaryImageCover title={"about us"} />
      <div className="mid-container">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-5  py-16">
          <div>
            <h2 className="font-bold text-3xl my-5">
              Welcome to our Home Shop BD
            </h2>
            <p>
              Home Shop BD – আপনার ভরসার অনলাইন শপ, যেখানে পাবেন Trending
              Gadgets, Home Appliances, Creative Video Products এবং আরও অনেক
              কিছু, সব এক জায়গায়।
            </p>
            <p className="mt-3">
              আমরা ২০২০ সাল থেকে বাংলাদেশের গ্রাহকদের জন্য সেরা মানের প্রোডাক্ট
              সাশ্রয়ী দামে সরবরাহ করে আসছি। আমাদের লক্ষ্য সহজ — ঘরে বসে,
              ঝামেলাহীন শপিং এক্সপেরিয়েন্স দেওয়া।
            </p>

            <h2 className=" text-xl mt-6">আমাদের বিশেষ সেবা:</h2>
            <p className="mt-3">🚚 বাংলাদেশজুড়ে ফাস্ট ডেলিভারি</p>
            <p className="mt-3">💳 Cash on Delivery এবং নিরাপদ পেমেন্ট</p>
            <p className="mt-3">🛡 অরিজিনাল প্রোডাক্ট গ্যারান্টি</p>
            <p className="mt-3">
              📦 Dropshipping Support – উদ্যোক্তাদের জন্য সহজ সমাধান
            </p>
            <p className=" mt-3">📞 24/7 কাস্টমার সাপোর্ট</p>

            <p className=" mt-5">
              আমরা শুধু প্রোডাক্ট বিক্রি করি না, বরং গ্রাহকের আস্থা ও বিশ্বাস
              অর্জন করি। আপনার সন্তুষ্টিই আমাদের সাফল্য।
            </p>

            <p className="mt-3">
              Home Shop BD – “Your Trusted Online Shopping
              Partner in Bangladesh.
            </p>
          </div>
          <div>
            {/* image here */}
            {/* <div className="p-3 md:p-6">
              <Image
                src={
                  "https://kachabazar-store.vercel.app/_next/image?url=%2Fabout-us.jpg&w=1080&q=75"
                }
                width={300}
                height={300}
                className="w-full"
                alt="about image group"
              />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

