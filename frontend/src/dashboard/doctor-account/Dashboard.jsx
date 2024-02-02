import { useState } from "react";

import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";

import Reviews from "./Reviews";
import Profile from "./Profile";
import Qualifications from "./Qualifications";
import Experiences from "./Experiences";
import TimeSlots from "./TimeSlots";
import DoctorAbout from "../../pages/Doctors/DoctorAbout";
import Tabs from "./Tabs";

import starIcon from "../../assets/images/Star.png";

const Dashboard = () => {
  const [tab, setTab] = useState("overview");

  const {
    data: userData,
    loading,
    error,
  } = useGetProfile(`${BASE_URL}/doctors/profile/me`);

  return (
    <section>
      <div className="max-w-[1400px] mx-auto">
        {loading && !error && <Loading />}
        {error && !loading && <Error />}

        {!loading && !error && (
          <div className="grid lg:grid-cols-3 gap-[30px] lg:gap-[50px] my-10">
            <Tabs tab={tab} setTab={setTab} />
            <div className="lg:col-span-2">
              {userData.isApproved === "pending" && (
                <div className="flex p-4 mb-4 text-yellow-800 rounded-lg bg-yellow-50">
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Info</span>
                  <div className="ml-3 text-sm font-medium">
                    To get approval please complete your profile. We&apos;ll
                    review manually and approve within 3 days.
                  </div>
                </div>
              )}

              <div className="">
                {tab === "overview" && (
                  <div className="shadow-xl rounded-2xl p-7">
                    <div className="flex items-center gap-4 mb-10">
                      <figure className="max-w-[200px] max-h-[200px]">
                        <img
                          src={userData?.photo}
                          alt="User Image"
                          className="w-full"
                        />
                      </figure>
                      <div>
                        <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6 rounded text-[12px] leading-4 lg:text-[16px] lg:leading-6 font-semibold">
                          {userData?.specialization}
                        </span>
                        <h3 className="text-[22px] leading-9 font-bold text-headingColor mt-3">
                          {userData?.name}
                        </h3>
                        <div className="flex items-center gap-[6px]">
                          <span className="flex items-center gap-[6px] text-headingColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold">
                            <img src={starIcon} />
                            {userData?.averageRating?.toFixed(2)}
                          </span>
                          <span className="flex items-center gap-[6px] text-headingColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold">
                            ({userData?.totalRating})
                          </span>
                        </div>
                        <p className="text__para font-[15px] lg:max-w-[390px] leading-6">
                          {userData?.bio}
                        </p>
                      </div>
                    </div>
                    <div className="mt-32">
                      <DoctorAbout doctor={userData} />
                    </div>
                  </div>
                )}

                {tab === 'settings' && <Profile doctorData={userData} />}
                {tab === 'reviews' && <Reviews doctorData={userData} />}
                {tab === 'qualifications' && <Qualifications doctorData={userData} />}
                {tab === 'experiences' && <Experiences doctorData={userData} />}
                {tab === 'timeSlots' && <TimeSlots doctorData={userData} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>

    // <div className="container">
    //   {loading && <Loading />}
    //   {error && <Error errMessage={error} />}
    //   {!loading && !error && (
    //     <div className="grid mt-10 md:grid-cols-3">
    //       <div className="h-full w-3/4 pb-[50px] px-[30px] rounded-md bg-gray-300">
    //         <div className="flex items-center justify-center mt-10">
    //           <figure className="w-[100px] h-[100px] rounded-full">
    //             <img
    //               src={userData.photo}
    //               alt="User Image"
    //               className="w-full h-full rounded-full"
    //             />
    //           </figure>
    //         </div>
    //         <div className="mt-4 text-center">
    //           <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
    //             {userData.name}
    //           </h3>
    //           <p className="text-headingColor text-[15px] leading-6 font-medium">
    //             {userData.email}
    //           </p>
    //           <p className="text-headingColor text-[15px] leading-6 font-medium">
    //             Phone No:
    //             <span className="ml-2 text-headingColor text-[20px] leading-8">
    //               {userData.phone}
    //             </span>
    //           </p>
    //         </div>

    //         <div className="mt-[50px] md:mt-[100px]">
    //           <button
    //             onClick={() => setTab("overview")}
    //             className={`${
    //               tab === "overview" &&
    //               "bg-gray-800 text-white rounded-lg py-2 font-normal"
    //             } w-full px-1 mb-5 text-headingColor font-semibold text-[16px] leading-7 border-b border-headingColor`}
    //           >
    //             Overview
    //           </button>
    //           <button
    //             onClick={() => setTab("settings")}
    //             className={`${
    //               tab === "settings" &&
    //               "bg-gray-800 text-white rounded-lg py-2 font-normal"
    //             } w-full px-1 mb-5 text-headingColor font-semibold text-[16px] leading-7 border-b border-headingColor`}
    //           >
    //             Profile Settings
    //           </button>
    //           <button
    //             onClick={() => setTab("reviews")}
    //             className={`${
    //               tab === "reviews" &&
    //               "bg-gray-800 text-white rounded-lg py-2 font-normal"
    //             } w-full px-1 mb-5 text-headingColor font-semibold text-[16px] leading-7 border-b border-headingColor`}
    //           >
    //             Reviews
    //           </button>
    //           <button
    //             onClick={() => setTab("qualifications")}
    //             className={`${
    //               tab === "qualifications" &&
    //               "bg-gray-800 text-white rounded-lg py-2 font-normal"
    //             } w-full px-1 mb-5 text-headingColor font-semibold text-[16px] leading-7 border-b border-headingColor`}
    //           >
    //             Qualifications
    //           </button>
    //           <button
    //             onClick={() => setTab("experiences")}
    //             className={`${
    //               tab === "experiences" &&
    //               "bg-gray-800 text-white rounded-lg py-2 font-normal"
    //             } w-full px-1 mb-5 text-headingColor font-semibold text-[16px] leading-7 border-b border-headingColor`}
    //           >
    //             Experiences
    //           </button>
    //           <button
    //             onClick={() => setTab("timeSlots")}
    //             className={`${
    //               tab === "timeSlots" &&
    //               "bg-gray-800 text-white rounded-lg py-2 font-normal"
    //             } w-full px-1 mb-5 text-headingColor font-semibold text-[16px] leading-7 border-b border-headingColor`}
    //           >
    //             Time Slots
    //           </button>
    //           <button className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white">
    //             Delete Account
    //           </button>
    //         </div>
    //       </div>

    //       <div className="md:col-span-2 md:px-[30px]">
    //         {tab === "reviews" && <Reviews />}
    //         {tab === "settings" && <Profile doctor={userData} />}
    //         {tab === "qualifications" && <Qualifications />}
    //         {tab === "experiences" && <Experiences />}
    //         {tab === "timeSlots" && <TimeSlots />}
    //       </div>
    //     </div>
    //   )}
    // </div>
  );
};

export default Dashboard;
