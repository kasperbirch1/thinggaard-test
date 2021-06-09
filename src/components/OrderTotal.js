import React, { useContext } from "react";
import globalContext from "../context/global/globalContext";

const OrderTotal = ({ tailwindCSS }) => {
  const { currentTrip } = useContext(globalContext);
  console.log(
    "🚀 ~ file: OrderTotal.js ~ line 6 ~ OrderTotal ~ currentTrip",
    currentTrip
  );

  return (
    <div className={`rounded bg-gray-200 shadow ${tailwindCSS}`}>
      <div className="bg-themeColor rounded-t px-4 py-6">
        <h2 className="font-bold text-white text-center tracking-widest">
          DIN REJSE
        </h2>
      </div>
      <div
        className={`bg-cover bg-center h-40 md:h-48`}
        style={{
          backgroundImage: `url(${currentTrip?.post?.images?.full[0]})`,
        }}
      ></div>
      <div className={`p-4`}>
        <div className="border-b border-black pb-4">
          <h2 className="text-3xl">Garni Peter</h2>
          <h3 className="">Canazei, Italien</h3>
        </div>
        <div className="flex justify-between">
          <p className="m-0">Indkvartering</p>
          <p className="m-0">test</p>
        </div>
        <div className="flex justify-between">
          <p className="m-0">Personer</p>
          <p className="m-0">test</p>
        </div>
        <div className="flex justify-between">
          <p className="m-0">Uge</p>
          <p className="m-0">test</p>
        </div>
        <div className="flex justify-between">
          <p className="m-0">Tjek ind</p>
          <p className="m-0">test</p>
        </div>
        <div className="flex justify-between">
          <p className="m-0">Tjek ud</p>
          <p className="m-0">test</p>
        </div>
        <div className="flex justify-between">
          <p className="m-0">Rejselængde</p>
          <p className="m-0">test</p>
        </div>
        <div className="flex justify-between">
          <p className="m-0">Transport</p>
          <p className="m-0">test</p>
        </div>
        <div className="md:flex md:justify-between md:items-center border-black border-t pt-4">
          <h2 className="font-bold text-2xl">Totalpris</h2>
          <h3 className="font-semibold">DKK 12.296,-</h3>
        </div>
      </div>
    </div>
  );
};

export default OrderTotal;
