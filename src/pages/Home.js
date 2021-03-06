import { Button, FormControl, TextField } from "@material-ui/core";
import { scroller } from "react-scroll";
import { useEffect, useContext } from "react";
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

const Home = () => {
  const classes = useStyles();
  const {
    destinations,
    handleSubmit,
    currentDestination,
    currentDuration,
    currentTransport,
    currentDate,
    trips,
    currentTrip,
  } = useContext(globalContext);

  useEffect(() => {
    if (trips) {
      scroller.scrollTo("trips", {
        duration: 1200,
        offset: -350,
        delay: 0,
        smooth: "easeInOutQuart",
      });
    }
  }, [trips]);

  useEffect(() => {
    if (currentTrip) {
      scroller.scrollTo("trip-options", {
        duration: 1200,
        offset: -150,
        delay: 0,
        smooth: "easeInOutQuart",
      });
    }
  }, [currentTrip]);

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
                Vi kunne desv??rre ikke finde din rejse
              </p>
              <p className="italic">Tjek om din s??gning er korrekt</p>
              <p className="">
                Eller kontakt os p?? <a href="tel:70100010">70 10 00 10</a>
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
