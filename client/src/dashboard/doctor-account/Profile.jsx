/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import uploadImageToCloudinary from "../../utils/uploadCloudinary";

import { BASE_URL, token } from "../../config.js";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader.js";

const Profile = ({ doctorData }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    bio: "",
    gender: "",
    specialization: "",
    ticketPrice: 0,
    qualifications: [],
    experiences: [],
    timeSlots: [],
    about: "",
    photo: null,
  });

  useEffect(() => {
    setFormData({
      name: doctorData.name,
      email: doctorData.email,
      password: doctorData.password,
      phone: doctorData.phone,
      bio: doctorData.bio,
      gender: doctorData.gender,
      specialization: doctorData.specialization,
      ticketPrice: doctorData.ticketPrice,
      qualifications: doctorData.qualifications,
      experiences: doctorData.experiences,
      timeSlots: doctorData.timeSlots,
      about: doctorData.about,
      photo: doctorData.photo,
    });
  }, [doctorData]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);

    setFormData({ ...formData, photo: data?.url });
    setSelectedFile(data?.url);
  };

  // reusable function for adding  item
  // const addItem = (key, item) => {
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [key]: [...prevFormData[key], item],
  //   }));
  // };

  // reusable function for deleting item
  // const deleteItem = (key, index) => {
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [key]: prevFormData[key].filter((_, i) => i !== index),
  //   }));
  // };

  // reusable input change function
  // const handleReusableInputChangeFunc = (key, index, event) => {
  //   const { name, value } = event.target;

  //   setFormData((prevFormData) => {
  //     const updateItems = [...prevFormData[key]];
  //     updateItems[index][name] = value;

  //     return {
  //       ...prevFormData,
  //       [key]: updateItems,
  //     };
  //   });
  // };

  // Qualification
  // const addQualification = (e) => {
  //   e.preventDefault();

  //   addItem("qualifications", {
  //     startingDate: "",
  //     endingDate: "",
  //     degree: "",
  //     university: "",
  //     location: "",
  //   });
  // };

  // const handleQualificationChange = (event, index) => {
  //   handleReusableInputChangeFunc("qualifications", index, event);
  // };

  // const deleteQualification = (e, index) => {
  //   e.preventDefault();
  //   deleteItem("qualifications", index);
  // };

  // Experience
  // const addExperience = (e) => {
  //   e.preventDefault();

  //   addItem("experiences", {
  //     startingDate: "",
  //     endingDate: "",
  //     position: "",
  //     hospital: "",
  //     location: "",
  //   });
  // };

  // const handleExperienceChange = (event, index) => {
  //   handleReusableInputChangeFunc("experiences", index, event);
  // };

  // const deleteExperience = (e, index) => {
  //   e.preventDefault();
  //   deleteItem("experiences", index);
  // };

  // Time Slots
  // const addTimeSlots = (e) => {
  //   e.preventDefault();

  //   addItem("timeSlots", {
  //     day: "",
  //     startingTime: "",
  //     endingTime: "",
  //   });
  // };

  // const handleTimeSlotsChange = (event, index) => {
  //   handleReusableInputChangeFunc("timeSlots", index, event);
  // };

  // const deleteTimeSlots = (e, index) => {
  //   e.preventDefault();
  //   deleteItem("timeSlots", index);
  // };

  // update doctor profile
  const updateProfileHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      toast.success(result.message);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={updateProfileHandler}
        className="mx-auto rounded-lg shadow-lg px-7 pb-7"
      >
        <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
          Profile Information
        </h2>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-400 peer"
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Full name
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-400 peer"
              readOnly
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Email address
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-400 peer"
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Specialization
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              pattern="[0-9]{3}[0-9]{3}[0-9]{3}"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-400 peer"
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Phone number (04*-***-***)
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              min={0}
              name="ticketPrice"
              value={formData.ticketPrice}
              onChange={handleInputChange}
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-400 peer"
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Ticket Price (Ex. $200)
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <textarea
              rows={5}
              maxLength={500}
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-400 peer"
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Bio
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <textarea
              rows={5}
              maxLength={500}
              name="about"
              value={formData.about}
              onChange={handleInputChange}
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-400 peer"
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              About
            </label>
          </div>
          <div className="flex items-center gap-3 mb-5">
            {selectedFile && (
              <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid flex items-center justify-between">
                <img
                  src={selectedFile}
                  alt="avatar"
                  className="w-full h-full rounded-full"
                />
              </figure>
            )}
            <div className="relative w-[130px] h-[50px]">
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
                Upload Photo
              </label>
            </div>
            {/* <div className="float-right">
              <a
                className="w-full h-full flex items-end px-[0.75rem] py-[0.375rem]
                text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
              >
                New password
              </a>
            </div> */}
          </div>
        </div>
        <div className="mt-7">
          <button
            disabled={loading && true}
            className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-4"
            type="submit"
          >
            {loading ? <HashLoader size={25} color="#fff" /> : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
