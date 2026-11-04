import React from 'react';


import Header from '../../../../components/Components/Admin/LandingPage/Header';
import DashboardLayout from '../../../../components/Components/DashboardLayout';
import GalarySection from '../../../../components/Components/Admin/LandingPage/GalarySection';
import Features from '../../../../components/Components/Admin/LandingPage/Features';
import CheckOut from '../../../../components/Components/Admin/LandingPage/CheckOut';

const ViewPage = ({ page }) => {
    return (
        <DashboardLayout>
            <div className=''>
                <Header data={page} />
            </div>
            <div className='mid-container'>
                <GalarySection data={page} />
                <Features data={page} />
                <CheckOut data={page} />
            </div>
        </DashboardLayout>
    );
};

export default ViewPage;

export async function getStaticPaths() {
    try {
        const response = await fetch(`${server_url_v2}/landing-page`);
        const data = await response.json();
        const landingPageIds = data?.data?.result?.map((page) => ({
            params: { id: page?._id },
        }));

        return {
            paths: landingPageIds || [],
            fallback: false, // Change to true if you want to enable dynamic route fallback
        };
    } catch (error) {
        console.error('Error fetching landing page IDs:', error);
        return {
            paths: [],
            fallback: false,
        };
    }
}

export async function getStaticProps({ params }) {
    try {
        const { id } = params;
        const response = await fetch(`${server_url_v2}/landing-page/${id}`);
        const data = await response.json();

        return {
            props: {
                page: data.data,
            },
        };
    } catch (error) {
        console.error('Error fetching landing page data:', error);
        return {
            props: {
                page: null,
            },
        };
    }
}
