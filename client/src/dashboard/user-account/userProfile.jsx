import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

import uploadImageToCloudinary from "../../utils/uploadCloudinary.js";

import { BASE_URL, headers } from "../../config.js";
import { toast } from "react-toastify";

import HashLoader from "react-spinners/HashLoader";
import axios from "axios";

const UserProfile = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    address: "",
    city: "",
    country: "",
    phoneNumber: "",
    gender: "",
    photo: null,
  });


  useEffect(() => {
    setFormData({
      name: user.name,
      surname: user.surname,
      address: user.address,
      city: user.city,
      country: user.country,
      phoneNumber: user.phoneNumber,
      photo: user.photo,
      gender: user.gender,
    });
  }, [user]);

  const handleInputChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
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
      const response = await axios.put(
        `${BASE_URL}/users/${user._id}`,
        formData,
        headers
      );

      if (!response) {
        toast.error(response.data.message);
      }
      setLoading(false);
      window.location.reload()
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="mt-5">
      <form onSubmit={submitHandler}>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="mb-5">
            <label className="form__label">First name</label>
            <input
              type="text"
              placeholder="Soon to fix..."
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form__input"
            />
          </div>
          <div className="mb-5">
            <label className="form__label">Last name</label>
            <input
              type="text"
              placeholder="Last name"
              name="surname"
              value={formData.surname}
              onChange={handleInputChange}
              className="form__input"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-1 md:gap-6">
          <div className="mb-5">
            <label className="form__label">Address</label>
            <input
              type="text"
              placeholder="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="form__input"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="mb-5">
            <label className="form__label">City</label>
            <input
              type="text"
              placeholder="City"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="form__input"
            />
          </div>
          <div className="mb-5">
            <label className="form__label">Country</label>
            <input
              type="text"
              placeholder="Country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="form__input"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="mb-5">
            <label className="form__label">Phone Number</label>
            <input
              type="number"
              name="phoneNumber"
              className="form__input"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              min={0}
            />
          </div>
          <div className="mb-5">
            <label className="form__label">Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="form__input"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-5">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full flex items-center justify-between">
              <img
                src={formData.photo}
                alt="avatar"
                className="w-full rounded-full"
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
              {selectedFile ? selectedFile.name : "Change Photo"}
            </label>
          </div>
          {/* <div className="flex justify-end">
            <button
              className="
               w-50 bg-[#0066ff46] text-headingColor font-semibold text-[15px] leading-[1.2] rounded-lg px-4 py-4"
              type="submit"
            >
              New password
            </button>
          </div> */}
        </div>
        <div className="mt-7">
          <button
            disabled={loading && true}
            className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-4"
            type="submit"
          >
            {loading ? <HashLoader size={25} color="#fff" /> : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
