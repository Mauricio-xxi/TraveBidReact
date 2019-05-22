import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import UserLogin from "../components/user/UserLogin";
import Notifications from '../../src/components/notifications/index.js'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LandingBack = styled.div`
 background-image: url("/landing_sunset.jpg");
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  object-fit: cover;
  background-size: cover; 
`;

const Title = styled.h1`
 font: "Lucida Grande", Helvetica, Arial, sans-serif; 
 margin-left: 27%;
 margin-right: 27%;
 margin-top: 30%;
 color: white;
`;

class Login extends Component {

  render() {

    return (
      <div>
        <LandingBack>
        <Title><Link style={{color: "white"}}  to={"/"}>TravelBID</Link></Title>
          <UserLogin />
          <Notifications/>
        </LandingBack>
      </div>
    );
  }
}

export default withAuth(Login);
