import React, { useContext, useState } from "react";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import format from "date-fns/format";
import { useStyles } from "../../styles";
import globalContext from "../../context/global/globalContext";
import { SET_CURRENT_DATE } from "../../context/types";

const DatesSelect = () => {
  const [pickerStatus, setPickerStatus] = useState(false);

  const classes = useStyles();
  const {
    destinations,
    currentDuration,
    currentTransport,
    dates,
    currentDate,
    dispatch,
  } = useContext(globalContext);

  const daylist = dates?.map((date) => date.date);

  // const renderDayInPicker = (
  //   date,
  //   selectedDate,
  //   dayInCurrentMonth,
  //   dayComponent
  // ) => {
  //   if (daylist.includes(format(date, "yyyy-MM-dd"))) {
  //     return <div style={{ backgroundColor: "green" }}>{dayComponent}</div>;
  //   }
  //   return dayComponent;
  // };

  const disableDays = (date) => {
    if (!daylist.includes(format(date, "yyyy-MM-dd"))) {
      return true;
    }
  };

  return (
    <div className="mr-2">
      <MuiPickersUtilsProvider className="col-span-1" utils={DateFnsUtils}>
        <KeyboardDatePicker
          disabled={
            destinations && currentTransport && currentDuration ? false : true
          }
          onClick={() => setPickerStatus(true)}
          onClose={() => setPickerStatus(false)}
          open={pickerStatus}
          disableToolbar
          shouldDisableDate={disableDays}
          clearable
          autoOk={true}
          animateYearScrolling={true}
          value={currentDate}
          label="Dato"
          onChange={(date) => {
            dispatch({
              type: SET_CURRENT_DATE,
              payload: date,
            });
          }}
          minDate={new Date()}
          format="dd/MM/yyyy"
          // renderDay={renderDayInPicker}
          inputVariant="outlined"
          variant="dialog"
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default DatesSelect;
