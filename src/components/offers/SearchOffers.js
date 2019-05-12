import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import offer from '../../lib/offer-service';
import OfferSearchResults from "./OfferSearchResults";
import user from "../../lib/user-service";
import styled from 'styled-components';


const SearchButton = styled.button`
  background-color: #F8F9FA;
  width:35%
  padding: 0;
  margin:0;
  margin-left: 60%;
  border:0;
  cursor: pointer;
`;

const SearchIcon = styled.img`
  width: 50%
  height:12%;
`;



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
        <SearchButton onClick={this.handleShowSearchResults}><SearchIcon src="/Search.png" alt="View offer in your town"/></SearchButton>
        { showSearchResults ? <OfferSearchResults offers={offers}/> : <div></div> }
      </div>
      
    );
  }
}

export default withAuth(SearchOffers);
