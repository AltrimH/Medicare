import { useState } from "react";

import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";

import useFetchData from "../../hooks/useFetchData";

import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

const Experiences = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    doctor: user._id,
    hospital: "",
    location: "",
  });

  const {
    data: experiences,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors/experiences/my-experience`);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/experiences/add-experience`, {
        method: "post",
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
      setShowModal(false);
      toast.success(message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="py-0">
      <div className="relative overflow-x-auto rounded-lg">
        {loading && !error && <Loading />}
        {error && !loading && <Error errMessage={error} />}
        <table
          className={`${
            loading && "hidden"
          } w-full text-sm text-left border-2 text-headingColor rtl:text-right`}
        >
          <thead className="text-xs uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Date From - To
              </th>
              <th scope="col" className="px-6 py-3">
                Hospital
              </th>
              <th scope="col" className="px-6 py-3">
                Location
              </th>
            </tr>
          </thead>
          <tbody className="">
            {experiences.map((experience) => (
              <tr key={experience.id} className="border-b text-headingColor">
                <th
                  scope="row"
                  className="px-6 py-4 font-normal whitespace-nowrap"
                >
                  Start Date - End Date || Present
                </th>
                <td className="px-6 py-4 font-normal whitespace-nowrap">
                  {experience.hospital}
                </td>
                <td className="px-6 py-4 font-normal whitespace-nowrap">
                  {experience.location}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="my-5 text-right">
        <button
          className={`${
            loading && "hidden"
          } w-[200px] bg-primaryColor text-white text-[16px] leading-7 rounded-lg px-4 py-2`}
          type="submit"
          onClick={() => setShowModal(true)}
        >
          Add Experience
        </button>
        {showModal ? (
          <>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-hidden outline-none focus:outline-none">
              <form
                onSubmit={submitHandler}
                className="relative w-full max-w-4xl mx-auto my-6"
              >
                {/* <div className="relative w-full max-w-4xl mx-auto my-6"> */}
                {/*content*/}
                <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 font-normal border-b border-solid rounded-t text-headingColor border-blueGray-200">
                    <h3 className="text-3xl font-semibold">Experience data</h3>
                    <button
                      className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none opacity-5 focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="flex flex-auto flex-grow p-6">
                    <form
                      className="w-full max-w-3xl mx-auto justify-evenly"
                      action=""
                    >
                      <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="flex mb-5">
                          <input
                            type="text"
                            name="hospital"
                            placeholder="Hospital*"
                            value={formData.hospital}
                            onChange={handleInputChange}
                            required
                            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-400 peer"
                          />
                        </div>
                        <div className="flex mb-5">
                          <input
                            type="text"
                            name="location"
                            placeholder="Location*"
                            value={formData.location}
                            onChange={handleInputChange}
                            required
                            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-400 peer"
                          />
                        </div>
                      </div>
                      {/* <div className="grid md:grid-cols-2 md:gap-6">
                      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                      </div> */}
                    </form>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                    <button
                      className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                      type="submit"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
                {/* </div> */}
              </form>
            </div>
            <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Experiences;
