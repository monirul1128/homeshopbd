import React, { useEffect } from "react";
import UserDashLayout from '../../../components/Components/Components/userDashLayout';
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import { useRouter } from "next/router";
import AuthUser from "../../../lib/AuthUser";
import { updateMethodHook55 } from "../../../lib/usePostHooks";
import server_url from "../../../lib/config";

const SingleMeeting = ({ meetingData }) => {
  const { userInfo } = AuthUser();
  const id = userInfo?._id;
  let url = server_url + `/meeting/read`;

  const router = useRouter();

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const updateStatus = () => {
    if (meetingData && id) {
      const data = {
        id: meetingData?._id,
        userId: id,
      };
      updateMethodHook55(url, data);
    }
  };

  useEffect(() => {
    updateStatus();
  }, [meetingData, id]);

  return (
    <UserDashLayout>
      <div className=" px-5 py-5">
        <div className=" flex items-center justify-between">
          <div>
            <h1 className="font-semibold mt-5 text-2xl">
              {meetingData?.title}
            </h1>
            <span className=" text-base font-normal text-gray-500">
              Released: {formatDate(meetingData?.date)}
            </span>
          </div>

          <div className=" flex items-end gap-3 justify-end flex-col">
            <button
              onClick={() => router.back()}
              className=" text-primary  flex items-center gap-1 font-medium"
            >
              <BsArrowLeft /> Back
            </button>
          </div>
        </div>

        <div className=" bg-white shadow-md p-8 py-10 mt-3 rounded-md">
          <div className=" flex items-center gap-2">
            <h1 className=" text-3xl font-bold"> Link :</h1>{" "}
            <Link
              className=" text-3xl font-bold text-[#1ee0ac]"
              href={meetingData?.link}
              target="_blank"
            >
              {meetingData?.link}
            </Link>
          </div>

          <p className=" mt-5 text-gray-600">{meetingData?.description}</p>
        </div>
      </div>
    </UserDashLayout>
  );
};

export default SingleMeeting;

export async function getServerSideProps({ params }) {
  const res = await fetch(
    `https://server-homeshopbd-2-kohl.vercel.app/api/v1/meeting/${params.id}`
  );
  const data = await res.json();

  return {
    props: { meetingData: data.data },
  };
}
