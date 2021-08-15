import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import OrderAccountHolderForm from "../components/OrderAccountHolderForm";
import OrderTotal from "../components/OrderTotal";
import globalContext from "../context/global/globalContext";

const OrderAccountHolder = () => {
  const history = useHistory();
  const { order } = useContext(globalContext);

  //   useEffect(() => {
  //     if (order === null) {
  //       history.replace("/");
  //     }
  //   }, []);

  return (
    <>
      <div className="grid grid-cols-12">
        <OrderAccountHolderForm tailwindCSS="col-span-8 pr-6" />
        <OrderTotal order={order && order} tailwindCSS="col-span-4" />
      </div>
      {/* <pre>{JSON.stringify(order, null, 2)}</pre> */}
    </>
  );
};

export default OrderAccountHolder;
