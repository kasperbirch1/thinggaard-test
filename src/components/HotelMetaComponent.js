import React from "react";

import LocationCityOutlinedIcon from "@material-ui/icons/LocationCityOutlined";
import TrendingUpOutlinedIcon from "@material-ui/icons/TrendingUpOutlined";
import DirectionsBusOutlinedIcon from "@material-ui/icons/DirectionsBusOutlined";
import RestaurantOutlinedIcon from "@material-ui/icons/RestaurantOutlined";
import WifiOutlinedIcon from "@material-ui/icons/WifiOutlined";
import HotelOutlinedIcon from "@material-ui/icons/HotelOutlined";

const HotelMetaComponent = ({ post }) => {
  return (
    <div className="grid grid-cols-12 mb-4">
      <div className="col-span-8 grid grid-cols-12 mb-4">
        <div className="grid grid-cols-2 col-span-12 text-left">
          <div className="text-xs font-semibold">
            <LocationCityOutlinedIcon
              variant="outlined"
              style={{ fontSize: 18 }}
              className="text-xs mr-2"
            />
            Distance til centrum
          </div>
          <div className="text-xs">
            {post?.meta?.hotel_meta_distance_center}
          </div>
        </div>
        <div className="grid grid-cols-2 col-span-12 text-left">
          <div className="text-xs font-semibold">
            <TrendingUpOutlinedIcon
              variant="outlined"
              style={{ fontSize: 18 }}
              className="text-xs mr-2"
            />
            Distance til lift
          </div>
          <div className="text-xs">{post?.meta?.hotel_meta_distance_lift}</div>
        </div>
        <div className="grid grid-cols-2 col-span-12 text-left">
          <div className="text-xs font-semibold">
            <DirectionsBusOutlinedIcon
              variant="outlined"
              style={{ fontSize: 18 }}
              className="text-xs mr-2"
            />
            Distance til skibus
          </div>
          <div className="text-xs">
            {post?.meta?.hotel_meta_distance_skibus}
          </div>
        </div>
        <div className="grid grid-cols-2 col-span-12 text-left">
          <div className="text-xs font-semibold">
            <WifiOutlinedIcon
              variant="outlined"
              style={{ fontSize: 18 }}
              className="text-xs mr-2"
            />
            Internet
          </div>
          <div className="text-xs">{post?.meta?.hotel_meta_internet}</div>
        </div>
        <div className="grid grid-cols-2 col-span-12 text-left">
          <div className="text-xs font-semibold">
            <RestaurantOutlinedIcon
              variant="outlined"
              style={{ fontSize: 18 }}
              className="text-xs mr-2"
            />
            Pension
          </div>
          <div className="text-xs">{post?.meta?.hotel_meta_pension}</div>
        </div>
      </div>
      <div className="col-span-4 grid grid-cols-12 mb-4">
        <div className="col-span-12 text-left">
          <div className="text-xs font-semibold">
            <HotelOutlinedIcon
              variant="outlined"
              style={{ fontSize: 18 }}
              className="text-xs mr-2"
            />
            Prisen inkluderer
          </div>
          <div className="text-xs">
            {post?.meta?.hotel_meta_options &&
              post.meta.hotel_meta_options.map((option, index) => (
                <div key={index} className="text-xs">
                  {option.label}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelMetaComponent;
