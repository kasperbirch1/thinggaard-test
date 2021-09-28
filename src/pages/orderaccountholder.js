import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import OrderAccountHolderForm from "../components/OrderAccountHolderForm";
import OrderTotal from "../components/OrderTotal";
import globalContext from "../context/global/globalContext";

const OrderAccountHolder = () => {
  const { order } = useContext(globalContext);

  return (
    <>
      <div className="grid grid-cols-12">
        <OrderAccountHolderForm tailwindCSS="col-span-8 pr-6" />
        <OrderTotal order={order && order} tailwindCSS="col-span-4" />
      </div>
    </>
  );
};

export default OrderAccountHolder;
