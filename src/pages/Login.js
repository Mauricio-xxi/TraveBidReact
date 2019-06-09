import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import styled from 'styled-components';
import UserLoginUI from "../components/uiStyle/UserLoginUI";

const LandingBack = styled.div`
 background-image: url("https://cdn.pixabay.com/photo/2016/01/19/17/45/hiker-1149877_960_720.jpg");
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

class Login extends Component {

  render() {

    return (
        <LandingBack>
          <UserLoginUI></UserLoginUI>
        </LandingBack>
    );
  }
}

export default withAuth(Login);
