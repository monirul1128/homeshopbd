import React, { useEffect, useState } from 'react';
import Pathaw from './Pathaw';
import SteadFast from './SteadFast';
import CustomModal from '../../../Shared/CustomModal';
import steadFastLogo1 from '../../../assets/courier/steadFastLogo1.jpg'
import pathaoLogo from '../../../assets/courier/pathaoLogo.png'
import redxLogo from '../../../assets/courier/redxlogo.png'
import Image from 'next/image';
import { useContext } from 'react';
import CreateContext from '../../CreateContex';

const SentToModal = ({ order, refetch, modalIsOpen, setIsOpen }) => {
    const [activeTab, setActiveTab] = useState("SteadFast")
    const { siteApiSettingData, setSiteApiSettingData } = useContext(CreateContext)


    // const {pathaoApiStoreId,pathaoApiBaseUrl,pathaoApiAccessToken}=siteApiSettingData?.data;
    // const pathoGetToken = () => {

    //     const pathoData = {
    //         client_id: "YqaQW89dnj",
    //         client_secret: "s16vGzmN0jnE67qkIp00upQFMIQtlyUBQPzr2cWc",
    //         username: "bikashroydt@gmail.com",
    //         password: "bikashroy",
    //         grant_type: "s16vGzmN0jnE67qkIp00upQFMIQtlyUBQPzr2cWc"
    //     }

    //     if (token) {
    //         return
    //     }else{
    //         fetch(`${siteApiSettingData?.data?.pathaoApiBaseUrl}/aladdin/api/v1/issue-token`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Accept": "application/json"
    //             },
    //             body: JSON.stringify(pathoData),
    //         })
    //             .then((res) => res.json())
    //             .then((data) => {
    //                 console.log("ggggggggggggggggggggggggggggggg")
    //                 console.log(data)
    //                 console.log("ggggggggggggggggggggggggggggggg")
    //                 if (data.access_token) {
    //                     setToken(data.access_token)
    //                 }
    //                 else {
    //                     swal("error", "Not Get patho access token ", "error")
    //                     console.log(data.error)
    //                 }
    //             });
    //     }

    // }

    return (
        <>
            <CustomModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} >
                <div className=''>
                    <div className="">
                        <div className="lg:w-[900px] w-full px-0 py-2 md:p-5">
                            <div className='flex items-center mt-8 gap-2 flex-wrap'>
                                {/* ======Stead Fast tab button=======  */}
                                <button disabled={siteApiSettingData?.data?.steadFastSecretKey && siteApiSettingData?.data?.steadFastApiKey ? false : true} onClick={() => setActiveTab("SteadFast")} className={`cursor-pointer mb-2 flex items-center gap-1  font-bold px-5 py-2  rounded-md ${activeTab === "SteadFast" ? " bg-primary text-white" : "bg-primary/20 "} ${siteApiSettingData?.data?.steadFastSecretKey && siteApiSettingData?.data?.steadFastApiKey ? " cursor-pointer" : " cursor-not-allowed"}`}>
                                    <Image
                                        src={steadFastLogo1}
                                        width={300}
                                        height={300}
                                        className="w-5 h-5 rounded-full"
                                        alt="steadFastLOGO"
                                    />
                                    SteadFast

                                </button>

                                {/* ======Redx tab button=======  */}
                                {/* <button disabled={siteApiSettingData?.data?.redxApiAccessToken && siteApiSettingData?.data?.redxApiBaseUrl ? false : true} onClick={() => setActiveTab("Redx")} className={` mb-2 flex items-center gap-1   font-bold px-5 py-2  rounded-md ${activeTab === "Redx" ? " bg-primary text-white" : "bg-primary/20 "} ${siteApiSettingData?.data?.redxApiAccessToken && siteApiSettingData?.data?.redxApiBaseUrl ? " cursor-pointer" : " cursor-not-allowed"}`}>

                                    <Image
                                        src={redxLogo}
                                        width={300}
                                        height={300}
                                        className="w-5 h-5 rounded-full"
                                        alt="steadFastLOGO"
                                    />
                                    Redx

                                </button> */}

                                {/* ======Patho tab button=======  */}
                                {/* <button disabled={ siteApiSettingData?.data?.pathaoApiBaseUrl ? false : true} onClick={() => setActiveTab("Pathao")} className={` mb-2   flex items-center gap-1  font-bold px-5 py-2  rounded-md ${activeTab === "Pathao" ? " bg-primary text-white" : "bg-primary/20 "} ${ siteApiSettingData?.data?.pathaoApiBaseUrl ? " cursor-pointer" : "cursor-not-allowed"}`}>

                                    <Image
                                        src={pathaoLogo}
                                        width={300}
                                        height={300}
                                        className="w-5 h-5 rounded-full"
                                        alt="steadFastLOGO"
                                    />
                                    Pathao

                                </button> */}
                            </div>
                            {

                                activeTab === "Pathao" &&
                                <div>
                                    {/* ======Pathaw component=======  */}
                                    <Pathaw setIsOpen={setIsOpen} order={order} refetch={refetch} siteApiSettingData={siteApiSettingData} />
                                </div>
                            }
                            {
                                activeTab === "Redx" &&
                                <div>
                                    {/* ======Redx component=======  */}
                                    hello redx
                                </div>
                            }
                            {
                                activeTab === "SteadFast" &&
                                <div>
                                    {/* ======SteadFast component=======  */}
                                    <SteadFast setIsOpen={setIsOpen} order={order} refetch={refetch} siteApiSettingData={siteApiSettingData} />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </CustomModal>

        </>
    );
};

export default SentToModal;