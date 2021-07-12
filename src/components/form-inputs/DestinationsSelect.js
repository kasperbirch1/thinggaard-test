import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import React, { useContext } from "react";
import globalContext from "../../context/global/globalContext";
import { SET_CURRENT_DESTINATION } from "../../context/types";
import { useStyles } from "../../styles";

const DestinationsSelect = () => {
  const classes = useStyles();
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
        <MenuItem disabled selected value>
          -- Vælg et rejsemål --
        </MenuItem>
        {destinations?.map((item) => {
          return (
            <MenuItem key={item.id} value={item}>
              {item.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default DestinationsSelect;
