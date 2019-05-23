import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import UserLogin from "../components/user/UserLogin";
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

const Title = styled.h1`
 font: "Lucida Grande", Helvetica, Arial, sans-serif; 
 margin-left: 27%;
 margin-right: 27%;
 margin-top: 30%;
 color: black;
`;

class Login extends Component {

  render() {

    return (
      <div>
        <LandingBack>
        <Title><Link style={{color: "black"}}  to={"/"}>TravelBID</Link></Title>
          <UserLogin />
        </LandingBack>
      </div>
    );
  }
}

export default withAuth(Login);
