import DoctorCard from "./DoctorCard";

import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";

import Error from "../../components/Error/Error";
import Loading from "../../components/Loader/Loading";

const DoctorList = ({location}) => {

  const {
    data: doctors,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors`);

  doctors.map((doctor) => {
    console.log(doctor);
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
      {loading && !error && <Loading />}
      {error && !loading && <Error errMessage={error} />}
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} location={location} />
      ))}
    </div>
  );
};

export default DoctorList;
