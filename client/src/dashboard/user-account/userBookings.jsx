import DoctorCard from "./../../components/Doctors/DoctorCard";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";

const UserBooking = () => {
  const {
    data: appointments,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/patients/appointments/me`);

  return (
    <div>
      <div className="mt-5"></div>
      {loading && !error && <Loading />}
      {error && !loading && <Error errMessage={error} />}
      {!loading && !error && (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {Array.isArray(appointments) ? appointments.map((doctor) => (
            <DoctorCard doctor={doctor} key={doctor._id} />
          )) : []}
        </div>
      )}
      {!loading && !error && appointments.length === 0 && (
        <h2 className="mt-5 p-5 text-center rounded-md leading-7 text-[22px] font-semibold text-white bg-primaryColor">
          You did not book any appointments
        </h2>
      )}
    </div>
  );
};

export default UserBooking;
