import React, { Component } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import transformDate from "../../functions/dates"

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

class BidCarousel extends Component {
  
  render() {
    const { bids, deleteBid, renderEditBidForm, currentUser } = this.props;
      return (
        <div>
          {bids.length !== 0 ? 
            <BidSilderWrapper>
              {bids.map((bid)=>{
                const from = transformDate(bid.offerID.from)
                const until = transformDate(bid.offerID.until)
                const {budget} = bid.offerID
                return (
                  <BidCarouselItem status={ bid.Status } key={bid._id}>
                    <InfoWrapper>
                       <BidValue>
                          <Link to={`/Offer/${bid.offerID._id}`}>
                             <h3>${bid.value}</h3>
                          </Link>
                            { bid.userID === currentUser ? 
                              <HandleBidButtons onClick={()=>deleteBid(bid._id)}> 
                              <HandleBidIcons src="/trash.svg"/> </HandleBidButtons> 
                            : <div></div> }

                            { bid.userID === currentUser ? 
                              <HandleBidButtons onClick={()=>renderEditBidForm(bid)}> 
                              <HandleBidIcons src="/edit.svg"/> </HandleBidButtons> 
                            : <div></div>  }
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
          : '' }
       </div>
      );
  }
};

export default BidCarousel