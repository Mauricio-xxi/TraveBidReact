import React, { Component } from 'react'
import styled from 'styled-components';

const RoomCardStyle = styled.div`
  width:100%;
  display:;
  color: black;
  border-style: none;
  border-color: black;
  border-width: 1px;
  padding: 5%, 0%;
  box-shadow: 5px  10px 10px grey;
  margin-top:15%;
`;
const ImageStyle = styled.img`
  max-width: 100%;
  max-height: 100%;
`
const DescriptionArea = styled.div`
  padding: 1.5em;
`

export default class RoomCard extends Component {
  render() {
    const {RoomImage, roomId, location, description } = this.props
    return (
      <div> 
         <RoomCardStyle>
        <div>
          <ImageStyle src={RoomImage} alt={roomId}></ImageStyle>
        </div>
        <DescriptionArea>
          <h2>{description}</h2>
          <p>{location}</p>
        </DescriptionArea>
      </RoomCardStyle>
      </div>
    )
  }
}
