import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import offer from '../lib/offer-service';
import CreateOffer from "../components/CreateOffer";
import { Link } from "react-router-dom";



class Offers extends Component {
  constructor(props){
    super(props);
    this.state = {
        offers: [],
        showCreateOfferForm: true,
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

  getOffers = () => {
    offer.showOfferList(this.props.user._id)
    .then(responseData => {
        this.setState({
          offers: responseData
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
    const { showCreateOfferForm } = this.state;
    return (
      <div>
        {this.state.offers.map((offer) => {
          return(
            <Link to={`/Offer/${offer._id}`}>
            <div key={offer._id}>
              <p>{offer.location}</p> 
              <p>{offer.from}</p> 
              <p>{offer.until}</p> 
              <p>{offer.budget}</p>
              <button onClick={()=>this.deleteOffer(offer._id)}></button> 
            </div>
            </Link>
          )
        })}
        <button onClick={this.renderOfferForm}>
        { showCreateOfferForm ? 'Create offer' : 'Hide'}
        </button>
        { !showCreateOfferForm ? <CreateOffer getOffers={()=>this.getOffers()}/> : <div></div>}
      </div>
    );
  }
}

export default withAuth(Offers);
