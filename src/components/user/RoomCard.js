import React, { Component } from 'react'
import styled from 'styled-components';
import ReactMapGL, { Marker } from "react-map-gl";
import { Spinner } from 'reactstrap';
import Comodities from "./Comodities";

const RoomCardStyle = styled.div`
  width:100%;
  color: black;
  border-style: none;
  border-color: black;
  border-width: 1px;
  padding: 5%, 0%;
  box-shadow: 5px  10px 10px grey;
  margin-top:15%;
  border-radius:5px;
`;

const ImageStyle = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 5px;
`;

const DescriptionArea = styled.div`
  padding: 1.5em;
`;

export default class RoomCard extends Component {
  state = {
    viewport: {
      width: "100%",
      height: "200px",
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
    const {roomImage, roomId, description, longitude, latitude, facilities} = this.props
    return (
      <div> 
        <RoomCardStyle>
          <div>
          {roomImage? <ImageStyle src={roomImage} alt={roomId}/>:<Spinner/> } 
          </div>
          <DescriptionArea>
          { description ? <h6 style={{textAlign: "center"}}>{description}</h6>:<Spinner/> } 
          
          { facilities ? <Comodities icons={facilities}/>:<Spinner/> }
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
