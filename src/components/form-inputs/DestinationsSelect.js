import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import React, { useContext } from "react";
import globalContext from "../../context/global/globalContext";
import { SET_CURRENT_DESTINATION } from "../../context/types";

const DestinationsSelect = () => {
  const { destinations, currentDestination, dispatch } =
    useContext(globalContext);

  return (
    <FormControl variant="outlined" className="col-span-1 pr-2">
      <InputLabel id="destinations">Rejsemål</InputLabel>
      <Select
        id="destinations"
        value={currentDestination}
        label="destinations"
        className="mr-2"
        onChange={(e) => {
          dispatch({
            type: SET_CURRENT_DESTINATION,
            payload: e.target.value,
          });
        }}
      >
        {destinations?.map((item) =>
          item.destinations.map((destination_item, destination_key) => (
            <MenuItem
              disabled={destination_item.type === "country" ? true : false}
              key={destination_key}
              value={destination_item}
              className={
                destination_item.type === "country" ? "opacity-100" : ""
              }
              style={
                destination_item.type === "country"
                  ? {
                      opacity: "1.0",
                    }
                  : {}
              }
            >
              <span
                style={
                  destination_item.type === "country"
                    ? {
                        display: "inline-block",
                        width: "100%",
                      }
                    : {}
                }
                className={
                  destination_item.type === "country"
                    ? "border border-t-0 border-l-0 border-r-0 border-dashed border-gray-400 font-light text-gray-400 v-full"
                    : "font-regular"
                }
              >
                {destination_item.type == "country"
                  ? destination_item.translated
                    ? destination_item.translated
                    : destination_item.name
                  : destination_item.name}
              </span>
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  );
};

export default DestinationsSelect;
