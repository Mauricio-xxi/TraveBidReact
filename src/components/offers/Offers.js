import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import offer from '../../lib/offer-service';
import CreateOffer from "../offers/CreateOffer";
import EditOffer from "../offers/EditOffer";
import Offercarousel2 from "../offers/Offercarousel2";
import styled from 'styled-components';
import {CSSTransition} from 'react-transition-group';
import '../../stylesheets/transitions.css'
import Loader from 'react-loader-spinner'
import {notify} from '../notifications/index'


const DashboardOffers = styled.div`
  margin-top: 17%;
`;

const OffersectionHeader = styled.div`
  display:flex;
  flex-direction: row;
`;

const OfferTitle = styled.h5`
  margin-top: 10%;
`;

const CreateOfferButton = styled.button`
  background-color: white;
  width:35%;
  padding: 0;
  margin:0;
  margin-top: 9%;
  border:0;
  cursor: pointer;
`;


class Offers extends Component {
    state = {
        offers:[],
        showCreateOfferForm: false,
        showEditOfferForm: false,
        offerToEdit:{},
        loaded: false,
    }

  componentDidMount() {
    this.getOffers();
  }

  componentWillUnmount(){
    this.setState({
      loaded: false,
    })
  }

  loadCityImage(){


  }

  getOffers = () => {
    offer.showOfferList(this.props.user._id)
    .then(responseData => {
        this.setState({
          offers: [...responseData],
          showEditOfferForm: false,
          loaded: true,
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
    if(this.state.showEditOfferForm === false ){
      this.setState({
      showEditOfferForm: true,
      offerToEdit: offer,
     })
    } else if (this.state.showEditOfferForm === true){
      this.setState({
        showEditOfferForm: false,
        offerToEdit: offer,
       })
    }
  }

  deleteOffer = (offerID) => {
    offer.deleteOffer(offerID)
    .then(() => {
      notify('Deleted successfully!', 'success')
      this.getOffers()
  })
    .catch( error => console.log(error) )
  }

  render() {
    const { showCreateOfferForm, showEditOfferForm, offers, offerToEdit, loaded } = this.state;
    return (
      <DashboardOffers>

        <OffersectionHeader>
          <OfferTitle>Your Offers</OfferTitle>
          <CreateOfferButton onClick={this.renderOfferForm}> <img src="/plus.svg" alt="Create a new offer"/> </CreateOfferButton>
        </OffersectionHeader>

        <CSSTransition 
         in={showCreateOfferForm}
         appear={true}
         timeout={{enter: 300, exit:300}}
         classNames="fade"
        >
          { showCreateOfferForm ?

              <CreateOffer getOffers={this.getOffers} renderOfferForm={this.renderOfferForm}/> 

          : <div></div> }
        </CSSTransition> 
        {loaded === false ? 
          <div>
              <Loader 
                type="Puff"
                color="lightblue"
                height="60"	
                width="60"
              /> 
          </div>  :
          <div>
          <Offercarousel2
              offers={offers} 
              deleteOffer={this.deleteOffer}
              showEditOfferForm={this.renderEditOfferForm}
          />
          </div> }

        {showEditOfferForm ? 
            <EditOffer 
            offer={offerToEdit} 
            offerID={offerToEdit._id} 
            getOffers= {this.getOffers}
            /> 
        : <div></div>}

      </DashboardOffers>
    );
  }
}

export default withAuth(Offers);
