import {
  FormControl,
  Typography,
  Button,
  Slider,
  InputLabel,
  TextField,
} from "@material-ui/core";
import React, { useContext } from "react";
import globalContext from "../../context/global/globalContext";
import { SET_ADULTS } from "../../context/types";
import { useStyles } from "../../styles";

const AdultsSelect = () => {
  const classes = useStyles();
  const { adults, dispatch } = useContext(globalContext);

  return (
    <>
      <FormControl variant="outlined" className="col-span-1">
        <div
          className="form-wrap mr-2"
          style={{
            padding: "0 10px",
            borderRadius: "5px",
            border: "1px solid #bbb",
            minHeight: "56px",
          }}
        >
          <Typography
            className="text-center text-gray-500"
            style={{ fontSize: 12 }}
            id="adults-slider-label"
            variant="body2"
          >
            Antal voksne
          </Typography>
          <div className="mb-1 grid grid-cols-3 justify-center">
            <div className="text-center col-span-1">
              <Button
                className="text-center"
                color="primary"
                disabled={adults > 1 ? false : true}
                style={{
                  borderRadius: "100%",
                  fontWeight: 900,
                  padding: 0,
                  minWidth: "16px",
                  width: "32px",
                  textAlign: "center",
                }}
                onClick={() => {
                  dispatch({
                    type: SET_ADULTS,
                    payload: adults - 1,
                  });
                }}
              >
                -
              </Button>
            </div>
            <span
              className="col-span-1"
              style={{ textAlign: "center", fontSize: "20px" }}
            >
              {adults}
            </span>
            <div className="text-center col-span-1">
              <Button
                disabled={adults < 10 ? false : true}
                className="text-center"
                style={{
                  borderRadius: "100%",
                  fontWeight: 900,
                  padding: 0,
                  minWidth: "16px",
                  width: "32px",
                  textAlign: "center",
                }}
                onClick={() => {
                  dispatch({
                    type: SET_ADULTS,
                    payload: adults + 1,
                  });
                }}
              >
                +
              </Button>
            </div>
          </div>
          {/*
          <TextField
            aria-labelledby="adults-slider-label"
            value={adults}
            valueLabelDisplay="off"
            onChange={(e, newvalue) => {
              dispatch({
                type: SET_ADULTS,
                payload: newvalue,
              });
            }}
          />
          */}
        </div>
      </FormControl>
    </>
  );
};

export default AdultsSelect;
