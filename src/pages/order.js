import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import OrderForm from "../components/OrderForm";
import OrderTotal from "../components/OrderTotal";
import globalContext from "../context/global/globalContext";

const Order = () => {
  const { order } = useContext(globalContext);

  return (
    <>
      {order && (
        <div className="grid grid-cols-12">
          <OrderForm tailwindCSS="col-span-8 pr-6" />
          <OrderTotal order={order && order} tailwindCSS="col-span-4" />
        </div>
      )}
    </>
  );
};

export default Order;
