import { useState } from "react";
import FeedbackForm from "./FeedbackForm";

import avatar from "../../assets/images/avatar-icon.png";
import { formateDate } from "../../utils/formatDate";
import { AiFillStar } from "react-icons/ai";

const Feedback = ({ doctor }) => {
  const { reviews } = doctor;

  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  return (
    <div>
      <div className="mb-[50px]">
        <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]">
          All reviews ({doctor.totalRating})
        </h4>

        <div className="">
          {reviews.map((review, key) => {
            return (
              <div key={key} className="flex items-center justify-between">
                <div className="flex justify-between gap-10 mb-[30px]">
                  <div className="flex gap-3">
                    <figure className="w-10 h-10 rounded-full">
                      <img
                        className="w-full"
                        src={review?.user?.photo}
                        alt="avatar"
                      />
                    </figure>

                    <div>
                      <h5 className="text-[16px] leading-6 text-primaryColor font-bold">
                        {review?.user?.name}
                      </h5>
                      <p className="text-[14px] leading-6 text-textColor">
                        {formateDate(`${review?.createdAt}`)}
                      </p>
                      <p className="txt__para mt-3 font-medium text-[15px]">
                        {review?.reviewText}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-1">
                  {[...Array(5).fill()].map((_, index) => (
                    <AiFillStar  key={index} color="#0067FF" />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {!showFeedbackForm && (
        <div className="text-center">
          <button className="btn" onClick={() => setShowFeedbackForm(true)}>
            Give Feedback
          </button>
        </div>
      )}

      {showFeedbackForm && <FeedbackForm />}
    </div>
  );
};

export default Feedback;
