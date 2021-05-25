import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Details from "./pages/Details";
import Home from "./pages/Home";

const App = () => {
  return (
    <main className="max-w-screen-lg mx-auto">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/hotel/:currentAccomodationCode/:currentPeriodId">
            <Details />
          </Route>
        </Switch>
      </Router>
    </main>
  );
};

export default App;
