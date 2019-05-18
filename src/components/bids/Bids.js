import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import bid from '../../lib/bid-service';
import EditBid from "../bids/EditBid";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import transformDate from "../../functions/dates"
import '../../stylesheets/styles.css'
import Loader from 'react-loader-spinner'




const BidSilderWrapper = styled.div`
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  margin-top: 5%;
  margin-bottom: 5%;
  margin-left: 5%;
  padding-bottom: 10%;
`;

const BidCarouselItem = styled.div`
  display: inline-block;
  width: 80%;
  padding:0;
  margin-right: 10%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 15px;
`;

const InfoWrapper = styled.div`
  display:flex;
  flex-direction:row;
`;

const BidValue = styled.div`
  padding: 5%;
  padding-top:15%;
`;

const HandleBidButtons = styled.button`
  background-color: white;
  width:30%;
  padding: 0;
  margin:0;
  margin-left: 10%;
  border:0;
  cursor: pointer;
`;

const HandleBidIcons = styled.img`
  width: 100%;
`;

const OfferInfo = styled.div`
  padding:5%;
`;

const NoBidMessage = styled.h6`
  padding-top: 8%;
  padding-bottom:10%;
  margin-left: 5%;
`;

class Bids extends Component {
    state = {
        bids: [],
        showEditButton: false,//button to edit bid
        showEditBidForm: false,//bid edit form
        bidtoEdit:{},
        loaded: false,
    }

  componentDidMount() {
    this.getUserBids();
  }

  componentWillUnmount(){
    this.setState({
      loaded: false,
    })
  }


  getUserBids = () => {
    bid.getUserBids(this.props.user._id)
    .then(responseData => {
      console.log('this is response data:',responseData)
        this.setState({
          bids: responseData.bids,
          showEditBidForm: false,
          loaded: true,
        })
        console.log(this.state.bids)
    })
    .catch( error => console.log(error) )
  }

  renderEditBidForm = (bid) => {
    const { showEditBidForm } = this.state
    if (showEditBidForm === false){
       this.setState({
       showEditBidForm: true,
       bidtoEdit: bid,
      })
    } else if (showEditBidForm === true ){
      this.setState({
      showEditBidForm: false,
      bidtoEdit: bid,
     })
    }
  }

  deleteBid = (bidID) => {
    bid.deleteBid(bidID)
    .then(()=>{
      this.getUserBids()
    })
  }
  

  render() {
    const { bids, showEditBidForm, bidtoEdit } = this.state;
    const currentUser = this.props.user._id;
    return (
      <div>
        <h5>Your Bids</h5>
        {/* <BidCarousel bids={bids}deleteBid= {this.deleteBid} renderEditBidForm={this.renderEditBidForm} /> */}
        {/* {bids.length === 0 || bids === null || bids === undefined ? 
        <div>
            <Loader 
              type="Puff"
              color="lightblue"
              height="60"	
              width="60"
            /> 
          </div>  : */}
          <div>
          {bids.length !== 0 && bids[0].offerID !== null ? 
          <BidSilderWrapper>
              {bids.map((bid)=>{
                const from = transformDate(bid.offerID.from)
                const until = transformDate(bid.offerID.until)
                const {budget} = bid.offerID
                return (
                  <BidCarouselItem key={bid._id}>
                    <InfoWrapper>
                       <BidValue>
                          <Link to={`/Offer/${bid.offerID._id}`}>
                             <h3>${bid.value}</h3>
                          </Link>
                            { bid.userID === currentUser ? <HandleBidButtons onClick={()=>this.deleteBid(bid._id)}> <HandleBidIcons src="/trash.svg"/> </HandleBidButtons> : <div></div> }
                            { bid.userID === currentUser ? <HandleBidButtons onClick={()=>this.renderEditBidForm(bid)}> <HandleBidIcons src="/edit.svg"/> </HandleBidButtons>:  <div></div>  }
                       </BidValue>
                       <OfferInfo>
                         <h5>Offer: ${budget}</h5>
                         <p>Arriving:{from}</p>
                         <p>Departing:{until}</p>
                       </OfferInfo>
                    </InfoWrapper>
                  </BidCarouselItem>
                )
              })}
              { showEditBidForm ? <EditBid bidID={bidtoEdit._id} description={bidtoEdit.description} value={bidtoEdit.value} Status={bidtoEdit.Status} getBids={this.getUserBids} /> : <div></div>}
          </BidSilderWrapper>
          : <div><NoBidMessage>You have no bids, create one!</NoBidMessage></div>}
        </div> 
        {/* } */}
      </div>
    );
  }
}

export default withAuth(Bids);
