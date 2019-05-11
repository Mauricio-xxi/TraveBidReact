import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import offer from '../../lib/offer-service';
import CreateOffer from "../offers/CreateOffer";
import EditOffer from "../offers/EditOffer";
import Offercarousel2 from "../offers/Offercarousel2";
import styled from 'styled-components';


const OffersectionHeader = styled.div`
  display:flex;
  flex-direction: row;
`;

const OfferTitle = styled.h5`
  margin-top: 10%;
`;

const CreateOfferButton = styled.button`
  background-color: white;
  width:35%
  padding: 0;
  margin:0;
  margin-top: 9%;
  border:0;
  cursor: pointer;
`;


class Offers extends Component {
    state = {
        offers: [],
        showCreateOfferForm: false,
        showEditOfferForm: false,
        offerToEdit:{},
    }

  componentDidMount() {
    this.getOffers();
  }


  getOffers = () => {
    offer.showOfferList(this.props.user._id)
    .then(responseData => {
        this.setState({
          offers: [...responseData],
          showEditOfferForm: false,
        })
    })
    .catch( error => console.log(error) )
  }

  renderOfferForm = (e) => {
    const { showCreateOfferForm } = this.state
    if (showCreateOfferForm === false){
       this.setState({
       showCreateOfferForm: true
      })
    } else if (showCreateOfferForm === true ){
      this.setState({
      showCreateOfferForm: false
     })
    }
  }

  renderEditOfferForm = (offer) => {
    this.setState({
      showEditOfferForm: true,
      offerToEdit: offer,
     })
  }

  deleteOffer = (offerID) => {
    offer.deleteOffer(offerID)
    .then(() => {
      this.getOffers()
  })
    .catch( error => console.log(error) )
  }
  

  render() {
    const { showCreateOfferForm, showEditOfferForm, offers, offerToEdit } = this.state;
    return (
      <div>

        <OffersectionHeader>
        <OfferTitle>Your Offers</OfferTitle>

        <CreateOfferButton onClick={this.renderOfferForm}> <img src="/plus.svg" alt="Create a new offer"/> </CreateOfferButton>

        </OffersectionHeader>

        { showCreateOfferForm ? 
            <CreateOffer getOffers={this.getOffers} renderOfferForm={this.renderOfferForm}/> 
        : <div></div> }

        <Offercarousel2
            offers={offers} 
            deleteOffer={this.deleteOffer}
            showEditOfferForm={this.renderEditOfferForm}
        />


        {showEditOfferForm ? 
            <EditOffer 
            offer={offerToEdit} 
            offerID={offerToEdit._id} 
            getOffers= {this.getOffers}
            /> 
        : <div></div>}

      </div>
    );
  }
}

export default withAuth(Offers);
