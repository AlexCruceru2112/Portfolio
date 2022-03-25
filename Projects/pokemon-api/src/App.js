import Home from "./components/Home";
import Details from "./components/Details";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" exact component={Home} />
          <Route path="/:id" component={Details} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
