import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import Navbar from "../components/Navbar";
import CreateBid from "../components/CreateBid";
import EditOffer from "../components/EditOffer";
import offer from '../lib/offer-service';
import bid from '../lib/bid-service';



class MyOffer extends Component {
  constructor(props){
    super(props);
    this.state = {
        bids: [],
        showEditOfferForm: false,
        showEditButton: false,
        showBidButton: false,
        showBidForm: false,
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

  renderBidForm = (e) => {
    this.setState({
      showBidForm: true,
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

  getBids = () => {
    const offerID = this.props.match.params.id;
    bid.getBids(offerID)
    .then(responseData => {
      console.log(responseData)
      this.setState({
        bids: responseData,
        showBidForm: false,
      })
    })
  }

  componentDidMount() {
    this.getOffer();
    this.getBids();
  }
  

  render() {
    const { showEditOfferForm, showBidButton, showEditButton, showBidForm, budget, from, until } = this.state;
    const fromISO = new Date(from);
    const fromGood = fromISO.getFullYear()+'-' + (fromISO.getMonth()+1) + '-'+fromISO.getDate();
    const untilISO = new Date(until);
    const untilGood = untilISO.getFullYear()+'-' + (untilISO.getMonth()+1) + '-'+untilISO.getDate();
    const offerID = this.props.match.params.id;
    const bids = this.state.bids;
    return (
      <div>
        <Navbar />
        <h1>We are in offer detail</h1>
        <h5>{this.state.budget}</h5>
        <h5>{fromGood}</h5>
        <h5>{untilGood}</h5>
        {showEditButton ?  <button onClick={this.renderOfferForm}>Edit Offer</button> : <div></div>}
        {showEditOfferForm ? <EditOffer getOffer= {()=>this.getOffer()}offerID={offerID} budget={budget} from={from} until={until} /> : <div></div>}
        {bids.map((bid)=> {
          return (
            <div key={bid._id}>
              <p>Description: {bid.description}</p>
              <p>Value: {bid.value}</p>
            </div>
          )
        })}
        {showBidButton ? <button onClick={this.renderBidForm}>Bid</button> : <div></div> }
        {showBidForm ?  < CreateBid offerID={offerID} getBids={()=> this.getBids()}/> : <div></div>}
      </div>
    );
  }
}

export default withAuth(MyOffer);
