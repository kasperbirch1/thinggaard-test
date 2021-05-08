import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import format from "date-fns/format";
import { useStyles } from "../styles";

const DatesSelect = ({ destinationId, onChange, value }) => {
  const classes = useStyles();
  const [dates, setDates] = useState([new Date()]);

  const daylist = dates?.map((date) => date.date);

  const renderDayInPicker = (
    date,
    selectedDate,
    dayInCurrentMonth,
    dayComponent
  ) => {
    if (daylist.includes(format(date, "yyyy-MM-dd"))) {
      return <div style={{ backgroundColor: "green" }}>{dayComponent}</div>;
    }
    return dayComponent;
  };

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
            `https://thinggaard.dk/wp-json/thinggaard/v1/dates?destination_id=${destinationId}&token=${token?.data?.result?.auth_token}`
          );
          setDates(data.result);
        }
      } catch (error) {}
    };
    fetch();
  }, [destinationId]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        className={classes.formControl}
        clearable
        value={value}
        label="Vælg dato"
        onChange={(date) => onChange(date)}
        minDate={new Date()}
        format="MM/dd/yyyy"
        renderDay={renderDayInPicker}
        inputVariant="outlined"
        variant="dialog"
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatesSelect;
