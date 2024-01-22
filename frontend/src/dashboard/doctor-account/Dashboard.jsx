import {useState, useContext} from 'react'
import Loading from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';
import { authContext } from '../../context/authContext';

import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";

import Reviews from "./Reviews";
import Profile from "./Profile";
import Qualifications from './Qualifications'
import Experiences from './Experiences'
import TimeSlots from './TimeSlots'

const Dashboard = () => {

  const { dispatch } = useContext(authContext);
  const [tab, setTab] = useState("reviews");

  const {
    data: userData,
    loading,
    error,
  } = useGetProfile(`${BASE_URL}/doctors/profile/me`);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="px-2 mx-auto mt-10 max-w-max">
      {loading && <Loading />}
      {error && <Error errMessage={error} />}
      {!loading && !error && (
        <div className="grid gap-10 md:grid-cols-3">
          <div className="pb-[50px] px-[30px] rounded-md bg-primaryColor">
            <div className="flex items-center justify-center mt-10">
              <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid">
                <img
                  src={userData.photo}
                  alt="User Image"
                  className="w-full h-full rounded-full"
                />
              </figure>
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-[18px] leading-[30px] text-white font-bold">
                {userData.name}
              </h3>
              <p className="text-white text-[15px] leading-6 font-medium">
                {userData.email}
              </p>
              <p className="text-white text-[15px] leading-6 font-medium">
                Phone No:
                <span className="ml-2 text-white text-[20px] leading-8">
                  {userData.phone}
                </span>
              </p>
            </div>

            <div className="mt-[50px] md:mt-[100px]">
              <button
                onClick={handleLogout}
                className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white"
              >
                Logout
              </button>
              <button className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white">
                Delete Account
              </button>
            </div>
          </div>

          <div className="md:col-span-2 md:px-[30px]">
            <div className="flex items-center gap-7">
              <button
                onClick={() => setTab("reviews")}
                className={`${
                  tab === "reviews" && "bg-primaryColor text-white font-normal"
                } py-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
              >
                Reviews
              </button>
              <button
                onClick={() => setTab("settings")}
                className={`${
                  tab === "settings" && "bg-primaryColor text-white font-normal"
                } py-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
              >
                Profile Settings
              </button>
              <button
                onClick={() => setTab("qualifications")}
                className={`${
                  tab === "qualifications" && "bg-primaryColor text-white font-normal"
                } py-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
              >
                Qualifications
              </button>
              <button
                onClick={() => setTab("experiences")}
                className={`${
                  tab === "experiences" && "bg-primaryColor text-white font-normal"
                } py-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
              >
                Experiences
              </button>
              <button
                onClick={() => setTab("timeSlots")}
                className={`${
                  tab === "timeSlots" && "bg-primaryColor text-white font-normal"
                } py-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
              >
                Time Slots
              </button>
            </div>

            {tab === "reviews" && <Reviews />}
            {tab === "settings" && <Profile doctor={userData} />}
            {tab === "qualifications" && <Qualifications />}
            {tab === "experiences" && <Experiences />}
            {tab === "timeSlots" && <TimeSlots />}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard