import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import Navbar from "../components/Navbar";
import DetailedOffer from "../components/offers/DetailedOffer";



class OfferDetail extends Component {

  render() {
    const offerID = this.props.match.params.id;
    return (
      <div>
        <Navbar />
        <DetailedOffer offerID={offerID} />
      </div>
    );
  }
}

export default withAuth(OfferDetail);
