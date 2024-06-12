import startIcon from "../../../assets/images/Star.png";

const ReviewList = ({ review }) => {
  const { user, reviewText, rating } = review;

  return (
    <div className="w-full">
      <ul className="flex items-center justify-center w-full gap-10 divide-gray-200 dark:divide-gray-700 ">
        <li className="bg-[#d3d2d2] rounded-full justify-center w-full mb-3  ">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="flex-shrink-0">
              <img
                className="rounded-full h-14 w-14"
                src={user?.photo}
                alt="User image"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {reviewText}
              </p>
            </div>
            <div className="inline-flex items-center pr-5 text-base font-semibold text-headingColor">
              <span className="flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                <img src={startIcon} alt="star icon" /> {rating}
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ReviewList;
