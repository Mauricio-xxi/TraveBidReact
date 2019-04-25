import React, { Component } from 'react';
import Navbar from "../components/Navbar";
import { withAuth } from "../lib/AuthProvider";
import user from "../lib/user-service";

class Profile extends Component {

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
    .catch( error => console.log(error) )
  }

  componentDidMount() {
    this.getUser();
  }

  render() {
    const { username } = this.state.user;
    return (
      <div>
        <Navbar/>
        <h1>Profile</h1>
        <h2>{username}</h2>
      </div>
    )
  }
}

export default withAuth(Profile);