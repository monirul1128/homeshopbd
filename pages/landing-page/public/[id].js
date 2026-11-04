import React from "react";
import Header from '../../../Components/Components/Admin/LandingPage/Header";
import GalarySection from '../../../Components/Components/Admin/LandingPage/GalarySection";
import Features from '../../../Components/Components/Admin/LandingPage/Features";
import CheckOut from '../../../Components/Components/Admin/LandingPage/CheckOut";

const SingleLandingPage = ({ page }) => {
  return (
    <div>
      <div className="">
        <Header data={page} />
      </div>
      <div className="mid-container">
        <GalarySection data={page} />
        <Features data={page} />
        <CheckOut data={page} />
      </div>
    </div>
  );
};

export default SingleLandingPage;

export async function getServerSideProps({ params }) {
  const res = await fetch(
    `https://server-homeshopbd-2-kohl.vercel.app/api/v2/landing-page/${params.id}`
  );
  const data = await res.json();

  console.log("ServerSide Props", data);

  return {
    props: { page: data.data },
  };
}
