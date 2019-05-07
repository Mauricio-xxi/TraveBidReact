import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import { Link } from "react-router-dom";
import transformDate from "../../functions/dates"
import { Button } from 'reactstrap';



class OfferCard extends Component {


  render() {
    const { offers, showEditOfferForm, deleteOffer } = this.props;
    return (
      <div>
        {offers.map((offer) => {
          const from = transformDate(offer.from)
          const until = transformDate(offer.until)
          
          return(
            <div key={offer._id}>
              <Link to={`/Offer/${offer._id}`}>
                <p>{offer.location}</p> 
                <p>From: {from}</p> 
                <p>Until: {until}</p> 
                <p>Budget: {offer.budget}</p>
              </Link>
              {/* <Button onClick={()=>deleteOffer(offer._id)}>Delete Offer</Button> */}
              <Button color="danger" onClick={()=>deleteOffer(offer._id)}>Delete Offer</Button>{' '}
              <Button color="success" onClick={()=>showEditOfferForm(offer)}>Edit Offer</Button>{' '}
            </div>
          )
        })}
      </div>
    );
  }
}

export default withAuth(OfferCard);
