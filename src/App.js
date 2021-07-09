import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import OrderAccountHolder from "./pages/orderaccountholder";
import Home from "./pages/Home";
import Order from "./pages/order";
import OrderConfirmation from "./pages/orderconfirmation";

const App = () => {
  return (
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
  );
};

export default App;
