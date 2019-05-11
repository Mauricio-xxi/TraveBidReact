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

const OfferItemImage = styled.div`
  background-image: url("/city.jpg");
  background-repeat: no-repeat;
  background-position: center;
  object-fit: cover;
  background-size: cover; 
  width: 80%;
  height: 100%;
  color: white;
  border-width: 1px;
  padding-top: 10%;
  padding-bottom: 10%;
`;

const OfferItemContainer = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 15px;
`;


const OfferMainInfo = styled.p`
  color: white;
  font-size: 20px;
`;

const OfferInfo = styled.div`
width: 80%;
height: 100%;
padding-top: 4%;
padding-bottom: 4%;
`;


 
class Offercarousel2 extends Component {

  styles = {backgroundColor: 'white',}

  
    render() {
      const { showEditOfferForm, deleteOffer, offers } = this.props;
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
                  <OfferItemContainer key={offer._id}>
                    <OfferItemImage>
                      <Link to={`/Offer/${offer._id}`}>
                          <OfferMainInfo>{offer.location}</OfferMainInfo> 
                          <OfferMainInfo>${offer.budget}</OfferMainInfo>
                      </Link>
                    </OfferItemImage>
                    <OfferInfo>
                      <p>Arriving: {from}</p> 
                      <p>Departing: {until}</p> 
                      <Button color="danger" onClick={()=>deleteOffer(offer._id)}> Delete </Button>
                      <Button color="success" onClick={()=>showEditOfferForm(offer)}> Edit </Button>
                    </OfferInfo>
                 </OfferItemContainer>
                )
              })}
              
            </Carousel>
        );
    }
};

export default Offercarousel2


