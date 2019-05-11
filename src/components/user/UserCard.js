import React, { Component } from 'react'
import styled from 'styled-components';

const UserCardStyle = styled.div`
  width:100%;
  display:;
  color: black;
  border-style: solid;
  border-color: #007bff;
  border-width: 1px;
  padding: 5%;
`;
const ImageStyle = styled.img`
  max-width: 100%;
  max-height: 100%;
`

export default class UserCard extends Component {
  render() {
    const {userImage,username,age, description, city} = this.props
    return (
      <UserCardStyle>
        <div>
          <ImageStyle src={userImage} alt={username}></ImageStyle>
        </div>
        <div>
          <h2>{username}, {age}</h2>
          <p>{description}</p>
          <h3>{city}</h3>
        </div>
      </UserCardStyle>
    )
  }
}
