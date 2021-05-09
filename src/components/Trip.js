import React from "react";

const Trip = ({ trip }) => {
  const {
    destination_name,
    return_date,
    travel_length,
    room_description,
    minimum_price,
    post,
  } = trip;

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: " 1fr 2fr",
          margin: "1.5rem 1rem",
        }}
      >
        <div>
          <h2>{destination_name}</h2>
          <p>{room_description}</p>
          <span>{`Pris: ${minimum_price} kr.`}</span>
          <p>Rejselængde: {travel_length}</p>
          <p>Hjemrejse: {return_date}</p>
        </div>
        {post?.images && (
          <div
            style={{
              height: "auto",
              width: "100%",
              backgroundImage: `url(${post.images.full[0]})`,
              backgroundPosition: "center",
            }}
          />
        )}
      </div>
      <pre>{JSON.stringify(trip, null, 2)}</pre>
    </>
  );
};

export default Trip;
