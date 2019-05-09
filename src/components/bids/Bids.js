import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import bid from '../../lib/bid-service';
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import '../../stylesheets/styles.css'



const BidCarouselItem = styled.div`
  width: 70%;
  height: 100%;
  color: black;
  background: ;
  border-style: solid;
  border-radius: 15px;
  border-color: grey;
  border-width: 1px;
  padding-top: 5%;
  padding-bottom: 5%;
  background-image: linear-gradient(222A68);
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
      // <div>
      //   {this.state.bids.map((bid) => {
      //     return(
      //       <div key={bid._id}>
      //         <Link to={`/Offer/${bid.offerID}`}>
      //         <p>{bid.value}</p> 
      //         <p>Budget: {bid.description}</p>
      //         </Link>
      //       </div>
      //     )
      //   })}
      //   <p>------------------------</p>
      // </div>
      <div>
        <h5>Open Bids</h5>
        <Carousel 
        showThumbs={false} 
        showArrows={false} 
        swipeable={true} 
        emulateTouch={true} 
        centerMode={true} 
        centerSlidePercentage={80}
        showStatus={false}
        infiniteLoop={true}
        showIndicators={false}
        >
  
          {bids.map((bid)=>{
            console.log(bid)
            return (
              <BidCarouselItem key={bid._id}>
              <Link to={`/Offer/${bid.offerID}`}>
                  <h5>{bid.description}</h5> 
                  <h5>${bid.value}</h5>
               </Link>
            </BidCarouselItem>
            )
          })}
        </Carousel>
      </div>
    );
  }
}

export default withAuth(Bids);
