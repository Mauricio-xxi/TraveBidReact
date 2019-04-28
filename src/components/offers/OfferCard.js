import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import { Link } from "react-router-dom";


class OfferCard extends Component {


  render() {
    const { offers, showEditOfferForm, deleteOffer } = this.props;
    return (
      <div>
        {offers.map((offer) => {
          const fromISO = new Date(offer.from);
          const from = fromISO.getFullYear()+'-' + (fromISO.getMonth()+1) + '-'+fromISO.getDate();
          const untilISO = new Date(offer.until);
          const until = untilISO.getFullYear()+'-' + (untilISO.getMonth()+1) + '-'+untilISO.getDate();
          return(
            <div key={offer._id}>
              <Link to={`/Offer/${offer._id}`}>
                <p>{offer.location}</p> 
                <p>From: {from}</p> 
                <p>Until: {until}</p> 
                <p>Budget: {offer.budget}</p>
              </Link>
              <button onClick={()=>deleteOffer(offer._id)}>Delete Offer</button> 
              <button onClick={()=>showEditOfferForm(offer)}>Edit Offer</button>
            </div>
          )
        })}
      </div>
    );
  }
}

export default withAuth(OfferCard);
