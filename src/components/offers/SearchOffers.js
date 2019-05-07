import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import offer from '../../lib/offer-service';
import OfferSearchResults from "./OfferSearchResults";
import user from "../../lib/user-service";
import { Button } from 'reactstrap';
import '../../stylesheets/styles.css'




class SearchOffers extends Component {
    state = {
        offers: [],
        showSearchResults: false,
        user:{}
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
      <div className="centeredComponents">
       <Button color= "warning" onClick={this.handleShowSearchResults}>
        View offers in your town
        </Button>
        { showSearchResults ? <OfferSearchResults offers={offers}/> : <div></div> }
      </div>
      
    );
  }
}

export default withAuth(SearchOffers);
