import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import Navbar from "../components/Navbar";
import Offers from "../components/offers/Offers";
import Bids from "../components/bids/Bids";


class Private extends Component {

  render() {
    return (
      <div>
        <Navbar />
        <h2>Welcome {this.props.user.username}</h2>
        <Offers />
        <Bids/>
      </div>
    );
  }
}

export default withAuth(Private);
