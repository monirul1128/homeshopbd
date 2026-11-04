import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import CreateContext from '../Components/CreateContex';

function useFacebookPixel() {
    const { siteApiSettingData, setSiteApiSettingData } = useContext(CreateContext)


    const router = useRouter();


    useEffect(() => {
        if (siteApiSettingData?.data?.fbPixelId) {
            import('react-facebook-pixel')
                .then((x) => x.default)
                .then((ReactPixel) => {
                    ReactPixel.init(siteApiSettingData?.data?.fbPixelId);
                    ReactPixel.pageView();

                    const handleRouteChange = () => {
                        ReactPixel.pageView();
                    };

                    router.events.on('routeChangeComplete', handleRouteChange);

                    return () => {
                        // Cleanup: Remove the event listener when the component unmounts
                        router.events.off('routeChangeComplete', handleRouteChange);
                    };
                });
        }

    }, [router.events]);

    return {
        // You can add more tracking functions here if needed
        trackEvent: (eventName, eventData) => {
            import('react-facebook-pixel')
                .then((x) => x.default)
                .then((ReactPixel) => {
                    ReactPixel.track(eventName, eventData);
                });
        },
    };
}

export default useFacebookPixel;
