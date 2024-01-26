import { useEffect, useState } from "react";

import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import HashLoader from "react-spinners/HashLoader.js";

import { useNavigate } from "react-router-dom";
import { BASE_URL, token } from "../../config.js";
import { toast } from "react-toastify";

const Profile = ({ doctor }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    number: "",
    ticketPrice: "",
    bio: "",
    about: "",
    photo: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      name: doctor.name,
      email: doctor.email,
      password: doctor.password,
      specialization: doctor.specialization,
      phone: doctor.phone,
      ticketPrice: doctor.ticketPrice,
      bio: doctor.bio,
      about: doctor.about,
      photo: doctor.photo,
    });
  }, [doctor]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      [e.target.password]: e.target.value,
      [e.target.phone]: e.target.value,
      [e.target.tickedPrice]: e.target.value,
    });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];

    const data = await uploadImageToCloudinary(file);

    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/doctors/${doctor._id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      setLoading(false);
      toast.success(message);
      navigate("/doctors/profile/me");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="py-10 ">
      <form onSubmit={submitHandler} className="mx-auto">
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-400 peer"
            />
            <label
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
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
              rows={1}
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
              rows={1}
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
              {selectedFile ? selectedFile.name : "Upload Photo"}
            </label>
          </div>
          <div className="flex justify-end">
            <a
              className="
               w-50 bg-[#0066ff46] cursor-pointer text-headingColor font-semibold text-[15px] leading-5 rounded-lg px-4 py-4"
            >
              New password
            </a>
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
