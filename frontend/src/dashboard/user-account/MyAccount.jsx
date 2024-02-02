import { useState } from "react";

import MyBookings from "./MyBookings";
import Profile from "./Profile";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";

const MyAccount = () => {
  const [tab, setTab] = useState("bookings");

  const {
    data: userData,
    loading,
    error,
  } = useGetProfile(`${BASE_URL}/users/profile/me`);

  return (
    <div className="container">
      {loading && <Loading />}
      {error && <Error errMessage={error} />}
      {!loading && !error && (
        <div className="grid mt-10 md:grid-cols-3">
          <div className="h-full w-3/4 pb-[50px] px-[30px] rounded-md bg-gray-300">
            <div className="flex items-center justify-center mt-10">
              <figure className="w-[100px] h-[100px] rounded-full">
                <img
                  src={userData.photo}
                  alt="User Image"
                  className="w-full h-full rounded-full"
                />
              </figure>
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
                {userData.name}
              </h3>
              <p className="text-headingColor text-[15px] leading-6 font-medium">
                {userData.email}
              </p>
              <p className="text-headingColor text-[15px] leading-6 font-medium">
                Blood Type:
                <span className="ml-2 text-headingColor text-[20px] leading-8">
                  {userData.bloodType}
                </span>
              </p>
            </div>

            <div className="mt-[50px] md:mt-[100px]">
              <button
                onClick={() => setTab("bookings")}
                className={`${
                  tab === "bookings" && " bg-gray-800 text-white rounded-lg py-2 font-normal"
                } w-full px-1 mb-5 text-headingColor font-semibold text-[16px] leading-7 border-b border-headingColor`}
              >
                My Bookings
              </button>
              <button
                onClick={() => setTab("settings")}
                className={`${
                  tab === "settings" && " bg-gray-800 text-white rounded-lg py-2 font-normal"
                } w-full px-1 mb-5 text-headingColor font-semibold text-[16px] leading-7 border-b border- border-headingColor`}
              >
                Profile
              </button>
              <button className="w-full bg-red-600 mt-20 p-3 text-[16px] leading-7 rounded-md text-white">
                Delete Account
              </button>
            </div>
          </div>

          <div className="md:col-span-2 md:px-[30px]">
            {tab === "bookings" && <MyBookings />}
            {tab === "settings" && <Profile user={userData} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAccount;
