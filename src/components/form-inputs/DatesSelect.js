import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import format from "date-fns/format";
import da from "date-fns/locale/da";
import React, { useContext, useState } from "react";
import globalContext from "../../context/global/globalContext";
import { SET_CURRENT_DATE } from "../../context/types";
import { useStyles } from "../../styles";
import { shake } from "react-animations";
import Radium, { StyleRoot } from "radium";

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

  const renderDayInPicker = (
    date,
    selectedDate,
    dayInCurrentMonth,
    dayComponent
  ) => {
    for (var i = 0; i < currentDuration; i++) {
      let rangeDate = new Date(date);
      rangeDate.setDate(rangeDate.getDate() - i);
      if (daylist.includes(format(rangeDate, "yyyy-MM-dd"))) {
        return <div className="day-in-range">{dayComponent}</div>;
      }
    }
    return dayComponent;
  };

  const disableDays = (date) => {
    if (!daylist.includes(format(date, "yyyy-MM-dd"))) {
      return true;
    }
  };

  return (
    <StyleRoot>
      <div className="mr-2">
        <MuiPickersUtilsProvider
          className="col-span-1"
          utils={DateFnsUtils}
          locale={da}
        >
          <KeyboardDatePicker
            disabled={
              destinations && currentTransport && currentDuration ? false : true
            }
            onClick={() =>
              setPickerStatus(
                destinations && currentTransport && currentDuration
                  ? true
                  : false
              )
            }
            onClose={() => setPickerStatus(false)}
            open={pickerStatus}
            disableToolbar
            shouldDisableDate={disableDays}
            clearable={false}
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
            renderDay={renderDayInPicker}
            inputVariant="outlined"
            KeyboardButtonProps={{
              style: {
                marginLeft: "-8px",
                paddingLeft: "6px",
              },
            }}
            inputProps={{ style: { letterSpacing: "-0.2px" } }}
            variant="dialog"
          />
        </MuiPickersUtilsProvider>
      </div>
    </StyleRoot>
  );
};

export default DatesSelect;
