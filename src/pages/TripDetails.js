import { useEffect, useContext, useReducer } from "react";
import { useLocation } from "react-router-dom";
import globalContext from "../context/global/globalContext";
import Details from "../components/Details";
import axios from "axios";
import { PAX_DEFAULT_STRING } from "../constants";

import {
  SET_CURRENT_COMBINATIONS,
  SET_TRIPS,
  SET_CURRENT_TRIP,
} from "../context/types";

const TripDetails = () => {
  let query = new URLSearchParams(useLocation().search);

  const { token, destinations, dispatch, trips, currentTrip } =
    useContext(globalContext);

  const getCombinations = async () => {
    let travelDate = new Date(query.get("date")).getTime();
    let added_hours = 12 * 60 * 60 * 1000;

    travelDate = travelDate + added_hours;

    try {
      const { data } = await axios.get(
        `https://thinggaard.dk/wp-json/thinggaard/v1/trips?destination_id=${query.get(
          "destination"
        )}&ages=${PAX_DEFAULT_STRING}&duration=${query.get(
          "duration"
        )}&date=${travelDate}&transport=transport_${query.get(
          "transport"
        )}&period_id=${query.get("period")}&token=${token}}`
      );

      data.result.map(
        (trip) =>
          trip.accomodation_code === query.get("accommodation") &&
          dispatch({
            type: SET_CURRENT_TRIP,
            payload: trip,
          })
      );

      dispatch({
        type: SET_TRIPS,
        payload: data.result,
      });
    } catch (error) {}

    try {
      const { data } = await axios.get(
        `https://thinggaard.dk/wp-json/thinggaard/v1/trips/combinations?&ages=30&duration=${query.get(
          "duration"
        )}&date=${travelDate}&transport=transport_${query.get(
          "transport"
        )}&token=${token}&accomodation_code=${query.get(
          "accommodation"
        )}&period_id=${query.get("period")}`
      );

      dispatch({
        type: SET_CURRENT_COMBINATIONS,
        payload: data.result,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (token) {
      getCombinations();
    }
  }, [token]);

  return (
    <>
      {destinations && (
        <div className="trip-search-trips">
          {currentTrip && (
            <div id="trip">
              <Details singular={true} />
            </div>
          )}

          {trips === undefined && (
            <div className="m-4 p-3 text-center booking-container">
              <p className="font-bold">
                Vi kunne desværre ikke finde din rejse
              </p>
              <p className="italic">Tjek om din søgning er korrekt</p>
              <p className="">
                Eller kontakt os på <a href="tel:70100010">70 10 00 10</a>
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default TripDetails;
