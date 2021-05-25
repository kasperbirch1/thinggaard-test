import React from "react";
import { StarIcon } from "@heroicons/react/solid";

const HotelRating = ({ rating }) => {
  return (
    <div className="flex items-end">
      {Array(rating)
        .fill()
        .map((_, i) => (
          <StarIcon key={i} className="h-5 text-yellow-500" />
        ))}
    </div>
  );
};

export default HotelRating;
