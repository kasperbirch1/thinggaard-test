import React, { useContext } from "react";
import globalContext from "../context/global/globalContext";

const OrderTotal = ({ tailwindCSS }) => {
  const { currentTrip, order, participantsData } = useContext(globalContext);
  let extraPrice=0;
  let totalPrice=order? order.booking_amount : 0;

  participantsData.map((participant, participantKey) => {
    order.participants.map((orderParticipant, orderParticipantKey) => {
      if(participantKey===orderParticipant.participant_id)
      {
        orderParticipant.services.map((orderParticipantService, orderParticipantServiceKey) => {
          if(orderParticipantService.service_price_id===participant[orderParticipantService.service_group_id])
          {
            extraPrice=extraPrice+parseFloat(orderParticipantService.service_price);
            console.log(extraPrice);
          }
        })
      }
    });
  });
  return (
    <div className={`rounded bg-gray-100 shadow ${tailwindCSS}`}>
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
      />
      <div className={`p-4`}>
        <div className="border-b border-black pb-4">
          <h2 className="text-3xl">
            {currentTrip?.post.post_title}
            {", "}
            <span className="text-base">{currentTrip?.destination_name}</span>
          </h2>

          <p className="text-sm">{order?.participants[0]?.room_description}</p>
        </div>
        <div className="flex justify-between">
          <p className="m-0">Uge</p>
          <p className="m-0">{currentTrip?.weekno}</p>
        </div>
        <div className="flex justify-between">
          <p className="m-0">Tjek ind</p>
          <p className="m-0">{order?.departure_date}</p>
        </div>
        <div className="flex justify-between">
          <p className="m-0">Tjek ud</p>
          <p className="m-0">{order?.return_date}</p>
        </div>
        <div className="flex justify-between">
          <p className="m-0">Rejselængde</p>
          <p className="m-0">{currentTrip?.travel_length}</p>
        </div>
        <div className="flex justify-between">
          <p className="m-0">Transport</p>
          <p className="m-0">{currentTrip?.transport_name}</p>
        </div>
        <div className="md:flex md:justify-between md:items-center border-black border-t pt-4">
          <h2 className="font-bold text-2xl">Totalpris</h2>
          <h3 className="font-semibold">DKK {totalPrice+extraPrice}</h3>
        </div>
      </div>
    </div>
  );
};

export default OrderTotal;
