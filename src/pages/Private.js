import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import Navbar from "../components/Navbar";
import Offers from "../components/offers/Offers";
import Bids from "../components/bids/Bids";
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
    const city = this.props.user.city
    offer.searchOffers(city)
      .then(responseData => {
        this.setState({
          offers: responseData
        })
      })
      .catch( error => console.log(error) )
  }

  orderOffersByPrice = async () => {
    const { offers } = this.state;
    const compare = (a , b ) => {
      const priceA = a.budget;
      const priceB = b.budget;
      let comparison = 0;
      if (priceA > priceB) {
        comparison = 1;
      } else if (priceA < priceB) {
        comparison = -1;
      }
      return comparison;
    }

    const orderedOffers = [...offers].sort(compare);
    this.setState({
      offers: orderedOffers
    })
  }

  orderOffersByDate = () => {
    
  }

  render() {
    const { showSearchResults, offers } = this.state;
    console.log(this.props.location)
    return (
    <div>
      <Navbar 
        handleShowSearchResults={this.handleShowSearchResults} 
        location={this.props.location.pathname} 
        />
      { showSearchResults ? <OfferSearchResults offers={offers} orderOffersByPrice = {this.orderOffersByPrice}/> : <div></div> }
      <Offers />
      <Bids/>
    </div>
    );
  }
}

export default withAuth(Private);
