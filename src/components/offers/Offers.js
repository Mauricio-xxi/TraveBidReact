import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import offer from '../../lib/offer-service';
import CreateOffer from "../offers/CreateOffer";
import EditOffer from "../offers/EditOffer";
import OfferCard from "../offers/OfferCard";


class Offers extends Component {
    state = {
        offers: [],
        showCreateOfferForm: true,
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
          offers: responseData,
          showEditOfferForm: false,
        })
    })
    .catch( error => console.log(error) )
  }

  renderOfferForm = (e) => {
    this.setState({
      showCreateOfferForm: !this.state.showCreateOfferForm
     })
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

        <OfferCard 
          offers={offers}
          deleteOffer={this.deleteOffer}
          showEditOfferForm={this.renderEditOfferForm}
          />

        {showEditOfferForm ? 
            <EditOffer 
            offer={offerToEdit} 
            offerID={offerToEdit._id} 
            getOffers= {()=>this.getOffers() 
            }/> 
        : <div></div>}

        <p>------------------------</p>

        <button onClick={this.renderOfferForm}>
        { showCreateOfferForm ? 'Create offer' : 'Hide'}
        </button>

        { !showCreateOfferForm ? 
            <CreateOffer getOffers={()=>this.getOffers()}/> 
        : <div></div> }

      </div>
    );
  }
}

export default withAuth(Offers);
