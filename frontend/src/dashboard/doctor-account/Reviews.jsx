import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";

import Error from "../../components/Error/Error";
import Loading from "../../components/Loader/Loading";

import ReviewList from "./Reviews/ReviewList";

const Reviews = () => {
  const {
    data: reviews,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors/reviews/my-reviews`);

  reviews.map((review) => {
    console.log(review);
  });

  return (
    <div>
      <div className="mt-5"></div>
      {loading && !error && <Loading />}
      {error && !loading && <Error errMessage={error} />}
      {!loading && !error && (
        <div className="">
          <div className="flex items-center justify-center gap-10 m-5 border-b-2 text-[#333333]">
            <h2>Review Text</h2>
            <h2>|</h2>
            <h2>Rating</h2>
          </div>
          <div className="h-[400px] overflow-y-scroll">
          {reviews.map((review) => (
            <ReviewList review={review} key={review.id} />
          ))}
          </div>
        </div>
      )}
      {!loading && !error && reviews.length === 0 && (
        <h2 className="mt-5 p-5 text-center rounded-md leading-7 text-[22px] font-semibold text-white bg-primaryColor">
          You do not have any review jet!
        </h2>
      )}
    </div>
  );
};

export default Reviews;
