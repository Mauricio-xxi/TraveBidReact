import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import { Link } from "react-router-dom";
import transformDate from "../../functions/dates"
import styled from 'styled-components';
// import { Transition } from 'react-transition-group'

// const duration = 1000

// const sidebarStyle = {
//   transition: `width ${duration}ms`
// }
// const sidebarTransitionStyles = {
//   entering: { width: 0 },
//   entered: { width: '100%' },
//   exiting: { width: '100%' },
//   exited: { width: 0, height:0 }
// }
// const linkStyle = {
//   transition: `opacity ${duration}ms`
// }
// const linkTransitionStyles = {
//   entering: { opacity: 0 },
//   entered: { opacity: 1 },
//   exiting: { opacity: 1 },
//   exited: { opacity: 0 }
// }

const OffersContainer = styled.div`
  padding-top: 15%;
  height: 100%;
  background-color: #F8F9FA;
`;

const Offer = styled.div`
    margin-right:5vw;
    padding-left:12%;
    position:relative;
    right:90%;
    margin-top:10%;
    display:flex;
    flex-direction:row;
`;

// const OfferContainer = styled.div`
//   display:flex;
//   flex-direction:row;
// `;

// const OfferInfo = styled.div`
//   width:100%;
//   padding:3%;
// `;

const UserInfo = styled.div`
  padding:3%;
  width:100%;
  margin-left:20%;
`;

const UserImage = styled.img`
  border-radius: 50%;
  width:50%;
`;

class OfferSearchResults extends Component {

  render() {
    const { offers } = this.props
    return (

      <div>
        <OffersContainer>
        {offers.map((offer)=>{
         const from = transformDate(offer.from)
         const until = transformDate(offer.until)
         return(
           <Offer key={offer._id}>
           
             <Link to={`/Offer/${offer._id}`}>
                <UserInfo>
                  <UserImage src={offer.userID.userImage} alt="userImage"></UserImage>
                  <p> <strong>{offer.userID.username}/${offer.budget}</strong> </p>
                  <p>{from}  to  {until}</p>
                </UserInfo> 
             </Link>
          
           </Offer>
         )
       })}
        </OffersContainer>
      </div>
    )
  }
}

export default withAuth(OfferSearchResults);
