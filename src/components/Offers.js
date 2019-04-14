import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import offer from '../lib/offer-service';
import CreateOffer from "../components/CreateOffer";


class Offers extends Component {
  constructor(props){
    super(props);
    this.state = {
        offers: [],
        showCreateOfferForm: true,
    }
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

  componentDidMount() {
    this.getOffers();
  }
  

  render() {
    const { showCreateOfferForm } = this.state;
    return (
      <div>
        {this.state.offers.map((offer) => {
          return(
            <div key={offer._id}>
              <p>{offer.location}</p> 
              <p>{offer.budget}</p> 
            </div>
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
