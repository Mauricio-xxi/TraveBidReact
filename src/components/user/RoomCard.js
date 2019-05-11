import React, { Component } from 'react'
import styled from 'styled-components';
import ReactMapGL, { Marker } from "react-map-gl";

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
  state = {
    viewport: {
      width: "100%",
      height: "150px",
      latitude: 41.3851,
      longitude: 2.1734,
      zoom: 11
    },
  }

  render() {
    const {RoomImage, roomId, latitude, description, longitude} = this.props
    console.log(latitude,longitude)
    return (
      <div> 
         <RoomCardStyle>
        <div>
          <ImageStyle src={RoomImage} alt={roomId}></ImageStyle>
        </div>
        <DescriptionArea>
          <h2>{description}</h2>
        </DescriptionArea>
        <ReactMapGL
        {...this.state.viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v9">
          <Marker
            key={1}
            latitude={latitude}
            longitude={longitude}
          />
          </ReactMapGL>
      </RoomCardStyle>
      </div>
    )
  }
}
