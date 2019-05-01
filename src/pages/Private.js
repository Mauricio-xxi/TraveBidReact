import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import Navbar from "../components/Navbar";
import Offers from "../components/offers/Offers";
import Bids from "../components/bids/Bids";
import SearchOffers from "../components/offers/SearchOffers";


class Private extends Component {

  render() {
    return (
      <div>
        <Navbar />
        <h1>Welcome {this.props.user.username}</h1>
        <SearchOffers />
        <p>------------------------</p>
        <Offers />
        <p>------------------------</p>
        <Bids/>
      </div>
    );
  }
}

export default withAuth(Private);
