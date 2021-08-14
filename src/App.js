import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import OrderAccountHolder from "./pages/orderaccountholder";
import theme from "./styles/theme.js";
import Home from "./pages/Home";
import Order from "./pages/order";
import OrderConfirmation from "./pages/orderconfirmation";
import { useContext } from "react";
import globalContext from "./context/global/globalContext";
import Loader from "react-loader-spinner";

const App = () => {
  const { trips, order, loading } = useContext(globalContext);
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
          <div
            className="booking-outer-wrap booking-container p-4 rounded "
            style={{ position: "relative" }}
          >
            {loading > 0 && (
              <div
                className="loader rounded"
                style={{
                  position: "absolute",
                  zIndex: "9999",
                  left: 0,
                  top: 0,
                  width: "100%",
                  height: "100%",
                  background: "#ffffff80",
                }}
              >
                <Loader
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "40px",
                    transform: `translate(-50%, -50%)`,
                  }}
                  type="TailSpin"
                  color="#0e6c56"
                  height={100}
                  width={100}
                  timeout={0} //3 secs
                />
              </div>
            )}{" "}
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
