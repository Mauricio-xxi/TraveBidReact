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
        showEditOfferForm: false,
        showEditButton: false,
        showBidButton: false,
        budget: "",
        from: "",
        until:"",
        userID:"" 
    }
  }

  renderOfferForm = (e) => {
    this.setState({
      showEditOfferForm: true,
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
          userID: responseData.userID,
        })
        if (this.state.userID !== this.props.user._id){
          this.setState({
            showBidButton: true,
          })
        } else if (this.state.userID === this.props.user._id) {
          this.setState({
            showEditButton: true,
          })
        }
    })
    .catch( error => console.log(error) )
  }

  componentDidMount() {
    this.getOffer();
  }
  

  render() {
    console.log(this.state)
    const { showEditOfferForm } = this.state;
    const { showBidButton } = this.state;
    const { showEditButton } = this.state;
    const { budget, from, until } = this.state;
    const fromISO = new Date(from);
    const fromGood = fromISO.getFullYear()+'-' + (fromISO.getMonth()+1) + '-'+fromISO.getDate();
    const untilISO = new Date(until);
    const untilGood = untilISO.getFullYear()+'-' + (untilISO.getMonth()+1) + '-'+untilISO.getDate();
    const offerID = this.props.match.params.id;
    return (
      <div>
        <Navbar />
        <h1>We are in offer detail</h1>
        <h5>{this.state.budget}</h5>
        <h5>{fromGood}</h5>
        <h5>{untilGood}</h5>
        {showBidButton ? <button>Bid</button> : <div></div> }
        {showEditButton ?  <button onClick={this.renderOfferForm}>Edit Offer</button> : <div></div>}
        
        { showEditOfferForm ? <EditOffer getOffer= {()=>this.getOffer()}offerID={offerID} budget={budget} from={from} until={until} /> : <div></div>}
      </div>
    );
  }
}

export default withAuth(MyOffer);
