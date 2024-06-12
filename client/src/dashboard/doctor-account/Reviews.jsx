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

  return (
    <div>
      {loading && !error && <Loading />}
      {error && !loading && <Error errMessage={error} />}
      {!loading && !error && reviews.length > 0 && (
        <div className="rounded-lg shadow-2xl p-7">
          <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
            Review Info
          </h2>
          <div className="h-[440px] overflow-y-auto">
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
