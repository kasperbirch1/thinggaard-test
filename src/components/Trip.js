// import { Link } from "react-router-dom";
import React, { useContext } from "react";
import CarouselComponent from "./CarouselComponent";
import HotelMetaComponent from "./HotelMetaComponent";
import HotelPreviewComponent from "./HotelPreviewComponent";
import { SET_CURRENT_TRIP } from "../context/types";
import globalContext from "../context/global/globalContext";
import { Button } from "@material-ui/core";
import format from "date-fns/format";
import da from "date-fns/locale/da";
import ScheduleOutlinedIcon from "@material-ui/icons/ScheduleOutlined";
import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForwardOutlined";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";

const Trip = ({ trip }) => {
  const { dispatch } = useContext(globalContext);
  const {
    destination_name,
    departure_date,
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
    <div className="relative mt-8 mb-8 p-4 border border-solid border-1 border-gray-300 rounded bg-gray-50">
      <div className="grid md:grid-cols-12 grid-cols-1">
        <div className="col-span-5 pr-6">
          {post?.meta?.gallery_settings && (
            <CarouselComponent
              className="border-4 border-white shadow rounded"
              images={post.meta.gallery_settings}
            />
          )}
        </div>
        <div className="col-span-7">
          {post && destination_name && room_description && minimum_price && (
            <HotelPreviewComponent
              post={post}
              destination_name={destination_name}
              room_description={room_description}
              minimum_price={minimum_price}
            />
          )}

          {post?.meta && <HotelMetaComponent post={post} />}

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-7 text-sm">
              <div className="grid grid-cols-12 m-0">
                <div className="col-span-5 font-semibold text-gray-600 uppercase">
                  <ScheduleOutlinedIcon
                    variant="outlined"
                    style={{ fontSize: 15 }}
                    className="text-xs mr-2 text-gray-800"
                  />
                  Rejselængde
                </div>
                <div className="col-span-7 text-gray-800 font-bold">
                  {travel_length} dage
                </div>
              </div>
              <div className="grid grid-cols-12 m-0">
                <div className="col-span-5 font-semibold text-gray-600 uppercase">
                  <ArrowForwardOutlinedIcon
                    variant="outlined"
                    style={{ fontSize: 15 }}
                    className="text-xs mr-2 text-gray-800"
                  />
                  Afrejse:
                </div>
                <div className="col-span-7 capitalize text-gray-800 font-bold">
                  {format(new Date(departure_date), "eeee, d MMMM yyyy", {
                    locale: da,
                  })}
                </div>
              </div>
              <div className="grid grid-cols-12 m-0">
                <div className="col-span-5 font-semibold uppercase text-gray-600">
                  <ArrowBackOutlinedIcon
                    variant="outlined"
                    style={{ fontSize: 15 }}
                    className="text-xs mr-2 text-gray-800"
                  />
                  Hjemrejse:
                </div>
                <div className="col-span-7 capitalize text-gray-800 font-bold">
                  {format(new Date(return_date), "eeee, d MMMM yyyy", {
                    locale: da,
                  })}
                </div>
              </div>
            </div>
            <div className="col-span-5 relative">
              <div className="absolute bottom-0 w-full">
                <Button
                  className="w-full"
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
      </div>
      {/* </Link> */}
    </div>
  );
};

export default Trip;

// <Link to="/hotel/details" className="p-4 flex flex-col space-y-6 "></Link>
