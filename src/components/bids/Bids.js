import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import bid from '../../lib/bid-service';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import '../../stylesheets/styles.css'

const BidSilderWrapper = styled.div`
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  margin-top: 10%;
  margin-bottom: 5%;
  margin-left: 5%;
  padding-bottom: 10%;
`;

const BidCarouselItem = styled.div`
  display: inline-block;
  width: 60%;
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
`;

const OfferInfo = styled.div`
  padding-left:8%;
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
          bids: [...responseData],
        })
    })
    .catch( error => console.log(error) )
  }
  

  render() {
    const { bids } = this.state;
    return (

      <BidSilderWrapper>
          {bids.map((bid)=>{
            return (
              <BidCarouselItem key={bid._id}>
                <InfoWrapper>
                   <BidValue>
                      <Link to={`/Offer/${bid.offerID}`}>
                         <h3>${bid.value}</h3>
                      </Link>
                   </BidValue>
                   <OfferInfo>
                     <p>Offer Info</p>
                   </OfferInfo>
                </InfoWrapper>
              </BidCarouselItem>
            )
          })}
      </BidSilderWrapper>
    );
  }
}

export default withAuth(Bids);
