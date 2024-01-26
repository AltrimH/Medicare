import { formateDate } from "../../utils/formatDate";

const DoctorAbout = ({ doctor }) => {
  const { qualifications } = doctor;

  return (
    <div>
      <div>
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
          About of
          <span className="text-irisBlueColor font-bold text-[24px] leading-9">
            {doctor.name}
          </span>
        </h3>
        <p className="text__para">{doctor.about}</p>
      </div>

      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Education
        </h3>
        <ul className="pt-4 md:p-5">
          {qualifications ? qualifications.map((qualification, key) => {
            return (
              <li
                key={key}
                className=" bg-[#d4e7e7] p-4 rounded flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]"
              >
                <div>
                  <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
                    {formateDate("04-23-2010")} - {formateDate("10-06-2013")}
                  </span>
                  <p className="text-[16px] leading-6 font-medium text-textColor">
                    {qualification.degree} in {qualification.fieldStudy}
                  </p>
                </div>
                <p className="text-[14px] leading-5 font-medium text-textColor">
                  {qualification.school}
                </p>
              </li>
            );
          }) : null}

        </ul>
      </div>

      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Experience
        </h3>

        <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
          <li className="p-4 rounded bg-[#fff9ea]">
            <span className="text-yellowColor text-[15px] leading-6 font-semibold">
              {formateDate("04-23-2010")} - {formateDate("10-06-2013")}
            </span>
            <p className="text-[16px] leading-6 font-medium text-textColor">
              Sr. Surgeon
            </p>
            <p className="text-[14px] leading-5 font-medium text-textColor">
              New Hospital, Pejë, Kosovo
            </p>
          </li>
          <li className="p-4 rounded bg-[#fff9ea]">
            <span className="text-yellowColor text-[15px] leading-6 font-semibold">
              {formateDate("04-23-2010")} - {formateDate("10-06-2013")}
            </span>
            <p className="text-[16px] leading-6 font-medium text-textColor">
              Sr. Surgeon
            </p>
            <p className="text-[14px] leading-5 font-medium text-textColor">
              New Hospital, Pejë, Kosovo
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DoctorAbout;
