import React, { useEffect, useState, useReducer } from "react";
import globalReducer from "./globalReducer";
import GlobalContext from "./globalContext";
import {
  SET_LOADING,
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
  SET_CUSTOMER_DATA,
  CREATE_CUSTOMER_DATA,
} from "../types";
import axios from "axios";
import { PAX_DEFAULT_STRING, PAX_DEFAULT, BRAND_ID } from "../../constants";

const GlobalState = (props) => {
  const initialState = {
    token: "",
    destinations: [],
    allDurations: [],
    countries: null,
    currentDestination: "",
    durations: null,
    currentDuration: "",
    transports: null,
    currentTransport: "",
    adults: PAX_DEFAULT,
    children: 0,
    childrenAges: [],
    dates: [new Date()],
    currentDate: null,
    trips: null,
    currentTrip: null,
    currentCombinations: [],
    participantsData: [],
    participant_service_group_id: "",
    participant_service_price_id: "",
    customerData: {},
    order: null,
  };

  const [state, dispatch] = useReducer(globalReducer, initialState);

  const getAuthentication = async (source) => {
    try {
      const { data } = await axios.get(
        `https://thinggaard.dk/wp-json/thinggaard/v1/authentication?brand=${BRAND_ID}`,
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
        "https://thinggaard.dk/wp-json/thinggaard/v1/dates?destination_id=" +
          state.currentDestination.code +
          "&transport=" +
          state.currentTransport +
          "&duration_from=" +
          state.currentDuration +
          "&duration_to=" +
          state.currentDuration +
          "&token=" +
          state.token,
        {
          cancelToken: source.token,
        }
      );
      console.log(data.result);
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

  const fetchOrder = async (order_id, pincode) => {
    try {
      const { data } = await axios.get(
        `https://thinggaard.dk/wp-json/thinggaard/v1/orders/get?order_id=${order_id}&pincode=${pincode}&token=${state.token}`
      );
      dispatch({
        type: SET_ORDER,
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

  const setParticipantsData = async (saveData) => {
    const postData = {
      token: state.token,
      order_id: state.order.id,
      pincode: state.order.pin_code,
      participants: state.participantsData,
    };

    try {
      const { data } = await axios({
        url: "https://thinggaard.dk/wp-json/thinggaard/v1/orders/participants/attach",
        method: "POST",
        data: postData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setCustomerData = (saveData) => {
    const postData = {
      token: state.token,
      order_id: state.order.id,
      customer: JSON.stringify(saveData),
    };

    axios
      .post(
        "https://thinggaard.dk/wp-json/thinggaard/v1/orders/customers/patch",
        postData
      )
      .then(() => {});
  };

  const createCustomerData = (saveData) => {
    const postData = {
      token: state.token,
      order_id: state.order.id,
      customer: JSON.stringify(saveData),
    };

    axios
      .post(
        "https://thinggaard.dk/wp-json/thinggaard/v1/orders/customers/create",
        postData
      )
      .then(() => {});
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
  }, [state.currentDestination, state.currentDuration, state.currentTransport]);

  return (
    <GlobalContext.Provider
      value={{
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
        customerData: state.customerData,
        dispatch,
        handleSubmit,
        fetchCombinations,
        fetchOrder,
        fetchOrderCreate,
        setParticipantsData,
        setCustomerData,
        createCustomerData,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
