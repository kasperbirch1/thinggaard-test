import { Button, Grid, TextField, useMediaQuery } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DatesSelect from "../components/DatesSelect";
import DestinationsSelect from "../components/DestinationsSelect";
import DurationsSelect from "../components/DurationsSelect";
import TransportsSelect from "../components/TransportsSelect";
import Trip from "../components/Trip";
import { useStyles } from "../styles";

const Home = () => {
  const classes = useStyles();
  const MinWidth600 = useMediaQuery("(max-width:600px)");
  const [apiAuthentication, setApiAuthentication] = useState(false);
  const [destinations, setDestinations] = useState(null);
  const [destinationId, setdestinationId] = useState(null);
  const [duration, setDuration] = useState("");
  const [ages, setAges] = useState("");
  const [transport, setTransport] = useState("");
  const [date, setDate] = useState(null);
  const [trips, setTrips] = useState(null);

  useEffect(() => {
    let source = axios.CancelToken.source();
    const getAuthentication = async () => {
      try {
        const { data } = await axios.get(
          "https://thinggaard.dk/wp-json/thinggaard/v1/authentication",
          {
            cancelToken: source.token,
          }
        );
        setApiAuthentication(data.result.auth_token);
      } catch (error) {
        console.log(error);
      }
    };
    getAuthentication();

    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    let source = axios.CancelToken.source();

    const fetchDestinations = async () => {
      if (apiAuthentication) {
        try {
          const { data } = await axios.get(
            `https://thinggaard.dk/wp-json/thinggaard/v1/destinations?token=${apiAuthentication}`,
            {
              cancelToken: source.token,
            }
          );
          setDestinations(data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchDestinations();

    return () => {
      source.cancel();
    };
  }, [apiAuthentication]);

  const handleSubmit = async (event) => {
    const countPersons = new Array(45);
    console.log(
      "🚀 ~ file: Home.js ~ line 72 ~ handleSubmit ~ countPersons",
      countPersons
    );
    event.preventDefault();
    try {
      const { data } = await axios.get(
        `https://thinggaard.dk/wp-json/thinggaard/v1/trips?destination_id=${destinationId.code}&ages=${ages}&duration=${duration}&date=${date}&transport=${transport}&token=${apiAuthentication}`
      );
      setTrips(data.result);
    } catch (error) {}
  };

  return (
    <>
      {destinations && (
        <Grid
          component="form"
          container
          spacing={MinWidth600 ? 0 : 1}
          style={{ paddingRight: "15px" }}
        >
          <Grid item xs={12} md={2}>
            <DestinationsSelect
              list={destinations.destinations}
              value={destinationId}
              onChange={setdestinationId}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <DurationsSelect
              apiAuthentication={apiAuthentication}
              destinationId={destinationId}
              value={duration}
              onChange={setDuration}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <DatesSelect
              apiAuthentication={apiAuthentication}
              destinationId={destinationId}
              value={date}
              onChange={setDate}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TransportsSelect
              destinationId={destinationId}
              duration={duration}
              apiAuthentication={apiAuthentication}
              value={transport}
              onChange={setTransport}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              label="antal voksne"
              type="number"
              variant="outlined"
              className={classes.formControl}
              value={ages}
              onChange={(e) => {
                setAges(e.target.value);
                // setAges(new Array(e.target.value));
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              onClick={handleSubmit}
            >
              fetchTrips
            </Button>
          </Grid>
        </Grid>
      )}

      {trips ? (
        <Link to="/hotel/details" className="p-4 flex flex-col space-y-6 ">
          {trips.map((trip) => (
            <Trip key={trip.accomodation_code} trip={trip} />
          ))}
        </Link>
      ) : (
        <>Ingen hotel fundet</>
      )}
    </>
  );
};

export default Home;
