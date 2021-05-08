import { Button, Grid, useMediaQuery } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import DatesSelect from "./components/DatesSelect";
import DestinationsSelect from "./components/DestinationsSelect";
import DurationsSelect from "./components/DurationsSelect";
import TransportsSelect from "./components/TransportsSelect";

const App = () => {
  const MinWidth600 = useMediaQuery("(max-width:600px)");
  const [destinations, setDestinations] = useState(null);
  const [destinationId, setdestinationId] = useState(null);
  const [duration, setDuration] = useState(null);
  const [ages, setAges] = useState("30,18");
  const [transport, setTransport] = useState("0");
  const [date, setDate] = useState(null);
  const [trips, setTrips] = useState(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const token = await axios.get(
          "https://thinggaard.dk/wp-json/thinggaard/v1/authentication"
        );

        if (token?.data?.result?.auth_token) {
          const { data } = await axios.get(
            `https://thinggaard.dk/wp-json/thinggaard/v1/destinations?token=${token?.data?.result?.auth_token}`
          );
          setDestinations(data);
        }
      } catch (error) {}
    };
    fetchDestinations();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = await axios.get(
        "https://thinggaard.dk/wp-json/thinggaard/v1/authentication"
      );

      if (token?.data?.result?.auth_token) {
        const { data } = await axios.get(
          `https://thinggaard.dk/wp-json/thinggaard/v1/trips?destination_id=${destinationId}&ages=${ages}&duration=${duration}&date=${date}&transport=${transport}&token=${token?.data?.result?.auth_token}`
        );
        setTrips(data);
      }
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
              destinationId={destinationId}
              value={duration}
              onChange={setDuration}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <DatesSelect
              destinationId={destinationId}
              value={date}
              onChange={setDate}
            />
          </Grid>

          {/* <TransportsSelect destinationId={destinationId} /> */}
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

      <pre>{JSON.stringify(trips, null, 2)}</pre>
    </>
  );
};

export default App;
