import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import offer from '../../lib/offer-service';
import transformDate from "../../functions/dates"
import BidsOnThisOffer from "../bids/BidsOnThisOffer"



class OfferDetail extends Component {
  state = {
      budget: "",
      from: "",
      until:"",
      offerOwner:"" 
  }

  getOffer = () => {
    const offerID = this.props.offerID;
    offer.getOffer(offerID)
    .then(responseData => {
        this.setState({
          budget: responseData.budget,
          from: responseData.from,
          until: responseData.until,
          offerOwner: responseData.userID,
        })
        
    })
    .catch( error => console.log(error) )
  }

  componentDidMount() {
    this.getOffer();
  }

  render() {
    const { from, until, offerOwner, budget } = this.state;
    const fromFormated = transformDate(from)
    const untilFormated = transformDate(until)
    const { offerID } = this.props;
 
    return (
      <div>
        <h1>We are in offer detail</h1>
        <h5>{budget}</h5>
        <h5>{fromFormated }</h5>
        <h5>{untilFormated}</h5>
        <BidsOnThisOffer offerID={offerID} offerOwner={offerOwner}/>
      </div>
    );
  }
}

export default withAuth(OfferDetail);
