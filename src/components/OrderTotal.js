import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderTotal = ({ order, tailwindCSS }) => {
  const [hotel, setHotel] = useState(false);

  useEffect(() => {
    const getHotel = async () => {
      try {
        const { data } = await axios.get(
          `https://thinggaard.dk/wp-json/thinggaard/v1/hotel?accomodation_code=${order?.accomodation_code}`
        );
        setHotel(data.result);
      } catch (error) {
        console.log(error);
      }
    };

    if (order && !hotel) {
      getHotel();
    }
  }, [order, hotel]);

  var formatter = new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
  });

  return (
    <div
      className={`rounded bg-gray-100 border border-gray-200 ${tailwindCSS}`}
    >
      <div className="rounded-t px-4 py-4">
        <h2 className="font-bold text-gray-800 text-center tracking-widest">
          DIN REJSE
        </h2>
      </div>
      <div
        className={`mx-4 bg-cover bg-center h-36`}
        style={{
          backgroundImage: `url(${hotel?.images?.full[0]})`,
        }}
      />
      <div className={`p-4`}>
        <div className="pb-4">
          <h2 className="font-bold text-xl">{hotel?.post_title}</h2>

          <p className="text-xs m-0">
            {order?.participants[0]?.room_description}
          </p>
        </div>
        <div className="order-total-items border-b border-t border-gray-400 py-4">
          <div className="flex justify-between my-1 text-sm">
            <p className="m-0 font-semibold">Uge</p>
            <p className="m-0">{order?.week_no}</p>
          </div>
          <div className="flex justify-between my-1 text-sm">
            <p className="m-0 font-semibold">Tjek ind</p>
            <p className="m-0">{order?.departure_date}</p>
          </div>
          <div className="flex justify-between my-1 text-sm">
            <p className="m-0 font-semibold">Tjek ud</p>
            <p className="m-0">{order?.return_date}</p>
          </div>
          <div className="flex justify-between my-1 text-sm">
            <p className="m-0 font-semibold">Rejselængde</p>
            <p className="m-0">{order?.travel_length} dage</p>
          </div>
          <div className="flex justify-between my-1 text-sm">
            <p className="m-0 font-semibold">Transport</p>
            <p className="m-0">{order?.transport_name}</p>
          </div>
        </div>
        <div className="md:flex md:justify-between md:items-center pt-4">
          <h2 className="font-bold">Totalpris</h2>
          <h2 className="font-bold">{formatter.format(order?.total_amount)}</h2>
        </div>
      </div>
    </div>
  );
};

export default OrderTotal;
