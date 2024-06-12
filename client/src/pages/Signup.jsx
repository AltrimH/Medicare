import signupImg from "../assets/images/signup.gif";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { BASE_URL } from "../config";

const Signup = () => {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleFileInputChange = async (event) => {
  //   const file = event.target.files[0];

  //   const data = await uploadImageToCloudinary(file);

  //   setPreviewURL(data.url);
  //   setSelectedFile(data.url);
  //   setFormData({ ...formData, photo: data.url });
  // };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      setLoading(false);
      toast.success(message);
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
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
                alt="Registered Image"
              />
            </figure>
          </div>

          <div className="py-10 rounded-l-lg lg:pl-16">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Create an <span className="text-primaryColor">account</span>
            </h3>

            <form onSubmit={submitHandler}>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="mb-5">
                  <input
                    type="text"
                    placeholder="First Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] 
                    focus:outline-none focus:border-b-primaryColor text-[16px] leading-7
                    text-headingColor placeholder:text-textColor rounded-md"
                  />
                </div>
                <div className="mb-5">
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] 
                    focus:outline-none focus:border-b-primaryColor text-[16px] leading-7
                    text-headingColor placeholder:text-textColor rounded-md"
                  />
                </div>
              </div>
              <div className="mb-5">
                <input
                  type="email"
                  placeholder="Email"
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
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] 
                    focus:outline-none focus:border-b-primaryColor text-[16px] leading-7
                    text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
                />
              </div>
              <div className="mt-7">
                <button
                  disabled={loading && true}
                  className="w-full bg-primaryColor text-white text-[20px] leading-[20px] rounded-lg px-4 py-4"
                  type="submit"
                >
                  {loading ? <HashLoader size={35} color="#fff" /> : "Register"}
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
