import { useEffect, useRef, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { authContext } from "../../context/authContext";

import logo from "../../assets/images/logo.png";

import { BiMenu } from "react-icons/bi";

const navLinks = [
  {
    path: "/",
    display: "Home",
  },
  {
    path: "/doctors",
    display: "Doctors",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const { user, role, token } = useContext(authContext);

  // const headerRef = useRef(null);
  const menuRef = useRef(null);

  // const handleStickyHeader = () => {
  //   window.addEventListener("scroll", () => {
  //     if (
  //       document.body.scrollTop > 80 ||
  //       document.documentElement.scrollTop > 80
  //     ) {
  //       headerRef.current.classList.add("sticky__header");
  //     } else {
  //       headerRef.current.classList.remove("sticky__header");
  //     }
  //   });
  // };

  useEffect(() => {
    // handleStickyHeader();
    // return () => window.removeEventListener("scroll", handleStickyHeader);
  });

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  const { dispatch } = useContext(authContext);
  
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <header className="flex items-center header">
      <div className="container">
        <div className="flex items-center justify-between">
          {/*  logo */}
          <div>
            <NavLink to="/home">
              <img src={logo} alt="logo" />
            </NavLink>
          </div>

          {/*  menu */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* nav right */}
          <div className="flex items-center gap-4">
            {token && user ? (
              <div>
                <Link
                  className="flex items-center gap-4"
                  to={`${
                    role === "doctor"
                      ? "/doctors/profile/me"
                      : "/users/profile/me"
                  }`}
                >
                  <figure className="w-[45px] h-[45px] rounded-full">
                    <img
                      src={user?.photo}
                      alt="User Image"
                      className="w-full h-full rounded-full"
                    />
                  </figure>
                  <button
                    onClick={handleLogout}
                    className="w-24 bg-primaryColor hover:bg-[#181A1E] p-2 text-[14px] leading-7 rounded-md text-white"
                  >
                    Logout
                  </button>
                  {/* <h2>
                    {user?.name}
                  </h2> */}
                </Link>
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                  Login
                </button>
              </Link>
            )}
            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
