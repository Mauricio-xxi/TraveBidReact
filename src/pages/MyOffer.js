import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import Navbar from "../components/Navbar";
// import Offers from "../components/Offers";
import EditOffer from "../components/EditOffer";
import offer from '../lib/offer-service';


class MyOffer extends Component {
  constructor(props){
    super(props);
    this.state = {
        bids: [],
        showEditOfferForm: true,
        budget: "",
        from: "",
        until:"", 
    }
  }

  renderOfferForm = (e) => {
    this.setState({
      showEditOfferForm: !this.state.showEditOfferForm
     })
  }

  getOffer = () => {
    const offerID = this.props.match.params.id;
    offer.getOffer(offerID)
    .then(responseData => {
        this.setState({
          budget: responseData.budget,
          from: responseData.from,
          until: responseData.until, 
        })
    })
    .catch( error => console.log(error) )
  }

  componentDidMount() {
    this.getOffer();
  }
  

  render() {
    const { showEditOfferForm } = this.state;
    const { budget, from, until } = this.state;
    const offerID = this.props.match.params.id;
    console.log(offerID)
    return (
      <div>
        <Navbar />
        <h1>We are in offer detail</h1>
        <h5>{this.state.budget}</h5>
        <h5>{this.state.from}</h5>
        <h5>{this.state.until}</h5>
        <button onClick={this.renderOfferForm}>
        { showEditOfferForm ? 'Edit offer' : 'Hide'}
        </button>
        { !showEditOfferForm ? <EditOffer getOffer= {()=>this.getOffer()}offerID={offerID} budget={budget} from={from} until={until} /> : <div></div>}
      </div>
    );
  }
}

export default withAuth(MyOffer);
