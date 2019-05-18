import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import CreateBid from "../bids/CreateBid";
import bid from '../../lib/bid-service';
import BidsOnMap from "../bids/BidsOnMap"
import { Button } from 'reactstrap';
import styled from 'styled-components';
import '../../stylesheets/styles.css'
import { Link } from "react-router-dom";

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
  border: ${ ({ status }) =>  status === 1 ? '2px solid green' : status === 2 ? '2px solid red' : '' };
`;

const ItemSections = styled.div`
  display: flex;
  flex-direction: row;
`;


const RoomImageContainer = styled.div`
  margin:0;
  padding:0;
`;

const UserImageContainer = styled.div`
  margin:0;
  padding:0;
  margin-left: 10%;
  padding-top: 8%;
  width: 80px;
`;

const RoomImage = styled.img`
  width: 100%;
  height:100%;
  border: 1px solid grey;
  margin:0;
`;

const UserImage = styled.img`
  width: 60%;
  border: 1px solid grey;
  border-radius: 50%;
`;

const UserBidInfo = styled.div`
  padding:2%;
`;

const HandleBidButtons = styled.button`
  background-color: white;
  width:30%;
  padding: 0;
  margin:0;
  margin-left: 5%;
  border:0;
  cursor: pointer;
`;

const HandleBidIcons = styled.img`
  width: 80%;
  padding:0;
  margin:0;
`;


class BidsOnThisOffer extends Component {
  state = {
    bids: [],
    showBidButton: false,//button to create bid
    showBidForm: false,//form to create bid
    alreadyBidded : false,
    aBidHasBeenAccepted: false,
  }

  componentDidMount() {
    this.getBids()
  }

  getBids = () => {
    const ID = this.props.offerID;
    bid.getBids(ID)
    .then((responseData) => {
      //Bids are populated with user owner info
    this.setState({
        bids: responseData,
        showBidForm: false,
        showEditBidForm: false,
      })
    })
    .then(()=>{
      this.checkIfUserBidded();
    })
    if (this.state.offerOwner !== this.props.user._id){
      this.setState({
        showBidButton: true,
      })
    } else if (this.state.offerOwner === this.props.user._id) {
      this.setState({
        showEditButton: true,
      })
    }
    
  }

  checkIfUserBidded = async () => {
      let bids = this.state.bids;
      await bids.forEach((bid)=>{
          if (this.props.user._id === bid.userID._id){
              this.setState({
                alreadyBidded: true,
              }) 
        }
      })
      await this.checkIfABidHasBeenAccepted(bids);
  }



  renderBidForm = e => {
    const { showBidForm } = this.state
    if (showBidForm === false ){
      this.setState({
        showBidForm: true,
       })
    } else if (showBidForm === true ){
      this.setState({
        showBidForm: false,
       })
    }
  }
 
  acceptBid = (bidID, Status, offerID) =>{
    bid.acceptBid({ bidID, Status, offerID })
    .then( () => {
      this.getBids()
    })
    .catch( error => console.log(error) )
  }

  declineBid = (bidID, Status) =>{
    bid.declineBid({ bidID, Status })
    .then( () => {
      this.getBids()
    })
    .catch( error => console.log(error) )
  }

  checkIfABidHasBeenAccepted = async (bids) => {
    await bids.forEach((bid)=>{
      if (bid.Status === 1){
       this.setState({
        aBidHasBeenAccepted: true,
      }) 
     }
   })
  }


  render() {
    const { bids, alreadyBidded, showBidForm, aBidHasBeenAccepted  } = this.state;
    const { offerOwner, offerID } = this.props;
    const currentUser = this.props.user._id;
    return (
      <div>
       <BidsOnMap bids={bids} offerID={this.props.offerID}/>

       <BidSilderWrapper>
          {bids.map((bid)=>{
            console.log(bid)
            return (
              <BidCarouselItem key={bid._id}>
                <ItemSections>
                  <Link to = {`/bid/${bid._id}`} >
                  <RoomImageContainer>
                    <RoomImage src={bid.roomID.roomImage} alt="roomImage"/>
                  </RoomImageContainer>
                  
                  <UserBidInfo>
                    <UserImageContainer>
                      <UserImage src={bid.userID.userImage} alt="userImage"/>
                    </UserImageContainer>
                    <p> <strong>{bid.userID.username} / ${bid.value}</strong> </p>

                    { 
                      offerOwner === this.props.user._id && aBidHasBeenAccepted === false && bid.Status === 0 ? 
                      <Button color="success" onClick= {()=>this.acceptBid(bid._id, 1, offerID)}> Accept</Button> 
                      : <div></div>  
                    }

                    { 
                      offerOwner === this.props.user._id && aBidHasBeenAccepted === false  && bid.Status === 0 ? 
                      <Button color="danger" onClick={()=>this.declineBid(bid._id, 2) }> Decline</Button> 
                      : <div></div> 
                    }
                  </UserBidInfo>
                  </Link>
                </ItemSections> 
              </BidCarouselItem>
            )
          })}
        </BidSilderWrapper>
        {console.log(offerOwner)}

      { alreadyBidded === false && offerOwner !== currentUser ?  <Button color="primary" onClick={this.renderBidForm}>Bid</Button> : <div></div>  }
      { showBidForm ?  < CreateBid offerID={offerID} getBids={this.getBids} checkIfUserBidded={this.checkIfUserBidded}/> : <div></div> }
      </div>
    );
  }
}

export default withAuth(BidsOnThisOffer);
