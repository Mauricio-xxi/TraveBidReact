import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import { Link } from "react-router-dom";
import transformDate from "../../functions/dates"
import styled from 'styled-components';

const OffersContainer = styled.div`
  padding-top: 15%;
  height: 100%;
  background-color: #F8F9FA;
`;

const Offer = styled.div`
    margin-right:5vw;
    padding-left:12%;
    position:relative;
    /* right:90%; */
    margin-top:10%;
    display:flex;
    flex-direction:row;
`;

const UserInfo = styled.div`
  /* padding:3%;
  width:100%;
  margin-left:20%; */
  max-width: 200px;
  display: flex;
  flex-direction: row;
  max-width: 250px;
`;
const UserText = styled.div`
  width: 50%;
  margin-left: 5%;
`;

const UserImage = styled.img`
  border-radius: 50%;
  /* width:50%; */
  height: 100px;
  width: 100px;
`;

class OfferSearchResults extends Component {

  render() {
    const { offers } = this.props
    return (

      <div>
        {offers.length >=1 ? 
        <OffersContainer>
        {offers.map((offer)=>{
         const from = transformDate(offer.from)
         const until = transformDate(offer.until)
         return(
           <Offer key={offer._id}>
             <Link to={`/Offer/${offer._id}`}>
                <UserInfo>
                  <UserImage src={offer.userID.userImage} alt="userImage"></UserImage>
                  <UserText>
                    <p style={{paddingTop: "2%"}}> <strong>{offer.userID.username}/${offer.budget}</strong> </p>
                    <p style={{width: "150px"}}>From: {from} Until:{until} </p>
                  </UserText>
                </UserInfo> 
             </Link>
           </Offer>
         )
       })}
        </OffersContainer>
      : '' }
      </div>
    )
  }
}

export default withAuth(OfferSearchResults);
