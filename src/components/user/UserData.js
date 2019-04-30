import React, { Component } from 'react';
import { withAuth } from "../../lib/AuthProvider";
import user from "../../lib/user-service";

class UserData extends Component {

  state = {
    user
  }

  getUser = () => {
    user.getUser()
    .then(responseData => {
      this.setState({
        user:responseData
      })
    })
    .catch( error => console.error(error) )
  }

  componentDidMount() {
    this.getUser();
  }

  render() {
    const { username } = this.state.user;
    return (
      <div>
        <h1>Profile</h1>
        <h2>{username}</h2>
      </div>
    )
  }
}

export default withAuth(UserData);