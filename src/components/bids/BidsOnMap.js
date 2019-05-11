// import React, { useState, useEffect } from "react";
import React, { Component } from 'react'
import ReactMapGL, { Marker } from "react-map-gl";
// import * as parkDate from "../components/data/skateboard-parks.json";
import room from "../../lib/room-service";
import bid from "../../lib/bid-service";
// import { div } from 'gl-matrix/src/gl-matrix/vec2';

// export default function App() {
//   const [viewport, setViewport] = useState({
//     latitude: 45.4211,
//     longitude: -75.6903,
//     width: "100vw",
//     height: "70vh",
//     zoom: 10
//   });

class BidsOnMap extends Component {
  state = {
    viewport: {
      width: "100vw",
      height: "70vh",
      latitude: 41.3851,
      longitude: 2.1734,
      zoom: 11
    },
    rooms:[],
    bids:[]
  }

  handleViewportChange = (viewport) => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
    // this.props.getCoordinates([this.state.viewport.latitude, this.state.viewport.longitude])
  }

  getBids = () => {
    const ID = this.props.offerID;
    bid.getBids(ID)
    .then(responseData => {
      this.setState({
        bids: responseData,
      })
      this.getRooms()
    })
  }

  getRooms = () => {
    const bids = this.state.bids
    bids.forEach((bid)=>{
      room.getRooms(bid.roomID)
      .then( (room) => {
        this.setState({
          rooms: [...this.state.rooms, room]
        })
        console.log(this.state.rooms)
      })
      .catch( error => console.log(error) )
    })
  }
  
 
  componentDidMount (){
    this.getBids()
  }
 

//   console.log(this.props.bids)
//   const [bids, setBids] = useState(this.props.bids)

//   const roomIDs = bids.map((bid) => {
//     return room.getRooms(bid.roomID)
//   })

//   console.log(roomIDs);


  // const [selectedBid, setSelectedBid] = useState(null);

  // useEffect(() => {
  //   const listener = e => {
  //     if (e.key === "Escape") {
  //       setSelectedBid(null);
  //     }
  //   };
  //   window.addEventListener("keydown", listener);

  //   return () => {
  //     window.removeEventListener("keydown", listener);
  //   };
  // }, []);


  render (){
    const rooms = this.state.rooms;
    
    return (
      <div>
        {rooms.length >= 1 ?  <ReactMapGL
        {...this.state.viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onViewportChange={this.handleViewportChange}
      >
        {rooms.map(room => (
          <Marker
            key={room._id}
            latitude={room.location.coordinates[1]}
            longitude={room.location.coordinates[0]}
          >
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
      </ReactMapGL> : <div>No bids yet</div> }
            
      </div>
    )
  }
}

  // return (
  //   <div>

      /* <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        // mapStyle="mapbox://styles/leighhalliday/cjufmjn1r2kic1fl9wxg7u1l4"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        {bids.map(bid => (
          <Marker
            key={park.properties.PARK_ID}
            latitude={park.geometry.coordinates[1]}
            longitude={park.geometry.coordinates[0]}
          >
            <button
              className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setSelectedBid(bid);
              }}
            >
              <img src="/skateboarding.svg" alt="Skate Park Icon" />
            </button>
          </Marker>
        ))}

        {selectedPark ? (
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
        ) : null}
      </ReactMapGL> */
//     </div>
//   );
// }

export default BidsOnMap 
