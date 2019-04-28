import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import CreateBid from "../bids/CreateBid";
import EditBid from "../bids/EditBid";
import offer from '../../lib/offer-service';
import bid from '../../lib/bid-service';



class OfferDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
        bids: [],
        showEditButton: false,
        showBidButton: false,
        showBidForm: false,
        showEditBidForm: false,
        alreadyBidded : false,
        budget: "",
        from: "",
        until:"",
        offerOwner:"" 
    }
  }


  renderBidForm = (e) => {
    this.setState({
      showBidForm: true,
     })
  }

  renderEditBidForm = (e) => {
    this.setState({
      showEditBidForm: true,
     })
  }

  getOffer = () => {
    const offerID = this.props.offerID;
    offer.getOffer(offerID)
    .then(responseData => {
        this.setState({
          budget: responseData.budget,
          from: responseData.from,
          until: responseData.until,
          offerOwner: responseData.userID,
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


  checkIfUserBidded = () => {
    let bids = this.state.bids;
      bids.forEach((bid)=>{
        if (this.props.user._id === bid.userID){
         this.setState({
          alreadyBidded: true,
        }) 
      }
    })
  }

  getBids = () => {
    const ID = this.props.offerID;
    bid.getBids(ID)
    .then(responseData => {
      this.setState({
        bids: [...responseData],
        showBidForm: false,
        showEditBidForm: false,
      })
      this.checkIfUserBidded();
    })
  }

  componentDidMount() {
    this.getOffer();
    this.getBids();
  }

  

  deleteBid = (bidID) => {
    bid.deleteBid(bidID)
    .then(()=>{
      this.getBids()
    })
  }

  render() {
    const { showBidForm, from, until } = this.state;
    const fromISO = new Date(from);
    const fromGood = fromISO.getFullYear()+'-' + (fromISO.getMonth()+1) + '-'+fromISO.getDate();
    const untilISO = new Date(until);
    const untilGood = untilISO.getFullYear()+'-' + (untilISO.getMonth()+1) + '-'+untilISO.getDate();
    const { offerID } = this.props;
    const currentUser = this.props.user._id;
    const { bids, offerOwner, alreadyBidded } = this.state;
    return (
      <div>
        <h1>We are in offer detail</h1>
        <h5>{this.state.budget}</h5>
        <h5>{fromGood}</h5>
        <h5>{untilGood}</h5>
        {bids.map((bid)=> {
          const { showEditBidForm } = this.state;
          const currentUser = this.props.user._id;
          return (
            <div key={bid._id}>
              <p>----------------------------------------</p>
              <p>Description: {bid.description}</p>
              <p>Value: {bid.value} </p>
              {bid.userID === currentUser ? <button onClick={()=>this.deleteBid(bid._id)}>Delete</button> : <div></div> }
              {bid.userID === currentUser ? <button onClick={this.renderEditBidForm}>Edit</button>:  <div></div>  }
              { showEditBidForm ? <EditBid bidID={bid._id} description={bid.description} value={bid.value} getBids={()=> this.getBids()} /> : <div></div>}
              {/* {bid.userID !== this.props.user._id ? <button onClick={this.acceptBid(bid._id)}>Accept</button> : <div></div> }
              {bid.userID !== this.props.user._id ? <button onClick={this.rejectBid(bid._id)}>Reject</button> : <div></div> } */}
              <p>--------------------------------------------</p>
            </div>
          )
        })}
        { alreadyBidded === false && offerOwner !== currentUser ?  <button onClick={this.renderBidForm}>Bid</button> : <div></div>  }
        { showBidForm ?  < CreateBid offerID={offerID} getBids={()=> this.getBids()} checkIfUserBidded={()=>this.checkIfUserBidded()}/> : <div></div> }
      </div>
    );
  }
}

export default withAuth(OfferDetail);
