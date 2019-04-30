import React, { Component } from 'react';
import Navbar from "../components/Navbar";
import { withAuth } from "../lib/AuthProvider";
import UserData from "../components/user/UserData";
import RoomGeo from "../components/user/RoomGeo";


class Profile extends Component {

  render() {

    return (
      <div>
        <Navbar/>
        <UserData/>
        <RoomGeo />
      </div>
    )
  }
}

export default withAuth(Profile);