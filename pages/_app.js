import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "regenerator-runtime/runtime";
import CreateContext from "../components/Components/CreateContex";
import Layout from "../components/Components/Layout";
import "react-quill/dist/quill.snow.css";
import "../styles/globals.css";
import "react-modern-drawer/dist/index.css";
import "chart.js";
import { useRouter } from "next/router";
import useSiteApiSettingUpdateWithFetch from "../lib/useSiteApiSettingUpdateWithFetch";
import { useUserData } from "../components/hooks/useMyShopData";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  const [addToCartRefresher, setAddToCartRefresher] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenWishlist, setIsOpenWishlist] = useState(false);
  const [localStorageCartItems, setlocalStorageCartItems] = useState(0);
  const [localStorageWishlistItems, setlocalStorageWishlistItems] = useState(0);
  const [wishlistRefresher, setWishlistRefresher] = useState(false);
  const [richTextContent, setRichTextContent] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [reolder, setReloader] = useState(false);
  const [editProduct, setEditProduct] = useState({});
  const [queryFromCategory, setQueryFromCategory] = useState("");
  const [buyNowProduct, setBuyNowProduct] = useState("");
  const [orderResponse, setOrderResponse] = useState(null);
  const [siteApiSettingData, setSiteApiSettingData] = useState({});
  const [historyName, setHistoryName] = useState("");
  const [getProductId, setGetProductId] = useState([]);
  const [getProductId2, setGetProductId2] = useState({});
  const [lastUser, setLastUser] = useState({});
  const [pathoToken, setPathoToken] = useState("");

  const [loading, setLoading] = useState(true);

  const value = {
    addToCartRefresher,
    setAddToCartRefresher,
    isOpen,
    setIsOpen,
    setlocalStorageCartItems,
    localStorageCartItems,
    wishlistRefresher,
    setWishlistRefresher,
    localStorageWishlistItems,
    setlocalStorageWishlistItems,
    isOpenWishlist,
    setIsOpenWishlist,
    richTextContent,
    setRichTextContent,
    user,
    setUser,
    setToken,
    token,
    reolder,
    setReloader,
    editProduct,
    setEditProduct,
    queryFromCategory,
    setQueryFromCategory,
    buyNowProduct,
    setBuyNowProduct,
    orderResponse,
    setOrderResponse,
    historyName,
    setHistoryName,
    siteApiSettingData,
    setSiteApiSettingData,
    getProductId,
    setGetProductId,
    getProductId2,
    setGetProductId2,
    lastUser,
    setLastUser,
    pathoToken,
    setPathoToken,
  };

  useEffect(() => {
    useSiteApiSettingUpdateWithFetch({}, setSiteApiSettingData);
  }, []);
  const router = useRouter();

  const ganaretToken = () => {
    // const data = {
    //   client_id: siteApiSettingData?.data?.pathaoApiBaseUrl,
    //   client_secret: siteApiSettingData?.data?.pathaoApiAccessToken,
    //   username: siteApiSettingData?.data?.redxApiBaseUrl,
    //   password: siteApiSettingData?.data?.redxApiAccessToken,
    //   grant_type: "password",
    // };

    const data = {
      client_id: process.env.client_id,
      client_secret: process.env.client_secret,
      username: process.env.username,
      password: process.env.password,
      grant_type: "password",
    };

    fetch(
      "https://server-homeshopbd-2-kohl.vercel.app/api/v1/order/pathao/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then(async (data) => {
        if (data) {
          // setPathoToken(data.access_token);
          setPathoToken(data.data);
        } else {
          console.log(data.error);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      ganaretToken();
    }, 10000);

    return () => clearTimeout(timer); // Clear the timer on unmount or before the effect runs again
  }, []);

  useEffect(() => {
    if (siteApiSettingData?.data?.fbPixelId) {
      import("react-facebook-pixel")
        .then((x) => x.default)
        .then((ReactPixel) => {
          ReactPixel.init(siteApiSettingData?.data?.fbPixelId);
          ReactPixel.pageView();

          // router.events.on('routeChangeComplete', () => {
          //   ReactPixel.pageView()
          // })
        });
    }
  }, [router.events]);

  return (
    <QueryClientProvider client={queryClient}>
      <CreateContext.Provider value={value}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CreateContext.Provider>
    </QueryClientProvider>
  );
}

export default MyApp;

