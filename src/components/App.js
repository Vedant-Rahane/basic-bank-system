import React from "react";
import Navbar from "./navbar";
import HomeContent from "./homeContent";
import AllUsers from "./allUsers";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <section>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={HomeContent} />
          <Route path="/allusers" component={AllUsers} />
        </Switch>
      </Router>
    </section>
  );
}

export default App;
