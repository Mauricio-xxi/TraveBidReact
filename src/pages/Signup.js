import React, { Component } from "react";
import UserSignup from "../components/user/UserSignup";
import { withAuth } from "../lib/AuthProvider";

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

class Signup extends Component {

  render() {

    return (
      <LandingBack>
        <UserSignup />
      </LandingBack>
    );
  }
}

export default withAuth(Signup);
