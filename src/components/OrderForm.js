import { Button, TextField } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import globalContext from "../context/global/globalContext";
import { useStyles } from "../styles";
import Participant from "./Participant";

const OrderForm = ({ tailwindCSS }) => {
  const classes = useStyles();
  const history = useHistory();
  const { order, participantsdata } = useContext(globalContext);

  return (
    <div className={` ${tailwindCSS}`}>
      <h2 className="bg-gray-100 p-4 text-4xl text text-center font-bold text-themeColor mb-4 rounded shadow">
        Deltagere
      </h2>
      <form className="">
        <div className="p-4 border border-solid rounded border-gray-400">
          <h2 className="font-semibold text-sm mb-4">Email for bestiller</h2>
          <TextField
            fullWidth
            id="email"
            label="Email"
            variant="outlined"
            type="email"
            name="email"
          />
        </div>
        <ul>
          {order?.participants.map((item, index) => (
            <Participant key={index} participant={item} personCount={index} />
          ))}
        </ul>
      </form>
      <div className="flex justify-between">
        <Button
          onClick={() => {
            history.goBack();
          }}
          variant="outlined"
        >
          Tilbage
        </Button>
        <Button
          onClick={() => {
            history.push("orderdetails");
          }}
          color="primary"
          variant="contained"
        >
          Fortsæt
        </Button>
      </div>
    </div>
  );
};

export default OrderForm;
