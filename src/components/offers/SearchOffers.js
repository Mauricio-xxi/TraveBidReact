import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import offer from '../../lib/offer-service';
import OfferSearchResults from "./OfferSearchResults";
import user from "../../lib/user-service";
import styled from 'styled-components';

const SideBarContainer = styled.div`
  width:100%;
  margin:0;
`;
const SearchButton = styled.button`
  background-color: #F8F9FA;
  width:40%;
  float:right;
  padding: 0;
  margin:0;
  border:0;
  cursor: pointer;
`;

const SearchIcon = styled.img`
  width: 35%;
  margin-top: 10%;
  margin-bottom: 11%;
`;


class SearchOffers extends Component {
    state = {
        offers: [],
        showSearchResults: false,
        user:{},
        sideBarSearchOpen: false
    }

    componentDidMount = ()=> {
      this.getUser();
    }

    getUser = () => {
      user.getUser()
      .then(responseData=>{
        this.setState({
          user:responseData
        })
      })
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
    const city = this.state.user.city
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
    return (
      <SideBarContainer>
        <SearchButton onClick={this.handleShowSearchResults}><SearchIcon src="/Search.png" alt="View offer in your town"/></SearchButton>
        {/* { showSearchResults ? <OfferSearchResults offers={offers}/> : <div></div> } */}
         <OfferSearchResults offers={offers} isOpen={showSearchResults}/>
      </SideBarContainer>
      
    );
  }
}

export default withAuth(SearchOffers);
