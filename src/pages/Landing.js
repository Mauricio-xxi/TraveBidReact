import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";

class Landing extends Component {

  render() {
    return (
     <div>
       <h1>Welcome to TravelBID</h1>
     </div>
    );
  }
}

export default withAuth(Landing);
