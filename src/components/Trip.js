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
    <div className="relative mt-4 mb-8 booking-container p-4 border border-solid border-1 border-gray-300 rounded">
      <div className="grid grid-cols-12">
        <div className="col-span-5 pr-6">
          <CarouselComponent images={post.meta.gallery_settings} />
        </div>
        <div className="col-span-7">
          <div className="grid grid-cols-12 mb-2">
            <div className="col-span-8">
              <h2 className="py-2 mb-0 font-semibold text-xl">
                {post?.post_title},
                <span className="ml-2 text-gray-500 font-normal">
                  {destination_name}
                </span>
              </h2>
            </div>
            <div className="col-span-4 border">
              <h2 className="py-2 m-0 font-bold text-center">{`Pris fra ${minimum_price} kr.`}</h2>
            </div>
          </div>

          <div className="text-xs font-bold">{room_description}</div>

          {post?.meta?.hotel_beskrivelse && (
            <div
              className="hotel_beskrivelse--reduceret"
              dangerouslySetInnerHTML={{
                __html: post?.meta?.hotel_beskrivelse,
              }}
            ></div>
          )}

          <div className="grid grid-cols-12">
            <div className="col-span-6 text-sm">
              <div className="grid grid-cols-12 m-0">
                <div className="col-span-6 font-semibold">Rejselængde:</div>
                <div className="col-span-6">{travel_length} dage</div>
              </div>
              <div className="grid grid-cols-12 m-0">
                <div className="col-span-6 font-semibold">Hjemrejse:</div>
                <div className="col-span-6">{return_date}</div>
              </div>
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
