import React, { Component } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import transformDate from "../../functions/dates"
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';

const BidSilderWrapper = styled.div`
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  margin-left: 5%;
  padding-bottom: 5%;
`;

const ButtonsContainer = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:space-around;
  align-items:end;
`

const BidCarouselItem = styled.div`
  display: inline-block;
  width: 80%;
  padding:0;
  margin-right: 10%;
  box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.2), 0px 0px 10px 0px rgba(0,0,0,0.19);
  border: ${ ({ status }) =>  status === 1 ? '2px solid green' : status === 2 ? '2px solid red' : '' };
  border-radius: 5px;
  margin-left:10px;
  margin-top:10px;
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
                          <ButtonsContainer>
                            { bid.userID === currentUser ? 
                              <HandleBidButtons onClick={()=>deleteBid(bid._id)}> 
                              <DeleteIcon></DeleteIcon> </HandleBidButtons> 
                            : <div></div> }

                            { bid.userID === currentUser ? 
                              <HandleBidButtons onClick={()=>renderEditBidForm(bid)}> 
                              <Icon>edit_icon</Icon>  </HandleBidButtons> 
                            : <div></div>  }
                            </ButtonsContainer>
                       </BidValue>
                       <OfferInfo>
                         <h5>Offer: ${budget}</h5>
                         <p><strong>Arriving: </strong>{from}</p>
                         <p><strong>Departing: </strong>{until}</p>
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