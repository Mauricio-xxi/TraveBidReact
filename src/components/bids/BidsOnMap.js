import React, { Component } from 'react'
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import bid from "../../lib/bid-service";

class BidsOnMap extends Component {
  state = {
    viewport: {
      width: "100%",
      height: "300px",
      latitude: 0,
      longitude: 0,
      zoom: 1
    },
    bids:[],
    selectedBid: null,
  }

  componentDidMount (){
    this.getBids()
  }

  handleViewportChange = (viewport) => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  }

  getBids = () => {
    const ID = this.props.offerID;
    bid.getBids(ID)
    .then(responseData => {
      this.setState({
        bids: responseData,
        viewport: {
          width: "100%",
          height: "300px",
          longitude: responseData[0].roomID.location.coordinates[1],  
          latitude: responseData[0].roomID.location.coordinates[0],
          zoom: 11
        }
      })
    })
    this.handleViewportChange(this.state.viewport)
  }

  handleViewportChange = (viewport) => {
    viewport.width = 100%
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  }

  selectBid = (e, bid) => {
    e.preventDefault();
    this.setState({
      selectedBid: bid,
    })
  }

  unSelectBid = () => {
    this.setState({
      selectedBid: null,
    })
  }

  render (){
    const  { bids, selectedBid, viewport } = this.state;
    console.log(bids)
    return (
      <div>
        {bids.length >= 1 ?  
          <ReactMapGL
            {...viewport}

            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            onViewportChange={this.handleViewportChange}
          >
            {bids.map(bid => (
              <Marker
                key={bid._id}
                latitude={bid.roomID.location.coordinates[0]}
                longitude={bid.roomID.location.coordinates[1]}
              >
                <button onClick={ e =>  this.selectBid(e, bid)}>
                  <img src="/location.svg" alt=""/>
                </button>
              </Marker>
            ))}

            { selectedBid !== null ? (
              <Popup
                latitude={selectedBid.roomID.location.coordinates[0]}
                longitude={selectedBid.roomID.location.coordinates[1]}
                closeButton={true} closeOnClick={true}
                onClose={this.unSelectBid }
              >
                <div>
                  <h2>{selectedBid.description}</h2>
                  <h2>{selectedBid.value}</h2>
                </div>
               </Popup>
             ) : null}
           </ReactMapGL> 
       : <div></div> } 
            
      </div>
    )
  }
}

export default BidsOnMap 
