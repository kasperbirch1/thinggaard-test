import axios from "axios";
import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { useStyles } from "../styles";

const DurationsSelect = ({ destinationId, onChange, value }) => {
  const classes = useStyles();

  const [durations, setDurations] = useState(null);

  useEffect(() => {
    if (!destinationId) {
      return;
    }
    const fetch = async () => {
      try {
        const token = await axios.get(
          "https://thinggaard.dk/wp-json/thinggaard/v1/authentication"
        );

        if (token?.data?.result?.auth_token) {
          const { data } = await axios.get(
            `https://thinggaard.dk/wp-json/thinggaard/v1/durations?destination_id=${destinationId}&token=${token?.data?.result?.auth_token}`
          );
          setDurations(data.result);
        }
      } catch (error) {}
    };
    fetch();
  }, [destinationId]);
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="DurationsSelect">DurationsSelect</InputLabel>
      <Select
        id="DurationsSelect"
        value={value}
        label="DurationsSelect"
        onChange={(e) => {
          onChange(e.target.value);
        }}
      >
        <MenuItem disabled selected value>
          -- select an option --
        </MenuItem>
        {durations?.map((duration) => (
          <MenuItem value={duration.days}>{duration.days}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DurationsSelect;
