import React, { Component } from 'react'
import styled from 'styled-components';
import Loader from 'react-loader-spinner'

const UserCardStyle = styled.div`
  width:100%;
  color: black;
  border-style: none;
  border-color: black;
  border-width: 1px;
  padding: 5%, 0%;
  box-shadow: 5px 10px 10px grey;
  margin-top:15%;
  border-radius: 8px;
  text-align:center; 
  margin-top: 20%;
`;

const UserImageContainer = styled.div`
  width: 100%;
`;

const ImageStyle = styled.img`
  padding: 5%;
  max-width: 80%;
  /* max-height: 300px; */
  border-radius: 50%;
`
const DescriptionArea = styled.div`
  padding: 1.5em;
`


export default class UserCard extends Component {

  render() {
    const {userImage,username,age, description, city} = this.props
    return (
      <UserCardStyle>
        {userImage !== undefined ?
        <div>
        <UserImageContainer>
           <ImageStyle src={userImage} alt={username}/>
        </UserImageContainer>
        <DescriptionArea>
          <h2>{username}, {age}</h2>
           <p>{description}</p>
          <h6>{city}</h6>
        </DescriptionArea>
        </div>
        : <div>
            <Loader 
              type="Puff"
              color="lightblue"
              height="60"	
              width="60"
            /> 
          </div> }
      </UserCardStyle>
    )
  }
}
