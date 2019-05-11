import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import React, { Component } from 'react'
import MapGL from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
 

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
 
class RoomGeo extends Component {
  state = {
    viewport: {
      width: "100%",
      height: 400,  
      latitude: 41.3851,
      longitude: 2.1734,
      zoom: 11
    }
  }
 
  mapRef = React.createRef()
 
  componentDidMount() {
    // window.addEventListener('resize', this.resize)
    // this.resize()
  }
 
  componentWillUnmount() {
    // window.removeEventListener('resize', this.resize)
  }
 
  resize = () => {
    // this.handleViewportChange({
    //   width: window.innerWidth,
    //   height: window.innerHeight
    // })
  }
 
  handleViewportChange = (viewport) => {
    viewport.width = 100%
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
    this.props.getCoordinates([this.state.viewport.latitude, this.state.viewport.longitude])
  }
 
  handleGeocoderViewportChange = (viewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 }
    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    })
  }
 
  render() {
    return (
      <MapGL
        style={{width: "100%", height: "500px"}}
        ref={this.mapRef}
        {...this.state.viewport}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onViewportChange={this.handleViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN} 
        >
        <Geocoder
          mapRef={this.mapRef}
          onViewportChange={this.handleGeocoderViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          // onResult={(results) => {
          //   console.log("test", results);
          // }}
          // onError={(error) =>{
          //   console.log(error);
          // }}
        />
      </MapGL>
    )
  }
}
 
export default RoomGeo