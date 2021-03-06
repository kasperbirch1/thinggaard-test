import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import OrderConfirmationForm from "../components/OrderConfirmationForm";
import OrderTotal from "../components/OrderTotal";
import globalContext from "../context/global/globalContext";

const OrderConfirmation = () => {
  const { order } = useContext(globalContext);

  return (
    <div className="grid grid-cols-12">
      <OrderConfirmationForm tailwindCSS="col-span-8 pr-6" />
      <OrderTotal order={order && order} tailwindCSS="col-span-4" />
    </div>
  );
};

export default OrderConfirmation;
