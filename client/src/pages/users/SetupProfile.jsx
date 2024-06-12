import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, headers } from "../../config";
import { toast } from "react-toastify";

import axios from "axios";

import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import useFetchData from "../../hooks/useFetchData";

import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

const SetupProfile = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();

  const {
    data: userData,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/users/profile`);

  const [formData, setFormData] = useState({
    photo: null,
    address: "",
    city: "",
    country: "",
    phoneNumber: "",
    gender: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];

    const data = await uploadImageToCloudinary(file);

    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
  };

  const handleSetupProfile = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `${BASE_URL}/users/${userData.data._id}`,
        formData,
        headers
      );

      const { message } = await response.data;
      localStorage.setItem("role", "patient");
      toast.success(message);
      navigate("/patient/profile/me");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container">
      {loading && <Loading />}
      {error && <Error errMessage={error} />}
      {!loading && !error && (
        <div className="p-4 mb-10 shadow-lg rounded-2xl">
          <h2 className="text-headingColor font-bold text-[24px] leading-9">
            Profile Overview
          </h2>
          <div className="flex items-center gap-4">
            <div>
              <h3 className="text-[20px] leading-9 font-bold text-headingColor mt-3">
                {userData?.data?.name} {userData?.data?.surname}
              </h3>
              <p className="text-[#525252] font-[14px] lg:max-w-[390px] leading-6">
                {userData?.data?.email}
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="rounded-lg shadow-2xl lg:w-full p-7">
        <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-5">
          Setup Profile
        </h2>
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
            Setting up profile you agree to be patient of MediCare Services. If
            not, you can only view our website.
          </div>
        </div>
        <form className="form" onSubmit={handleSetupProfile}>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="address"
                placeholder="Your address"
                className="form__input"
                onChange={handleInputChange}
              />
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="city"
                placeholder="Your city"
                className="form__input"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="country"
                placeholder="Your country"
                className="form__input"
                onChange={handleInputChange}
              />
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="number"
                name="phoneNumber"
                placeholder="Your phone number"
                className="form__input"
                min={0}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <select
                name="gender"
                className="form__input"
                onChange={handleInputChange}
              >
                <option value="">Select your gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <div className="flex items-center gap-3 mb-5">
                {formData.photo && (
                  <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid flex items-center justify-between">
                    <img
                      src={formData.photo}
                      alt="avatar"
                      className="w-full h-full rounded-full"
                    />
                  </figure>
                )}
                <div className="relative w-[130px] h-[60px]">
                  <input
                    type="file"
                    name="photo"
                    id="customFile"
                    onChange={handleFileInputChange}
                    accept=".png"
                    className="absolute top-0 left-0 w-full opacity-0 cursor-pointer"
                  />
                  <label
                    htmlFor="customFile"
                    className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] 
                        text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
                  >
                    {selectedFile ? "Change Photo" : "Upload Photo"}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full m-auto">
            <button
              className="w-60 bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-4"
              type="submit"
            >
              Setup Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetupProfile;
