import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import OrderForm from "../components/OrderForm";
import OrderTotal from "../components/OrderTotal";
import globalContext from "../context/global/globalContext";

const Order = () => {
  const history = useHistory();
  const { order } = useContext(globalContext);

  //   useEffect(() => {
  //     if (order === null) {
  //       history.replace("/");
  //     }
  //   }, []);

  return (
    <>
      {order && (
        <div className="grid grid-cols-12">
          <OrderForm tailwindCSS="col-span-8 pr-6" />
          <OrderTotal order={order && order} tailwindCSS="col-span-4" />
        </div>
      )}
      {/* <pre>{JSON.stringify(order, null, 2)}</pre> */}
    </>
  );
};

export default Order;
