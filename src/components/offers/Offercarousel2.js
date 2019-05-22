import React, { Component } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import transformDate from "../../functions/dates"
import '../../stylesheets/styles.css'
import '../../stylesheets/carousel.css'

const OfferSilderWrapper = styled.div`
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  margin-top: 10%;
  margin-bottom: 5%;
  margin-left: 5%;
  padding-bottom: 10%;
`;

const OfferItemContainer = styled.div`
  display: inline-block;
  width: 80%;
  padding:0;
  margin-right: 10%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border: ${ ({ status }) =>  status === 1 ? '2px solid green' : '' };
  border-radius: 15px;
`;

const OfferItemImage = styled.div`
  background-image: url("/city.jpg");
  background-repeat: no-repeat;
  background-position: center;
  object-fit: cover;
  background-size: cover; 
  width: 100%;
  height: 100%;
  color: white;
  border-width: 1px;
  padding:0;
  padding-top: 10%;
  padding-bottom: 10%;
  border-radius: 15px;
`;


const OfferMainInfo = styled.p`
  color: white;
  font-size: 20px;
  padding-left: 10%;
`;

const OfferInfo = styled.div`
  width: 80%;
  height: 100%;
  padding-top: 4%;
  padding-bottom: 4%;
  padding-left: 10%;
`;

const HandleOfferButtons = styled.button`
  background-color: white;
  width:25%;
  height:20%;
  padding: 0;
  margin:0;
  margin-left: 5%;
  border:0;
  cursor: pointer;
`;

const HandleOfferIcons = styled.img`
  width: 50%;
  height:12%;
  padding:0;
  margin:0;
`;

const NoOfferMessage = styled.h6`
  padding-top: 8%;
  padding-bottom:10%;
  margin-left: 5%;
`;


 
class Offercarousel2 extends Component {
  
    render() {
      const { showEditOfferForm, deleteOffer, offers } = this.props;
        return (
          <div>
          {offers.length !== 0 ? 
          <OfferSilderWrapper>
           {offers.map((offer)=>{
             const from = transformDate(offer.from)
             const until = transformDate(offer.until)
             return (
               <OfferItemContainer status={ offer.Status } key={offer._id}>
                 <OfferItemImage>
                   <Link to={`/Offer/${offer._id}`}>
                       <OfferMainInfo>{offer.location}</OfferMainInfo>
                       <OfferMainInfo>${offer.budget}</OfferMainInfo>
                   </Link>
                 </OfferItemImage>
                 <OfferInfo>
                   <p>Arriving: <strong>{from}</strong> </p> 
                   <p>Departing: <strong>{until}</strong> </p> 
                   <HandleOfferButtons  onClick={()=>deleteOffer(offer._id)}> <HandleOfferIcons src="/trash.svg"/> </HandleOfferButtons>
                   <HandleOfferButtons  onClick={()=>showEditOfferForm(offer)}> <HandleOfferIcons src="/edit.svg"/> </HandleOfferButtons>
                 </OfferInfo>
              </OfferItemContainer>
             )
           })}
         </OfferSilderWrapper>
         : <div><NoOfferMessage>You have no offers, create one!</NoOfferMessage></div>}
         </div>
        );
    }
};

export default Offercarousel2


