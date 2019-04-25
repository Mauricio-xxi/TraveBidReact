import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import offer from '../../lib/offer-service';
import CreateOffer from "../offers/CreateOffer";
import { Link } from "react-router-dom";
import EditOffer from "../offers/EditOffer";




class Offers extends Component {
  constructor(props){
    super(props);
    this.state = {
        offers: [],
        showCreateOfferForm: true,
        showEditOfferForm: false,
        offerToEdit:{},
    }
  }

  componentDidMount() {
    this.getOffers();
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

  deleteOffer = (offerID) => {
    offer.deleteOffer(offerID)
    .then(() => {
      this.getOffers()
  })
    .catch( error => console.log(error) )
  }
  

  render() {
    const { showCreateOfferForm, showEditOfferForm } = this.state;
    return (
      <div>
        {this.state.offers.map((offer) => {
          const fromISO = new Date(offer.from);
          const from = fromISO.getFullYear()+'-' + (fromISO.getMonth()+1) + '-'+fromISO.getDate();
          const untilISO = new Date(offer.until);
          const until = untilISO.getFullYear()+'-' + (untilISO.getMonth()+1) + '-'+untilISO.getDate();
          return(
            <div key={offer._id}>
              <Link to={`/Offer/${offer._id}`}>
              <p>{offer.location}</p> 
              <p>From: {from}</p> 
              <p>Until: {until}</p> 
              <p>Budget: {offer.budget}</p>
              </Link>
              <button onClick={()=>this.deleteOffer(offer._id)}>Delete Offer</button> 
              <button onClick={()=>this.renderEditOfferForm(offer)}>Edit Offer</button>
            </div>
          )
        })}
        {showEditOfferForm ? <EditOffer offer={this.state.offerToEdit} offerID={this.state.offerToEdit._id} getOffers= {()=>this.getOffers()}/> : <div></div>}
        <p>------------------------</p>
        <button onClick={this.renderOfferForm}>
        { showCreateOfferForm ? 'Create offer' : 'Hide'}
        </button>
        { !showCreateOfferForm ? <CreateOffer getOffers={()=>this.getOffers()}/> : <div></div>}
      </div>
    );
  }
}

export default withAuth(Offers);
