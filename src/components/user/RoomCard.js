import React, { Component } from 'react'
import styled from 'styled-components';
import ReactMapGL, { Marker } from "react-map-gl";
import { Spinner } from 'reactstrap';
import { ReactComponent as TV } from "../../../src/assets/television.svg";
import { ReactComponent as Wifi } from "../../../src/assets/wifi.svg";
import { ReactComponent as Air } from "../../../src/assets/acondicionador-de-aire.svg";
import { ReactComponent as Garage } from "../../../src/assets/garaje.svg";
import { ReactComponent as HotWater } from "../../../src/assets/termometro.svg";
import { ReactComponent as Washer } from "../../../src/assets/lavadora.svg";
import { ReactComponent as Pool } from "../../../src/assets/piscina.svg";
import { ReactComponent as PrivateBathroom } from "../../../src/assets/ducha.svg";
import { ReactComponent as Wheelchair } from "../../../src/assets/silla-de-ruedas.svg";
import { ReactComponent as Smoke } from "../../../src/assets/cigarrete.svg";
import { ReactComponent as Pet } from "../../../src/assets/mascotas.svg";
import { ReactComponent as Couples } from "../../../src/assets/pareja.svg";

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
const IconsStyle = styled.div`
  display:flex;
  flex-wrap:wrap;
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
  showIcons = (facilities)=>{
    // for (const key in facilities) {
    //   console.log(`facilities.${key} => ${facilities[key]}`);

    // }
    if(!facilities){
     return( <Spinner color="primary" />)
      } else 
        {
          // {facilities.tv &&  <TV/>}
          // {facilities.wifi ? <Wifi/>:""}
          // {facilities.termo ? <HotWater/>:""}
          // {facilities.garage ? <Garage/>:""}
          // {facilities.pet ? <Pet/>:""}
          // {facilities.privateBathroom ? <PrivateBathroom/>:""}
          // {facilities.pool ? <Pool/>:""}
          // {facilities.smoke ? <Smoke/>:""}
          // {facilities.couples ? <Couples/>:""}
          // {facilities.wheelchair ? <Wheelchair/>:""}
    }
  }

  render() {
    const {roomImage, roomId, description, longitude, latitude, facilities} = this.props
    return (
      <div> 
        <RoomCardStyle>
          <div>
            <ImageStyle src={roomImage} alt={roomId}></ImageStyle>
          </div>
          <DescriptionArea>
            <h3>{description}</h3>
              {this.showIcons(facilities)}
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
