import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import CarouselComponent from "../components/CarouselComponent";
import HotelRating from "../components/HotelRating";
import HotelReviews from "../components/HotelReviews";
import globalContext from "../context/global/globalContext";

const Details = () => {
  let { currentAccomodationCode, currentPeriodId } = useParams();
  const { currentTrip, fetchCombinations, currentCombinations } =
    useContext(globalContext);

  const {
    destination_name,
    return_date,
    travel_length,
    room_description,
    minimum_price,
    post,
    accomodation_code,
    period_id,
  } = currentTrip;

  useEffect(() => {
    if (currentAccomodationCode && currentPeriodId) {
      let source = axios.CancelToken.source();
      fetchCombinations(source, currentAccomodationCode, currentPeriodId);
      return () => {
        source.cancel();
      };
    }
  }, []);

  return (
    <>
      <div className="relative">
        <CarouselComponent images={post.meta.gallery_settings} DetailsPage />
        <div className="absolute top-4 right-10 h-32 w-32 rounded-full bg-themeColor grid place-content-center text-center text-sm">
          BOOK TIDLIG 2.000,
        </div>

        <div className="p-4 bg-gray-100 md:absolute md:right-10 md:bottom-24 md:rounded text-center md:text-left">
          <div className="font-black line-through	">
            DKK <span className="">{minimum_price}-</span>
          </div>
          <div className="font-black">
            DKK <span className="">{minimum_price}-</span>
          </div>
          <div className="">Vælg værelser og bestil</div>
        </div>
      </div>

      <div className="p-3">
        <h2 className="mb-2 text-themeColor font-semibold text-xl">
          {post?.post_title},
          <span className="ml-2 text-gray-500 font-normal text-sm">
            {destination_name}
          </span>
        </h2>
        <p>{room_description}</p>
        <HotelRating />
        <HotelReviews />

        <div className="my-4 md:flex">
          {post?.meta?.hotel_beskrivelse && (
            <div
              className="hotel_beskrivelse md:w-8/12 md:pr-3"
              dangerouslySetInnerHTML={{
                __html: post?.meta?.hotel_beskrivelse,
              }}
            />
          )}
          {post?.meta?.hotel_fakta && (
            <div
              className="mt-4 md:my-0 hotel_fakta md:w-4/12 bg-gray-100 p-2 shadow"
              dangerouslySetInnerHTML={{
                __html: post?.meta?.hotel_fakta,
              }}
            />
          )}
        </div>

        {currentCombinations && (
          <div className="mb-4 md:my-0 bg-gray-100 p-2 shadow">
            <table class="table-fixed w-full">
              <thead>
                <tr className="text-left text-sm md:text-base">
                  <th class="py-1 pr-1 w-6/12 md:w-8/12">Værelser</th>
                  <th class="py-1 pr-1 w-4/12 md:w-2/12">Rejseinfo</th>
                  <th class="py-1 pr-1 w-2/12 md:w-2/12 text-center">pris</th>
                </tr>
              </thead>
              <tbody>
                {currentCombinations.map((combination) => (
                  <tr
                    onClick={() => alert(combination.rooms.rooms_description)}
                    className="text-sm cursor-pointer"
                  >
                    <td className="py-1 pr-1">
                      {combination.rooms.rooms_description}
                    </td>
                    <td className="py-1 pr-1 ">
                      {combination.transport_code_name} <br />
                      {combination.current_week.departure_date}
                      <br />
                      {combination.current_week.display_days} dage
                    </td>
                    <td className="py-1 pr-1 text-center font-semibold">
                      {combination.current_week.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {post?.meta?.hotel_beliggenhed && (
          <div
            className="hotel_beliggenhed"
            dangerouslySetInnerHTML={{
              __html: post?.meta?.hotel_beliggenhed,
            }}
          ></div>
        )}
      </div>
    </>
  );
};

export default Details;

//https://thinggaard.dk/wp-json/thinggaard/v1/trips/combinations?destination_id=SBA&ages=30,30&duration=4&date=Sat%20Jan%2001%202022%2016:38:00%20GMT+0100%20(Central%20European%20Standard%20Time)&transport=0&token=eyJhbGciOiJIUzI1NiJ9.eyJkYXRhYmFzZV9jcmVkZW50aWFscyI6eyJjb21wYW55X2lkIjoyLCJkYXRhYmFzZV9uYW1lIjoiVFJWMDA0X1RISU5HR0FBUkQifSwiZXhwIjoxNjIxNzgwNzI3fQ.ecV_wPrRjhgcpa0Sfg2yjPwiGiU7aFA1Ln-EDBLDo4w&accomodation_code=PEE&period_id=2225
