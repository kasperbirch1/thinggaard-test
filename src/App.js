import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import OrderAccountHolder from "./pages/orderaccountholder";
import Home from "./pages/Home";
import Order from "./pages/order";

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
        </Switch>
      </Router>
    </main>
  );
};

export default App;
