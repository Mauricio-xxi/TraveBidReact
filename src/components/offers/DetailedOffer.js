import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import offer from '../../lib/offer-service';
import transformDate from "../../functions/dates"
import BidsOnThisOffer from "../bids/BidsOnThisOffer"
import styled from 'styled-components';
import Loader from 'react-loader-spinner'


const Container = styled.div`
  margin-top: 20%;
`;

const OfferContainer = styled.div`
  display:flex;
  flex-direction:row;
  flex-wrap:nowrap;
  justify-content:space-between;
`;

const OfferInfo = styled.div`
  width:100%;
  padding:3%;
`;

const UserInfo = styled.div`
  padding:3%;
  width:100%;
  margin-left:20%;
  padding-top: 0;
`;

const UserImage = styled.img`
  border-radius: 50%;
  width:100px;
  height: 100px;
`;

const UserText = styled.p`
  padding-left: 15%;
  margin-top: 5%;
  margin-bottom: 0;
`;


class OfferDetail extends Component {
  state = {
      budget: "",
      from: "",
      until:"",
      offerOwner:{},
      loaded: false,
  }

  getOffer = () => {
    const offerID = this.props.offerID;
    offer.getOffer(offerID)
    .then(responseData => {
      //populated with userInfo
        this.setState({
          budget: responseData.budget,
          from: responseData.from,
          until: responseData.until,
          offerOwner: responseData.userID,
          loaded: true,
        })
    })
    .catch( error => console.log(error) )
  }

  componentDidMount() {
    this.getOffer();
  }

  render() {
    const { from, until, offerOwner, budget, loaded } = this.state;
    const fromFormated = transformDate(from)
    const untilFormated = transformDate(until)
    const { offerID } = this.props;
    return (
      <Container>
        { loaded === false ? 
        <div>
          <Loader 
            type="Puff"
            color="lightblue"
            height="60"	
            width="60"
            /> 
        </div> 
        : <div>
        <OfferContainer>
          <OfferInfo>
            <h3>${budget}</h3>
            <p>{fromFormated }</p>
            <p>{untilFormated}</p>
          </OfferInfo>
          <UserInfo>
            <UserImage src={offerOwner.userImage} alt="userImage"></UserImage>
            <UserText> <strong>{offerOwner.username}, {offerOwner.age}</strong> </UserText>
          </UserInfo>
        </OfferContainer>
        <BidsOnThisOffer offerID={offerID} offerOwner={offerOwner}/>
        </div>
        }
      </Container>
      
    );
  }
}

export default withAuth(OfferDetail);
