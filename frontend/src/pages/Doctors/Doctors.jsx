import DoctorCard from "../../components/Doctors/DoctorCard";
import useFetchData from "../../hooks/useFetchData.js";

import { BASE_URL } from "../../config.js";
import Error from "../../components/Error/Error.jsx";
import Loading from "../../components/Loader/Loading.jsx";

// import { doctors } from "../../assets/data/doctors.js";

import Testimonial from "../../components/Testimonial/Testimonial";
import { useLocation } from "react-router-dom";

const Doctors = () => {

  const location = useLocation()
  location.pathname

  console.log(location)

  const {
    data: doctors,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors/`);

  return (
    <>
      <section className="bg-[#fff9ea] py-20">
        <div className="container text-center">
          <h2 className="heading">Find a Doctor</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input
              type="search"
              className="w-full py-4 pl-4 pr-2 bg-transparent cursor-pointer focus:outline-none placeholder:text-textColor"
              placeholder="Search Doctors"
            />
            <button className="btn mt-0 rounded-[0px] rounded-r-md">
              Search
            </button>
          </div>
        </div>
      </section>

      {loading && !error && <Loading />}
      {error && !loading && <Error errMessage={error} />}
      {!loading && !error && (
        <section className="py-20">
          <div className="container">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} location={location} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-10">
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="text-center heading">What our patients say</h2>
            <p className="text-center text__para">
              World-class care for everyone. Our health System offers unmatched,
              expert health care.
            </p>
          </div>

          <Testimonial />
        </div>
      </section>
    </>
  );
};

export default Doctors;
