import React from "react";
import Navbar from "./navbar";
import HomeContent from "./homeContent";
import AllUsers from "./allUsers";
import UserDetail from "./UserDetail";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./Footer";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={HomeContent} />
          <Route path="/users" exact component={AllUsers} />
          <Route path="/user/:id" exact component={UserDetail} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
