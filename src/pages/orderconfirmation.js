import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import OrderConfirmationForm from "../components/OrderConfirmationForm";
import OrderTotal from "../components/OrderTotal";
import globalContext from "../context/global/globalContext";

const OrderConfirmation = () => {
  const history = useHistory();
  const { order } = useContext(globalContext);

  return (
    <>
      <div className="booking-container p-4 rounded grid grid-cols-12">
        <OrderConfirmationForm tailwindCSS="col-span-8 pr-6" />
        <OrderTotal tailwindCSS="col-span-4" />
      </div>
      {/* <pre>{JSON.stringify(order, null, 2)}</pre> */}
    </>
  );
};

export default OrderConfirmation;
