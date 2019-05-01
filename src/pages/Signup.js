import React, { Component } from "react";
import UserSignup from "../components/user/UserSignup";
import { withAuth } from "../lib/AuthProvider";

class Signup extends Component {

  render() {

    return (
      <UserSignup />
    );
  }
}

export default withAuth(Signup);
