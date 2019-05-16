import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Private from "./pages/Private";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";

import PrivateRoute from "./components/PrivateRoute";
import AnonRoute from "./components/AnonRoute";
import AuthProvider from "./lib/AuthProvider";
import OfferDetail from "./pages/OfferDetail";

class App extends Component {
  render() {
    return (
      <AuthProvider>
          <div className="container">
            <Switch>
              <Route exact path="/" component={Landing} />
              <AnonRoute path="/signup" component={Signup} />
              <AnonRoute path="/login" component={Login} />
              <PrivateRoute path="/private" component={Private} />
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute exact path="/offer/:id" component={OfferDetail} />
            </Switch>
          </div>
      </AuthProvider>
    );
  }
}

// crear component container 

export default App;
