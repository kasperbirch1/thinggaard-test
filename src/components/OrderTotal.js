import React, { useContext, useEffect } from "react";
import globalContext from "../context/global/globalContext";

const OrderTotal = ({ tailwindCSS }) => {
  const { currentTrip, order, participantsData } = useContext(globalContext);
  let extraPrice = 0;
  let totalPrice = order ? order.booking_amount : 0;

  var formatter = new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
  });

  participantsData.map((participant, participantKey) => {
    for (const [participantServiceKey, participantService] of Object.entries(
      participant.services
    )) {
      var serviceItem = JSON.parse(participantService.item);

      if (serviceItem) {
        extraPrice = extraPrice + parseFloat(serviceItem.cost);
      }
    }
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
          backgroundImage: `url(${currentTrip?.post?.images?.full[0]})`,
        }}
      />
      <div className={`p-4`}>
        <div className="pb-4">
          <h2 className="font-bold text-xl">
            {currentTrip?.post.post_title}
            {", "}
            <span>{currentTrip?.destination_name}</span>
          </h2>

          <p className="text-xs m-0">
            {order?.participants[0]?.room_description}
          </p>
        </div>
        <div className="order-total-items border-b border-t border-gray-400 py-4">
          <div className="flex justify-between my-1 text-sm">
            <p className="m-0 font-semibold">Uge</p>
            <p className="m-0">{currentTrip?.weekno}</p>
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
            <p className="m-0">{currentTrip?.travel_length} dage</p>
          </div>
          <div className="flex justify-between my-1 text-sm">
            <p className="m-0 font-semibold">Transport</p>
            <p className="m-0">{currentTrip?.transport_name}</p>
          </div>
        </div>
        <div className="md:flex md:justify-between md:items-center pt-4">
          <h2 className="font-bold">Totalpris</h2>
          <h2 className="font-bold">
            {formatter.format(totalPrice + extraPrice)}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default OrderTotal;
