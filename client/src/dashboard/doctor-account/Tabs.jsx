import { BiMenu } from "react-icons/bi";

const Tabs = ({ tab, setTab }) => {
  return (
    <div>
      <span className="lg:hidden">
        <BiMenu className="w-6 h-6 cursor-pointer" />
      </span>
      <div className="hidden lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md">
        <button
          onClick={() => setTab("overview")}
          className={`${
            tab === "overview"
              ? "bg-indigo-100 text-primaryColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          Overview
        </button>
        <button
          onClick={() => setTab("settings")}
          className={`${
            tab === "settings"
              ? "bg-indigo-100 text-primaryColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          Profile Settings
        </button>
        <button
          onClick={() => setTab("reviews")}
          className={`${
            tab === "reviews"
              ? "bg-indigo-100 text-primaryColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          Reviews
        </button>
        <button
          onClick={() => setTab("qualifications")}
          className={`${
            tab === "qualifications"
              ? "bg-indigo-100 text-primaryColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          Qualifications
        </button>
        <button
          onClick={() => setTab("experiences")}
          className={`${
            tab === "experiences"
              ? "bg-indigo-100 text-primaryColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          Experiences
        </button>
        <button
          onClick={() => setTab("timeSlots")}
          className={`${
            tab === "timeSlots"
              ? "bg-indigo-100 text-primaryColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          TimeSlots
        </button>
        <button
          onClick={() => setTab("appointments")}
          className={`${
            tab === "appointments"
              ? "bg-indigo-100 text-primaryColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          Appointments
        </button>
        <button className="w-full bg-red-600 mt-20 p-3 text-[16px] leading-7 rounded-md text-white">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Tabs;
