import React from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import AllUsers from "./AllUsers";
import UserDetail from "./UserDetail";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./Footer";

function App() {
  return (
    <>
      <Router>
        <div className="overlay"></div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/users" exact component={AllUsers} />
          <Route path="/user/:id" exact component={UserDetail} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
