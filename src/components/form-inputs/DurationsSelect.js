import React, { useContext } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { useStyles } from "../../styles";
import globalContext from "../../context/global/globalContext";
import { SET_CURRENT_DURATION } from "../../context/types";

const DurationsSelect = () => {
  const classes = useStyles();
  const { durations, currentDuration, dispatch } = useContext(globalContext);

  return (
    <FormControl variant="outlined" className="col-span-1 pr-2">
      <InputLabel id="DurationsSelect">Rejselængde</InputLabel>
      <Select
        id="DurationsSelect"
        value={currentDuration}
        label="DurationsSelect"
        className="mr-2"
        onChange={(e) => {
          dispatch({
            type: SET_CURRENT_DURATION,
            payload: e.target.value,
          });
        }}
      >
        <MenuItem disabled selected value>
          -- Vælg rejselængde --
        </MenuItem>
        {durations?.map((duration, index) => (
          <MenuItem key={index} value={duration.days}>
            {duration.days} dage
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DurationsSelect;
