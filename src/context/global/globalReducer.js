import {
  SET_LOADING,
  SET_TOKEN,
  SET_DESTINATIONS,
  SET_ALL_DURATIONS,
  SET_COUNTRIES,
  SET_CURRENT_DESTINATION,
  SET_DURATIONS,
  SET_CURRENT_DURATION,
  SET_TRANSPORTS,
  SET_CURRENT_TRANSPORT,
  SET_ADULTS,
  SET_DATES,
  SET_CURRENT_DATE,
  SET_TRIPS,
  SET_CURRENT_TRIP,
  SET_CURRENT_COMBINATIONS,
  SET_CHILDREN,
  SET_CHILDREN_AGES,
  SET_ORDER,
  SET_PARTICIPANTS_DATA,
  SET_CUSTOMER_DATA,
  SET_CUSTOMER_CONFIRM,
} from "../types";

const globalReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SET_DESTINATIONS:
      return {
        ...state,
        destinations: action.payload,
      };
    case SET_CURRENT_DESTINATION:
      return {
        ...state,
        currentDestination: action.payload,
      };
    case SET_ALL_DURATIONS:
      return {
        ...state,
        allDurations: action.payload,
      };
    case SET_DURATIONS:
      return {
        ...state,
        durations: action.payload,
      };
    case SET_CURRENT_DURATION:
      return {
        ...state,
        currentDuration: action.payload,
      };
    case SET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
      };
    case SET_TRANSPORTS:
      return {
        ...state,
        transports: action.payload,
      };
    case SET_CURRENT_TRANSPORT:
      return {
        ...state,
        currentTransport: action.payload,
      };
    case SET_ADULTS:
      return {
        ...state,
        adults: action.payload,
      };
    case SET_DATES:
      return {
        ...state,
        dates: action.payload,
      };
    case SET_CURRENT_DATE:
      return {
        ...state,
        currentDate: action.payload,
      };
    case SET_TRIPS:
      return {
        ...state,
        trips: action.payload,
      };
    case SET_CURRENT_TRIP:
      return {
        ...state,
        currentTrip: action.payload,
      };
    case SET_CURRENT_COMBINATIONS:
      return {
        ...state,
        currentCombinations: action.payload,
      };
    case SET_CHILDREN:
      return {
        ...state,
        children: action.payload,
      };
    case SET_CHILDREN_AGES:
      return {
        ...state,
        childrenAges: action.payload,
      };
    case SET_PARTICIPANTS_DATA:
      return {
        ...state,
        participantsData: action.payload,
      };
    case SET_CUSTOMER_DATA:
      return {
        ...state,
        customerData: action.payload,
      };
    case SET_CUSTOMER_CONFIRM:
      return {
        ...state,
        customerConfirm: action.payload,
      };
    case SET_ORDER: {
      return {
        ...state,
        order: action.payload,
      };
    }
    default:
      return state;
  }
};

export default globalReducer;
