import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import Navbar from "../components/Navbar";
import DetailedOffer from "../components/offers/DetailedOffer";
import offer from '../lib/offer-service';
import OfferSearchResults from "../components/offers/OfferSearchResults";



class OfferDetail extends Component {
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
    const offerID = this.props.match.params.id;
    return (
      <div>
        <Navbar handleShowSearchResults={this.handleShowSearchResults} />
        { showSearchResults ? <OfferSearchResults offers={offers}/> : <div></div> }
        <DetailedOffer offerID={offerID} />
      </div>
    );
  }
}

export default withAuth(OfferDetail);
