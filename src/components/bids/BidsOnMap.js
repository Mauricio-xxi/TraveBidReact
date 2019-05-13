import React, { Component } from 'react'
import ReactMapGL, { Marker } from "react-map-gl";
import bid from "../../lib/bid-service";

class BidsOnMap extends Component {
  state = {
    viewport: {
      width: "100%",
      height: "300px",
      latitude: 41.3851,
      longitude: 2.1734,
      zoom: 11
    },
    bids:[]
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
      console.log(responseData);
      this.setState({
        bids: responseData,
      })
    })
  }

  handleViewportChange = (viewport) => {
    viewport.width = 100%
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  }

  render (){
    const bids = this.state.bids;
    console.log(bids)
    
    return (
      <div>
        {bids.length !== 0 ?  
        <ReactMapGL
        {...this.state.viewport}
        
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
          <img src="/location.svg" alt=""/>
            {/* <button
              className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setSelectedBid(bid);
              }}
            >
              <img src="/skateboarding.svg" alt="Skate Park Icon" />
            </button> */}
          </Marker>
        ))}

        {/* {selectedPark ? (
          <Popup
            latitude={selectedPark.geometry.coordinates[1]}
            longitude={selectedPark.geometry.coordinates[0]}
            onClose={() => {
              setSelectedPark(null);
            }}
          >
            <div>
              <h2>{selectedPark.properties.NAME}</h2>
              <p>{selectedPark.properties.DESCRIPTIO}</p>
            </div>
          </Popup>
        ) : null} */}
      </ReactMapGL> : <div></div> }
            
      </div>
    )
  }
}

export default BidsOnMap 
