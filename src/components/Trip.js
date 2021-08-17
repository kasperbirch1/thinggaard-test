// import { Link } from "react-router-dom";
import React, { useContext } from "react";
import parse from "html-react-parser";
import CarouselComponent from "./CarouselComponent";
import HotelMetaComponent from "./HotelMetaComponent";
import { SET_CURRENT_TRIP } from "../context/types";
import globalContext from "../context/global/globalContext";
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

  var formatter = new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
  });

  return (
    <div className="relative mt-4 mb-8 booking-container p-4 border border-solid border-1 border-gray-300 rounded">
      <div className="grid md:grid-cols-12 grid-cols-1">
        <div className="col-span-5 pr-6">
          {post?.meta?.gallery_settings && (
            <CarouselComponent images={post.meta.gallery_settings} />
          )}
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
              <h2 className="py-2 m-0 font-bold text-center">{`Pris fra ${formatter.format(
                minimum_price
              )}`}</h2>
            </div>
          </div>
          <div className="text-xs font-bold">{room_description}</div>
          {post?.snippet && (
            <div className="hotel_beskrivelse--reduceret text-sm mb-4">
              {parse(post?.snippet)}...
            </div>
          )}

          {post?.meta && <HotelMetaComponent post={post} />}

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
                Se Hotel & Priser
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
