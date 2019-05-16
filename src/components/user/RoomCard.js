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
      latitude: this.props.longitude,
      longitude: this.props.latitude,
      zoom: 11
    },
  }

  mapRef = React.createRef()
  
  componentDidMount(){
    this.setState({
      latitude: this.props.latitude,
      longitude: this.props.longitude,
    })
  }

  handleViewportChange = (viewport) => {
    viewport.width = 100%
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  }
 
  handleGeocoderViewportChange = (viewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 }
    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    })
  }
 

  render() {
    const {roomImage, roomId, description, longitude, latitude} = this.props
    return (
      <div> 
        <RoomCardStyle>
          <div>
            <ImageStyle src={roomImage} alt={roomId}></ImageStyle>
          </div>
          <DescriptionArea>
            <h2>{description}</h2>
          </DescriptionArea>
          <ReactMapGL
            ref={this.mapRef}
            {...this.state.viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            onViewportChange={this.handleViewportChange}
            children={this.props.children} 
          >
            <Marker
              key={1}
              latitude={longitude}
              longitude={latitude}
            >
              <img src="/location.svg" alt=""/>
            </Marker>
          </ReactMapGL>
        </RoomCardStyle>
      </div>
    )
  }
}
