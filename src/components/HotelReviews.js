import React from "react";
import { HeartIcon } from "@heroicons/react/solid";

const HotelReviews = ({ rating }) => {
  return (
    <>
      <div className="flex justify-center">
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <HeartIcon key={i} className="h-5 text-red-500" />
            ))}

          <span className="block ml-2" href="/">
            3,5 / 5,0
          </span>
        </div>
      </div>
      <a className="block text-center" href="/">
        Læs gæstevurderinger
      </a>
    </>
  );
};

export default HotelReviews;
