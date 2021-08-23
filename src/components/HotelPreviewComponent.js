import React from "react";
import HotelOutlinedIcon from "@material-ui/icons/HotelOutlined";
import parse from "html-react-parser";
import CarouselComponent from "./CarouselComponent";

const HotelPreviewComponent = ({
  post,
  destination_name,
  room_description,
  minimum_price,
}) => {
  var formatter = new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
  });
  return (
    <>
      <div className="grid grid-cols-12 mb-2">
        <div className="col-span-8">
          <h2 className="font-semibold text-2xl leading-tight">
            {post?.post_title},
            <span className="ml-2 text-gray-500 font-normal">
              {destination_name}
            </span>
          </h2>
          <div
            style={{ color: "#0e6c56" }}
            className="uppercase text-xs leading-none inline font-semibold"
          >
            <HotelOutlinedIcon
              variant="outlined"
              style={{ fontSize: 22 }}
              className="align-bottom mr-2 text-gray-400"
            />
            <span className="mt-1 align-middle leading-none">
              {room_description}
            </span>
          </div>
        </div>
        <div className="col-span-4">
          <h2 className="py-2 m-0 font-bold text-center border bg-white">
            <span className="align-middle text-gray-600 font-semibold">
              Pris fra
            </span>{" "}
            {`${formatter.format(minimum_price)}`}
          </h2>
        </div>
      </div>
      {post?.snippet && (
        <div className="hotel_beskrivelse--reduceret text-sm mb-4">
          {parse(post?.snippet)}...
        </div>
      )}
    </>
  );
};
export default HotelPreviewComponent;
