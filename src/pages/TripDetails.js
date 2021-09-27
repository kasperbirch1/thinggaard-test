import { Button, FormControl, TextField } from "@material-ui/core";
import { scroll, scroller } from "react-scroll";
import { useEffect, useContext, useReducer } from "react";
import { useLocation } from "react-router-dom";
import globalContext from "../context/global/globalContext";
import DatesSelect from "../components/form-inputs/DatesSelect";
import DestinationsSelect from "../components/form-inputs/DestinationsSelect";
import DurationsSelect from "../components/form-inputs/DurationsSelect";
import TransportsSelect from "../components/form-inputs/TransportsSelect";
import Trip from "../components/Trip";
import { useStyles } from "../styles";
import Details from "../components/Details";
import AdultsSelect from "../components/form-inputs/AdultsSelect";
import ChildrenSelect from "../components/form-inputs/ChildrenSelect";
import axios from "axios";

import {
  SET_CURRENT_COMBINATIONS,
  SET_TRIPS,
  SET_CURRENT_TRIP,
} from "../context/types";

const TripDetails = () => {
  let query = new URLSearchParams(useLocation().search);

  const classes = useStyles();
  const {
    token,
    destinations,
    handleSubmit,
    adults,
    currentPeriodId,
    currentDestination,
    currentCombinations,
    currentDuration,
    currentTransport,
    currentDate,
    dispatch,
    trips,
    currentTrip,
  } = useContext(globalContext);

  const getCombinations = async () => {
    let travelDate = new Date(query.get("date")).getTime();

    try {
      const { data } = await axios.get(
        `https://thinggaard.dk/wp-json/thinggaard/v1/trips?destination_id=${query.get(
          "destination"
        )}&ages=30&duration=${query.get(
          "duration"
        )}&date=${travelDate}&transport=transport_${query.get(
          "transport"
        )}&token=${token}}`
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
        <div className={trips ? "trip-search-trips" : "trip-search-home"}>
          <div className="trip-search-form">
            <form
              onSubmit={handleSubmit}
              className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-7 justify-center"
            >
              <DestinationsSelect />
              <DurationsSelect />
              <TransportsSelect />
              <DatesSelect />
              <AdultsSelect />
              <ChildrenSelect />
              <FormControl className={classes.formControl}>
                <Button
                  disabled={
                    currentDestination &&
                    currentDuration &&
                    currentTransport &&
                    currentDate
                      ? false
                      : true
                  }
                  size="large"
                  color="primary"
                  type="submit"
                  variant="contained"
                  style={{ minHeight: "56px" }}
                >
                  Find Rejse
                </Button>
              </FormControl>
            </form>
          </div>

          {currentTrip && (
            <div id="trip">
              <Details />
            </div>
          )}

          {trips && (
            <div id="trips">
              {trips.map(
                (trip) =>
                  (!currentTrip ||
                    currentTrip.accomodation_code !==
                      trip.accomodation_code) && (
                    <Trip key={trip.accomodation_code} trip={trip} />
                  )
              )}
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
