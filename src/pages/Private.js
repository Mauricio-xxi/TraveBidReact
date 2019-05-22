import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import Navbar from "../components/Navbar";
import Offers from "../components/offers/Offers";
import Bids from "../components/bids/Bids";
import Notifications from '../components/notifications/index'
import OfferSearchResults from "../components/offers/OfferSearchResults";
import offer from '../lib/offer-service';

class Private extends Component {
  state = {
    offers: [],
    showSearchResults: false,
  }

  handleShowSearchResults = async (e) => {
    await this.search()
    const { showSearchResults } = this.state
    if (showSearchResults === false) {
      this.setState({
        showSearchResults: true
      })
    } else if  (showSearchResults === true) {
      this.setState({
        showSearchResults: false
      })
    }
  }

  search = () => {
    // Protect, verify city that user has city
    const city = this.props.user.city
    offer.searchOffers(city)
      .then(responseData => {
        this.setState({
          offers: responseData
        })
      })
      .catch( error => console.log(error) )
  }

  render() {
    const { showSearchResults, offers } = this.state;
    console.log(offers)
    return (
    <div>
      <Navbar handleShowSearchResults={this.handleShowSearchResults} />
      { showSearchResults ? <OfferSearchResults offers={offers}/> : <div></div> }
      <Offers />
      <Notifications/>
      <Bids/>
    </div>
    );
  }
}

export default withAuth(Private);
