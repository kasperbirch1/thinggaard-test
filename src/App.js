import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import OrderAccountHolder from "./pages/orderaccountholder";
import theme from "./styles/theme.js";
import Home from "./pages/Home";
import Order from "./pages/order";
import OrderConfirmation from "./pages/orderconfirmation";
import { useContext, useState } from "react";
import globalContext from "./context/global/globalContext";
import { PuffLoader } from "react-spinners";
import axios from "axios";
import { SET_LOADING } from "./context/types.js";

const App = () => {
  const { trips, order, dispatch } = useContext(globalContext);

  const [loading, setLoading] = useState(false);

  let outstandingRequests = 0;

  axios.interceptors.request.use(
    function (config) {
      outstandingRequests++;
      if (outstandingRequests > 0 && loading !== "1") {
        setLoading(true);
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      outstandingRequests--;
      if (outstandingRequests === 0 && loading !== "0") {
        setLoading(false);
      }
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  return (
    <ThemeProvider theme={theme}>
      <main>
        <div
          className={
            order || trips
              ? "booking-outer trip-outer-trips"
              : "booking-outer trip-outer-home"
          }
        >
          <PuffLoader
            loading={loading && loading > 0 ? true : false}
            css={{
              position: "fixed",
              zIndex: "9998",
              left: "50%",
              top: "50%",
              transform: `translate(-50%, -50%)`,
            }}
            color="#0e6c56"
            size={150}
          />{" "}
          <div
            className="booking-outer-wrap booking-container p-4 rounded "
            style={{
              position: "relative",
              transition: "all 120ms ease-in-out",
              filter:
                loading && loading > 0
                  ? "brightness(90%) blur(2px)"
                  : "brightness(100%) blur(0px)",
            }}
          >
            <Router>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/order">
                  <Order />
                </Route>
                <Route path="/orderdetails">
                  <OrderAccountHolder />
                </Route>
                <Route path="/orderconfirmation">
                  <OrderConfirmation />
                </Route>
                <Route path="/orderpaymentconfirmation">
                  <OrderConfirmation />
                </Route>
                <Route path="/orderpaymentcallback">
                  <OrderConfirmation />
                </Route>
                <Route path="/orderpaymentcancel">
                  <OrderConfirmation />
                </Route>
              </Switch>
            </Router>
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
};

export default App;
