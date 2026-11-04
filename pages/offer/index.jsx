import Head from "next/head";
import AppAds from '../../components/Components/Components/Home/AppAds/AppAds';
import OfferCard from '../../components/Components/Components/Offer/OfferCards';
import SecondaryImageCover from '../../components/Components/Shared/SecondaryImageCover';

const Offer = () => {
  return (
    <>
      <Head>
        <title>Mega Offers | Best Deals & Discounts - Home Shop BD</title>
        <meta 
          name="description" 
          content="Grab the best deals and discounts on your favorite products. Don't miss out on exclusive offers at Home Shop BD." 
        />
        <meta 
          name="keywords" 
          content="mega offer, best deals, online shopping, discounts, flash sale, Home Shop BD" 
        />
        <meta name="author" content="Home Shop BD" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Mega Offers | Best Deals & Discounts - Home Shop BD" />
        <meta 
          property="og:description" 
          content="Discover amazing discounts and exclusive deals on top products. Shop now and save big!" 
        />
        <meta property="og:image" content="https://yourwebsite.com/offer-preview-image.jpg" />
        <meta property="og:url" content="https://yourwebsite.com/offer" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mega Offers | Best Deals & Discounts - Home Shop BD" />
        <meta 
          name="twitter:description" 
          content="Exclusive discounts and amazing deals on top-quality products. Limited-time offers, shop now!" 
        />
        <meta name="twitter:image" content="https://yourwebsite.com/offer-preview-image.jpg" />
      </Head>

      <SecondaryImageCover title={"Mega Offer"} />
      <div className=" bg-accent pb-10">
        <div className="mid-container -z-20 p-9">
          <OfferCard />
        </div>
        <AppAds />
      </div>
    </>
  );
};

export default Offer;
