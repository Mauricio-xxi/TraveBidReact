import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import Navbar from "../components/Navbar";
import CreateOffer from "../components/CreateOffer";
import Offers from "../components/Offers";
import offer from '../lib/offer-service';


class Private extends Component {
  constructor(props){
    super(props);
    this.state = {
        offers: [], 
        bids: [],
        showCreateOfferForm: true,
    }
  }

  renderOfferForm = (e) => {
    this.setState({
      showCreateOfferForm: !this.state.showCreateOfferForm
     })
  }

  getAllOffers = () => {
    offer.showOfferList(this.props.user._id)
    .then(responseData => {
        this.setState({
          offers: responseData
        })
    })
    .catch( error => console.log(error) )
  }
  

  render() {
    const { showCreateOfferForm } = this.state;
    return (
      <div>
        <Navbar />
        <h1>Welcome {this.props.user.username}</h1>
        <Offers offers={this.state.offers} />
        <button onClick={this.renderOfferForm}>
          { showCreateOfferForm ? 'Create offer' : 'Hide'}
        </button>
        { !showCreateOfferForm ? <CreateOffer getAllOffers={()=>this.getAllOffers()}/> : <div></div>}
        
      </div>
    );
  }
}

export default withAuth(Private);
