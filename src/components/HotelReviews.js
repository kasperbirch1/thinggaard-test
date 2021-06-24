import React from "react";
import { HeartIcon } from "@heroicons/react/solid";

const HotelReviews = ({ rating }) => {
  return (
    <>
      <div className="flex justify-center">
        <div className="flex">
          {Array(Math.round(rating))
            .fill()
            .map((_, i) => (
              <HeartIcon key={i} className="h-5 text-red-500" />
            ))}

          <span className="block ml-2" href="/">
            {rating} / 5,0
          </span>
        </div>
      </div>
    </>
  );
};

export default HotelReviews;
