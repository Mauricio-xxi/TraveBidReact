import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import offer from '../../lib/offer-service';
import OfferSearchResults from "./OfferSearchResults";
import user from "../../lib/user-service";



class SearchOffers extends Component {
    state = {
        offers: [],
        showSearchResults: false,
        user:{}
    }
  

  handleShowSearchResults = async (e) => {
    // const { showSearchResults } = this.state
    await this.search();
    await this.setState({
      showSearchResults: true
     })
  }

  getUser = () => {
    user.getUser()
    .then(responseData=>{
      this.setState({
        user:responseData
      })
    })
 }

  
  search = () => {
    // Protect, verify city that user has city
    const city = this.state.user.city
    offer.searchOffers(city)
      .then(responseData => {
        console.log(responseData)
        this.setState({
          offers: responseData
        })
      })
      .catch( error => console.log(error) )
  }


  componentDidMount = ()=> {
    this.getUser();
  }

  render() {
    const { showSearchResults, offers } = this.state;
    return (
      <div>
       <button onClick={this.handleShowSearchResults}>
        { !showSearchResults ? 'View offers in your town' : 'Hide'}
        </button>
        { showSearchResults ? <OfferSearchResults offers={offers}/> : <div></div> }
      </div>
      
    );
  }
}

export default withAuth(SearchOffers);
