import { TextField } from "@material-ui/core";
import React, { useContext, useState } from "react";
import globalContext from "../context/global/globalContext";
import Participant from "./Participant";

const OrderForm = ({ tailwindCSS }) => {
  const { order } = useContext(globalContext);
  console.log("🚀 ~ file: OrderForm.js ~ line 8 ~ OrderForm ~ order", order);

  return (
    <form className={` ${tailwindCSS}`}>
      <h3 className="text-themeColor text-3xl font-bold">Email:</h3>
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        type="email"
        name="email"
      />
      <h3 className="text-themeColor text-3xl font-bold">Deltagere:</h3>
      <p>{order?.participants[0]?.room_description}</p>

      <ul className="mt-4 p-2 space-y-3 ">
        {order?.participants.map((item, index) => (
          <Participant key={index} participant={item} personCount={index} />
        ))}
      </ul>
    </form>
  );
};

export default OrderForm;
