import React, { Component } from "react";
import UserSignup from "../components/user/UserSignup";
import { withAuth } from "../lib/AuthProvider";
import { Link } from 'react-router-dom';

import styled from 'styled-components';

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


class Signup extends Component {

  render() {

    return (
      <LandingBack>
        <Title><Link style={{color: "white"}}  to={"/"}>TravelBID</Link></Title>
        <UserSignup />
      </LandingBack>
    );
  }
}

export default withAuth(Signup);
