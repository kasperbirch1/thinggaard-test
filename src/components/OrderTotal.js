import React, { useContext } from "react";

const OrderTotal = ({ tailwindCSS }) => {
  return (
    <div className={` ${tailwindCSS}`}>
      <div className={`p-2 bg-gray-200 rounded `}>
        <h2>DIN REJSE</h2>
        Indkvartering Personer Uge51 Tjek ind19-12-2021 Tjek ud26-12-2021
        Rejselængde7 Transport
      </div>
    </div>
  );
};

export default OrderTotal;
