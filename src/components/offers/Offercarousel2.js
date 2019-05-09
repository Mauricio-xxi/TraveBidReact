import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import transformDate from "../../functions/dates"
import { Button } from 'reactstrap';
import '../../stylesheets/styles.css'
import '../../stylesheets/carousel.css'

const OfferCarouselItem = styled.div`
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

const OfferInfo = styled.p`
  color: black;
`;

 
class Offercarousel2 extends Component {
    render() {
      const {offers} = this.props
      const { showEditOfferForm, deleteOffer } = this.props;
        return (
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

              {offers.map((offer)=>{
                const from = transformDate(offer.from)
                const until = transformDate(offer.until)
                return (
                  <OfferCarouselItem key={offer._id}>
                  <Link to={`/Offer/${offer._id}`}>
                      <h5>{offer.location}</h5> 
                      <h5>${offer.budget}</h5>
                      <OfferInfo>Arriving: {from}</OfferInfo> 
                      <OfferInfo>Departing: {until}</OfferInfo> 
                   </Link>
                   <Button color="danger" onClick={()=>deleteOffer(offer._id)}> <img src="/delete_small.png" alt=""/> </Button>
                   <Button color="success" onClick={()=>showEditOfferForm(offer)}> <img src="/edit_small.png" alt=""/> </Button>
                </OfferCarouselItem>
                )
              })}
            </Carousel>
        );
    }
};

export default Offercarousel2


