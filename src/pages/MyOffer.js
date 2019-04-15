import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import Navbar from "../components/Navbar";
// import Offers from "../components/Offers";
import EditOffer from "../components/EditOffer";
// import offer from '../lib/offer-service';


class MyOffer extends Component {
  constructor(props){
    super(props);
    this.state = {
        bids: [],
        showEditOfferForm: true,
    }
  }

  renderOfferForm = (e) => {
    this.setState({
      showEditOfferForm: !this.state.showEditOfferForm
     })
  }

  // getAllOffers = () => {
  //   offer.showOfferList(this.props.user._id)
  //   .then(responseData => {
  //       this.setState({
  //         offers: responseData
  //       })
  //   })
  //   .catch( error => console.log(error) )
  // }

  // componentDidMount() {
  //   this.getAllOffers();
  // }
  

  render() {
    const { showEditOfferForm } = this.state;
    return (
      <div>
        <Navbar />
        <h1>We are in offer detail</h1>
        <button onClick={this.showEditOfferForm}>
        { showEditOfferForm ? 'Edit offer' : 'Hide'}
        </button>
        { !showEditOfferForm ? <EditOffer /> : <div></div>}
      </div>
    );
  }
}

export default withAuth(MyOffer);
