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

        <div className="p-4 bg-gray-200 md:absolute md:right-10 md:bottom-24 md:rounded text-center md:text-left">
          <div className="font-black line-through	">
            DKK <span className="">{minimum_price}-</span>
          </div>
          <div className="font-black">
            DKK <span className="">{minimum_price}-</span>
          </div>
          <div className="">Vælg værelser og bestil</div>
        </div>
      </div>
      {currentCombinations && (
        <>
          <h2>Combinations:</h2>

          <table class="mx-2 table-fixed">
            <thead>
              <tr>
                <th class="w-1/4 ...">Værelser</th>
                <th class="w-1/4 ...">Varighed</th>
                <th class="w-1/4 ...">Dato</th>
                <th class="w-1/4 ...">transport</th>
                <th class="w-1/4 ...">pris</th>
              </tr>
            </thead>
            <tbody>
              {currentCombinations.map((combination) => (
                <tr className="">
                  <td className="py-2 text-center">
                    {combination.rooms.rooms_description}
                  </td>
                  <td className="py-2 text-center">
                    {combination.current_week.display_days}
                  </td>
                  <td className="py-2 text-center">
                    {combination.current_week.departure_date}
                  </td>
                  <td className="py-2 text-center">
                    {combination.transport_code_name}
                  </td>
                  <td className="py-2 text-center">
                    {combination.current_week.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
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

        <div className="my-4 pb-4 border-b  border-black md:flex">
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
              className="hotel_fakta md:w-4/12 bg-gray-200 p-4"
              dangerouslySetInnerHTML={{
                __html: post?.meta?.hotel_fakta,
              }}
            />
          )}
        </div>

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
