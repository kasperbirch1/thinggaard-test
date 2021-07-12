import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import OrderAccountHolder from "./pages/orderaccountholder";
import theme from "./styles/theme.js";
import Home from "./pages/Home";
import Order from "./pages/order";
import OrderConfirmation from "./pages/orderconfirmation";
import { useContext } from "react";
import globalContext from "./context/global/globalContext";

const App = () => {
  const { trips } = useContext(globalContext);
  return (
    <ThemeProvider theme={theme}>
      <main>
        <div
          className={
            trips
              ? "booking-outer trip-outer-trips"
              : "booking-outer trip-outer-home"
          }
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
            </Switch>
          </Router>
        </div>
      </main>
    </ThemeProvider>
  );
};

export default App;
