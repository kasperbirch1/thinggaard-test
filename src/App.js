import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import OrderAccountHolder from "./pages/orderaccountholder";
import theme from "./styles/theme.js";
import Home from "./pages/Home";
import Order from "./pages/order";
import OrderConfirmation from "./pages/orderconfirmation";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <main>
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
      </main>
    </ThemeProvider>
  );
};

export default App;
