import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import bid from '../../lib/bid-service';
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
  padding-top:20%
`;

const OfferInfo = styled.div`
  padding:5%;
`;


class Bids extends Component {
    state = {
        bids: [],
    }
  

  componentDidMount() {
    this.getUserBids();
  }


  getUserBids = () => {
    bid.getUserBids(this.props.user._id)
    .then(responseData => {
        this.setState({
          bids: [...responseData.bids],
        })
    })
    .catch( error => console.log(error) )
  }
  

  render() {
    const { bids } = this.state;
    return (
      <div>
        <h5>Your Bids</h5>
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
