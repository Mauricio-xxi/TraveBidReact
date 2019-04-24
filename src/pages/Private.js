import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import Navbar from "../components/Navbar";
import Offers from "../components/offers/Offers";
import SearchOffers from "../components/offers/SearchOffers";
import offer from '../lib/offer-service';


class Private extends Component {
  constructor(props){
    super(props);
    this.state = {
        bids: [],
    }
  }

  getAllOffers = () => {
    offer.showOfferList(this.props.user._id)
    .then(responseData => {
        this.setState({
          offers: responseData
        })
    })
    .catch( error => console.log(error) )
  }

  componentDidMount() {
    this.getAllOffers();
  }
  

  render() {
    return (
      <div>
        <Navbar />
        <h1>Welcome {this.props.user.username}</h1>
        <SearchOffers/>
        <p>------------------------</p>
        <Offers />
      </div>
    );
  }
}

export default withAuth(Private);
