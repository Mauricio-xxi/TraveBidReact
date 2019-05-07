import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import offer from '../../lib/offer-service';
import CreateOffer from "../offers/CreateOffer";
import EditOffer from "../offers/EditOffer";
// import OfferCard from "../offers/OfferCard";
import OfferCarousel from "../offers/OfferCarousel";
import { Button } from 'reactstrap';


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
          offers: responseData,
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
      <div className='centeredComponents'>

        <Button className='centeredComponents' color= "primary"onClick={this.renderOfferForm}> Create offer </Button>

        { showCreateOfferForm ? 
            <CreateOffer getOffers={this.getOffers} renderOfferForm={()=>this.renderOfferForm()}/> 
        : <div></div> }

        {/* <OfferCard 
          offers={offers}
          deleteOffer={this.deleteOffer}
          showEditOfferForm={this.renderEditOfferForm}
        /> */}

        { offers.length >= 1 ? 
          <OfferCarousel 
            offers={offers} 
            deleteOffer={this.deleteOffer}
            showEditOfferForm={this.renderEditOfferForm}
        /> : <div></div> }


        {showEditOfferForm ? 
            <EditOffer 
            offer={offerToEdit} 
            offerID={offerToEdit._id} 
            getOffers= {()=>this.getOffers()}
            /> 
        : <div></div>}

      </div>
    );
  }
}

export default withAuth(Offers);
