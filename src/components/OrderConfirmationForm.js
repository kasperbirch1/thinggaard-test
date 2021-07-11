import React, { useContext, useState, useEffect } from "react";
import globalContext from "../context/global/globalContext";
import { useStyles } from "../styles";
import { useHistory } from "react-router-dom";

const OrderConfirmationForm = ({ tailwindCSS }) => {
  const classes = useStyles();
  const history = useHistory();
  const { order, customerData, dispatch } = useContext(globalContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={` ${tailwindCSS}`}>
      <h2 className="p-2 text-4xl text text-center font-bold mb-4">
        Bekræftelse
      </h2>
      <p className="text-center">
        Tak for din bestilling. Du vil modtage en email hurtigst muligt med
        yderligere information
      </p>
    </div>
  );
};

export default OrderConfirmationForm;
