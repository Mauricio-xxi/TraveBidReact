import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import UserLogin from "../components/user/UserLogin";

class Login extends Component {

  render() {

    return (
      <UserLogin />
    );
  }
}

export default withAuth(Login);
