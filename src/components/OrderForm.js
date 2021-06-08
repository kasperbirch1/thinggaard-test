import { TextField } from "@material-ui/core";
import React, { useContext, useState } from "react";
import globalContext from "../context/global/globalContext";
import Participant from "./Participant";

const OrderForm = ({ tailwindCSS }) => {
  const { order } = useContext(globalContext);

  return (
    <form className={` ${tailwindCSS}`}>
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        type="email"
        name="email"
      />
      <h3> Personer:</h3>
      <p>
        Dobbeltværelse med bad/toilet og balkon (2 pers.) - mulighed for 1
        ekstra opredning
      </p>

      <ul className="mt-4 flex flex-col space-y-3">
        {order?.participants.map((item, index) => (
          <Participant key={index} participant={item} />
        ))}
      </ul>
    </form>
  );
};

export default OrderForm;
