import signupImg from "../assets/images/signup.gif";
import avatar from "../assets/images/doctor-img01.png";
import { Link } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: selectedFile,
    gender: "",
    role: "patient",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.file[0];

    console.log(file);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
  };

  return (
    <section className="px-5 py-20 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 gap-28 lg:grid-cols-2">
          <div className="hidden rounded-l-lg lg:block bg-primaryColor">
            <figure className="rounded-l-lg">
              <img
                className="w-full rounded-l-lg"
                src={signupImg}
                alt="signup Img"
              />
            </figure>
          </div>

          <div className="py-10 rounded-l-lg lg:pl-16">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Create an <span className="text-primaryColor">account</span>
            </h3>

            <form onSubmit={submitHandler}>
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Enter Your Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] 
                    focus:outline-none focus:border-b-primaryColor text-[16px] leading-7
                    text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
                />
              </div>
              <div className="mb-5">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] 
                    focus:outline-none focus:border-b-primaryColor text-[16px] leading-7
                    text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
                />
              </div>
              <div className="mb-5">
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] 
                    focus:outline-none focus:border-b-primaryColor text-[16px] leading-7
                    text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between mb-5">
                <label className="text-headingColor font-bold text-[16px] leading-7">
                  Are you a:
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                  >
                    <option value="doctor">Doctor</option>
                    <option value="patient">Patient</option>
                  </select>
                </label>

                <label className="text-headingColor font-bold text-[16px] leading-7">
                  Gender:
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>

              <div className="flex items-center gap-3 mb-5">
                <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-between">
                  <img
                    src={avatar}
                    alt="avatar"
                    className="w-full rounded-full"
                  />
                </figure>
                <div className="relative w-[130px] h-[50px]">
                  <input
                    type="file"
                    name="photo"
                    id="customFile"
                    onChange={handleFileInputChange}
                    accept=".jpg .png"
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
              </div>
              <div className="mt-7">
                <button
                  className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-4"
                  type="submit"
                >
                  Register
                </button>
              </div>

              <p className="mt-5 text-center text-textColor">
                Already have an account?
                <Link
                  to="/login"
                  className="ml-1 font-medium text-primaryColor"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
