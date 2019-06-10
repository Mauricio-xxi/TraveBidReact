import React, { Component } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import transformDate from "../../functions/dates"
import '../../stylesheets/styles.css'
import '../../stylesheets/carousel.css'
import * as images from "../../assets/cities.json";
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';

const OfferSilderWrapper = styled.div`
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  margin-top: 5%;
  margin-bottom: 5%;
  margin-left: 5%;
  padding-bottom: 2%;
`;

const OfferItemContainer = styled.div`
  display: inline-block;
  width: 80%;
  padding:0;
  margin-right: 10%;
  box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.2), 0px 0px 10px 0px rgba(0,0,0,0.19);
  border: ${ ({ status }) =>  status === 1 ? '2px solid green' : '' };
  border-radius: 5px;
  margin-left:10px;
  margin-top:10px;
`;


const OfferItemImage = styled.div`

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
  border-radius: 5px;
`;

const OfferMainInfo = styled.p`
  color: white;
  text-shadow: 0px 0px 11px black;
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
  border: 1px black;
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
const ButtonsContainer = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:end;
`

 
class Offercarousel2 extends Component {

  getImage(offer){
    if(offer){
      const url = images.default[offer]
      return({"backgroundImage":"url("+ url+")"})
    } else return "https://cdn.pixabay.com/photo/2016/01/19/17/59/new-york-city-1150012_960_720.jpg"
  }


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
                 <OfferItemImage 
                 style={this.getImage(offer.location)}
                  >
                   <Link to={`/Offer/${offer._id}`}>
                       <OfferMainInfo>{offer.location}</OfferMainInfo>
                       <OfferMainInfo>${offer.budget}</OfferMainInfo>
                   </Link>
                 </OfferItemImage>
                 <OfferInfo>
                   <p><strong>Arriving: </strong> {from} </p> 
                   <p><strong>Departing: </strong> {until} </p> 
                  <ButtonsContainer>
                   <HandleOfferButtons  onClick={()=>deleteOffer(offer._id)}> <DeleteIcon></DeleteIcon> </HandleOfferButtons>
                   <HandleOfferButtons  onClick={()=>showEditOfferForm(offer)}> <Icon>edit_icon</Icon> </HandleOfferButtons>
                  </ButtonsContainer>
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


