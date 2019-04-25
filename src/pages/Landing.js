import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from 'react-router-dom';

class Landing extends Component {

  render() {
    return (
     <div>
       <h1>Welcome to TravelBID</h1>
       <Link to={"/login"}> Login</Link>
       <Link to={"/signup"}> signup</Link>
     </div>
    );
  }
}

export default withAuth(Landing);
