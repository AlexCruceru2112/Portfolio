import Home from "./components/Home";
import Details from "./components/Details";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/:id" component={Details} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
