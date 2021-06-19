import React, { useEffect, useReducer } from "react";
import globalReducer from "./globalReducer";
import GlobalContext from "./globalContext";
import {
  // SET_LOADING,
  SET_TOKEN,
  SET_DESTINATIONS,
  SET_ALL_DURATIONS,
  SET_COUNTRIES,
  SET_DURATIONS,
  SET_TRANSPORTS,
  SET_DATES,
  SET_TRIPS,
  SET_CURRENT_DATE,
  SET_CURRENT_COMBINATIONS,
  SET_CURRENT_TRIP,
  SET_ORDER,
  SET_PARTICIPANTS_DATA,
} from "../types";
import axios from "axios";

const GlobalState = (props) => {
  const initialState = {
    token: "",
    loading: false,
    destinations: [],
    allDurations: [],
    countries: null,
    currentDestination: "",
    durations: null,
    currentDuration: "",
    transports: null,
    currentTransport: "",
    adults: 2,
    children: 0,
    childrenAges: [],
    dates: [new Date()],
    currentDate: null,
    trips: null,
    currentTrip: null,
    currentCombinations: [],
    participantsData: [],
    order: null,
  };

  const [state, dispatch] = useReducer(globalReducer, initialState);

  const getAuthentication = async (source) => {
    try {
      const { data } = await axios.get(
        "https://thinggaard.dk/wp-json/thinggaard/v1/authentication",
        {
          cancelToken: source.token,
        }
      );
      dispatch({
        type: SET_TOKEN,
        payload: data.result.auth_token,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDestinations = async (source) => {
    try {
      const { data } = await axios.get(
        `https://thinggaard.dk/wp-json/thinggaard/v1/destinations?token=${state.token}`,
        {
          cancelToken: source.token,
        }
      );
      dispatch({
        type: SET_DESTINATIONS,
        payload: data.destinations,
      });
      dispatch({
        type: SET_ALL_DURATIONS,
        payload: data.durations,
      });
      dispatch({
        type: SET_COUNTRIES,
        payload: data.countries,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDurations = async (source) => {
    if (!state.currentDestination) {
      return;
    }
    try {
      const { data } = await axios.get(
        `https://thinggaard.dk/wp-json/thinggaard/v1/durations?destination_id=${state.currentDestination.code}&token=${state.token}}`,
        {
          cancelToken: source.token,
        }
      );
      dispatch({
        type: SET_DURATIONS,
        payload: data.result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTransports = async (source) => {
    try {
      const { data } = await axios.get(
        `https://thinggaard.dk/wp-json/thinggaard/v1/transports?destination_id=${state.currentDestination.id}&token=${state.token}&duration_from=${state.currentDuration}&duration_to=${state.currentDuration}`,
        {
          cancelToken: source.token,
        }
      );
      dispatch({
        type: SET_TRANSPORTS,
        payload: data.result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDates = async (source) => {
    try {
      const { data } = await axios.get(
        `https://thinggaard.dk/wp-json/thinggaard/v1/dates?destination_id=${state.currentDestination?.code}&token=${state.token}`,
        {
          cancelToken: source.token,
        }
      );
      dispatch({
        type: SET_DATES,
        payload: data.result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCombinations = async (
    source,
    currentAccomodationCode,
    currentPeriodId
  ) => {
    try {
      const { data } = await axios.get(
        `https://thinggaard.dk/wp-json/thinggaard/v1/trips/combinations?&ages=${state.currentTrip.age_string}&duration=${state.currentDuration}&date=${state.currentDate}&transport=${state.currentTransport}&token=${state.token}&accomodation_code=${currentAccomodationCode}&period_id=${currentPeriodId}`,
        {
          cancelToken: source.token,
        }
      );

      dispatch({
        type: SET_CURRENT_COMBINATIONS,
        payload: data.result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrderCreate = async (roomString) => {
    try {
      const { data } = await axios.get(
        `https://thinggaard.dk/wp-json/thinggaard/v1/orders/create?transport=${state.currentTrip.transport_id}&token=${state.token}&period_id=${state.currentTrip.period_id}&ages=${state.currentTrip.age_string}&origin_url=thinggaard.dk&ip_address=35.198.722.00&room_string=${roomString}`
      );
      dispatch({
        type: SET_ORDER,
        payload: data.result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const countAdults = (number) => {
    let countAdults = [];
    for (let i = 0; i < state.adults; i++) {
      countAdults.push("30");
    }
    return countAdults;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch({
      type: SET_CURRENT_TRIP,
      payload: null,
    });

    const childrenFiltered = state.children
      ? state.childrenAges.filter(function (el) {
          return el != null;
        })
      : [];

    const adultsFiltered = countAdults(state.adults);

    const allAges =
      childrenFiltered && childrenFiltered.length
        ? adultsFiltered + "," + childrenFiltered.slice(0, state.children)
        : adultsFiltered;

    try {
      const { data } = await axios.get(
        `https://thinggaard.dk/wp-json/thinggaard/v1/trips?destination_id=${state.currentDestination.code}&ages=${allAges}&duration=${state.currentDuration}&date=${state.currentDate}&transport=${state.currentTransport}&token=${state.token}}`
      );
      dispatch({
        type: SET_TRIPS,
        payload: data.result,
      });
    } catch (error) {}
  };
  // useEffects

  useEffect(() => {
    let source = axios.CancelToken.source();
    getAuthentication(source);

    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    let source = axios.CancelToken.source();
    if (state.token) {
      fetchDestinations(source);
    }
    return () => {
      source.cancel();
    };
  }, [state.token]);

  useEffect(() => {
    let source = axios.CancelToken.source();

    dispatch({
      type: SET_CURRENT_DATE,
      payload: null,
    });
    fetchDurations(source);

    if (state.token) {
      fetchDates(source);
    }

    if (state.currentDuration) {
      fetchTransports(source);
    }

    return () => {
      source.cancel();
    };
  }, [state.currentDestination, state.currentDuration]);

  return (
    <GlobalContext.Provider
      value={{
        loading: state.loading,
        token: state.token,
        destinations: state.destinations,
        allDurations: state.allDurations,
        countries: state.countries,
        currentDestination: state.currentDestination,
        durations: state.durations,
        currentDuration: state.currentDuration,
        transports: state.transports,
        currentTransport: state.currentTransport,
        adults: state.adults,
        dates: state.dates,
        currentDate: state.currentDate,
        trips: state.trips,
        currentTrip: state.currentTrip,
        currentCombinations: state.currentCombinations,
        children: state.children,
        childrenAges: state.childrenAges,
        order: state.order,
        participantsData: state.participantsData,
        dispatch,
        handleSubmit,
        fetchCombinations,
        fetchOrderCreate,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
