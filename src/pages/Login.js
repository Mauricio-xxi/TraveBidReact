import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import UserLogin from "../components/user/UserLogin";
import Notifications from '../../src/components/notifications/index.js'


class Login extends Component {

  render() {

    return (
      <div>
        <UserLogin />
        <Notifications/>
      </div>
    );
  }
}

export default withAuth(Login);
