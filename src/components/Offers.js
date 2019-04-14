import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import offer from '../lib/offer-service';


class Offers extends Component {
  constructor(props){
    super(props);
    this.state = {
        offers: [this.props.offers],
    }
  }


  getOffers = () => {
    offer.showOfferList(this.props.user._id)
    .then(responseData => {
        this.setState({
          offers: [...responseData]
        })
    })
    .catch( error => console.log(error) )
  }

  componentDidMount() {
    this.getOffers();
  }
  

  render() {
    return (
      <div>
        {this.state.offers.map((offer) => {
          return(
            <div key={offer._id}>
              <p>{offer.location}</p> 
              <p>{offer.budget}</p> 
            </div>
          )
        })}
      </div>
    );
  }
}

export default withAuth(Offers);
