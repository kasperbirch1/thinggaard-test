// import { Link } from "react-router-dom";
import React, { useContext } from "react";
import CarouselComponent from "./CarouselComponent";
import { SET_CURRENT_TRIP } from "../context/types";
import globalContext from "../context/global/globalContext";
import HotelRating from "./HotelRating";
import HotelReviews from "./HotelReviews";
import { Button } from "@material-ui/core";
// import format from "date-fns/format";

const Trip = ({ trip }) => {
  const { dispatch } = useContext(globalContext);
  const {
    destination_name,
    return_date,
    travel_length,
    room_description,
    minimum_price,
    post,
    // accomodation_code,
    // period_id,
  } = trip;

  if (!post) {
    return null;
  }

  return (
    <div className="relative my-4 booking-container p-4 border border-solid border-1 border-gray-300 rounded md:flex">
      <div className="grid grid-cols-12">
        <div className="col-span-5 pr-4">
          <CarouselComponent images={post.meta.gallery_settings} />
          {/* <Link
        to={`hotel/${accomodation_code}/${period_id}`}
        className="block md:w-7/12"
      > */}
        </div>
        <div className="col-span-8">
          <div className="grid grid-cols-12">
            <div className="col-span-8">
              <h2 className="mb-2 font-semibold text-xl">
                {post?.post_title},
                <span className="ml-2 text-gray-500 font-normal text-sm">
                  {destination_name}
                </span>
              </h2>
            </div>
            <div className="col-span-4">
              <p className="m-0 self-end text-red-500 font-black text-right">{`Pris: ${minimum_price} kr.`}</p>
            </div>
          </div>

          <p>{room_description}</p>

          {post?.meta?.hotel_beskrivelse && (
            <div
              className="hotel_beskrivelse--reduceret"
              dangerouslySetInnerHTML={{
                __html: post?.meta?.hotel_beskrivelse,
              }}
            ></div>
          )}

          <div className="grid grid-cols-12">
            <div className="col-span-6">
              <p className="m-0">Rejselængde: {travel_length}</p>
              <p className="m-0">Hjemrejse: {return_date}</p>
            </div>
            <div className="col-span-6 text-right">
              <Button
                color="primary"
                variant="contained"
                size="large"
                onClick={() => {
                  dispatch({
                    type: SET_CURRENT_TRIP,
                    payload: trip,
                  });
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Se {post?.post_title ? post.post_title : "hotel"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* </Link> */}
    </div>
  );
};

export default Trip;

// <Link to="/hotel/details" className="p-4 flex flex-col space-y-6 "></Link>
