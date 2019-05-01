import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import offer from '../../lib/offer-service';
import OfferSearchResults from "./OfferSearchResults";



class SearchOffers extends Component {
    state = {
        offers: [],
        showSearchResults: true,
    }
  

  handleShowSearchResults = (e) => {
    const { showSearchResults } = this.state
    this.setState({
      showSearchResults: !showSearchResults
     })
  }

  
  search = () => {
    // Protect, verify city that user has city
    offer.searchOffers(this.props.user.city)
      .then(responseData => {
        this.setState({
          offers: responseData
        })
      })
      .catch( error => console.log(error) )
  }


  componentDidMount = ()=> {
    this.search();
  }

  render() {
    const { showSearchResults, offers } = this.state;
    return (
      <div>
       <button onClick={this.handleShowSearchResults}>
        { showSearchResults ? 'View offers in your town' : 'Hide'}
        </button>
        { !showSearchResults ? <OfferSearchResults offers={offers}/> : <div></div> }
      </div>
      
    );
  }
}

export default withAuth(SearchOffers);
