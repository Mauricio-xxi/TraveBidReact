import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import bid from '../../lib/bid-service';
import EditBid from "../bids/EditBid";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import transformDate from "../../functions/dates"
import '../../stylesheets/styles.css'

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
  padding-top:15%
`;

const HandleBidButtons = styled.button`
  background-color: white;
  width:50%
  height:30%;
  padding: 0;
  margin:0;
  margin-left: 10%;
  border:0;
  cursor: pointer;
`;

const HandleBidIcons = styled.img`
  width: 100%
`;

const OfferInfo = styled.div`
  padding:5%;
`;


class Bids extends Component {
    state = {
        bids: [],
        showEditButton: false,//button to edit bid
        showEditBidForm: false,//bid edit form
    }
  

  componentDidMount() {
    this.getUserBids();
  }


  getUserBids = () => {
    bid.getUserBids(this.props.user._id)
    .then(responseData => {
        this.setState({
          bids: [...responseData.bids],
          showEditBidForm: false,
        })
    })
    .catch( error => console.log(error) )
  }

  renderEditBidForm = (e) => {
    this.setState({
      showEditBidForm: true,
     })
  }

  deleteBid = (bidID) => {
    bid.deleteBid(bidID)
    .then(()=>{
      this.getUserBids()
    })
  }
  

  render() {
    const { bids, showEditBidForm  } = this.state;
    const currentUser = this.props.user._id;
    return (
      <div>
        <h5>Your Bids</h5>
        {bids.length !== 0 && bids[0].offerID !== null ? 
        <BidSilderWrapper>
            {bids.map((bid)=>{
              console.log(bid)
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
                          { bid.userID._id === currentUser ? <HandleBidButtons onClick={()=>this.deleteBid(bid._id)}> <HandleBidIcons src="/trash.svg"/> </HandleBidButtons> : <div></div> }
                          { bid.userID._id === currentUser ? <HandleBidButtons onClick={this.renderEditBidForm}> <HandleBidIcons src="/edit.svg"/> </HandleBidButtons>:  <div></div>  }
                          { showEditBidForm ? <EditBid bidID={bid._id} description={bid.description} value={bid.value} Status={bid.Status} getBids={this.getUserBids} /> : <div></div>}
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
        </BidSilderWrapper>
        : <div><h5>You have no bids, create one!</h5></div>}
      </div>
    );
  }
}

export default withAuth(Bids);
