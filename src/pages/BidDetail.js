import React, { Component } from 'react'
import UserCard from "../components/user/UserCard";
import RoomCard from '../components/user/RoomCard';
import bidService from '../lib/bid-service'
import roomService from "../lib/room-service";
import userService from "../lib/user-service";
import { Spinner } from 'reactstrap';

export default class BidDetail extends Component {
 state = {
  bid:{},
  user:{},
  room:{},
  loggedData: false,
 }

 componentDidMount() {
   this.getBid()
}

getBid = () => {
  const id = this.props.match.params.id
  bidService.getBid(id)
  .then((responseData) => {
  this.getUser(responseData.userID)
  this.setState({
      bid: responseData,
    })   
  })
}


getUser = (userID) => {
  userService.getUserBid(userID)
  .then(responseData=>{
    this.getRoom(this.state.bid.roomID)
    this.setState({
      user:responseData,
    })
  })
}


getRoom = (roomID) => {
  roomService.getRooms(roomID)
  .then(responseData=>{
    this.setState({
      room:responseData,
      loggedData: true,
    })
  })
}

  render() {
    const { username,age, description, city, userImage } = this.state.user;
    return (
      <div>
        {this.state.loggedData === true? <div>
          <p>meter Bid info</p>
        <RoomCard
          roomImage={this.state.room.roomImage} 
          description={this.state.room.description} 
          longitude={this.state.room.location.coordinates[0]} 
          latitude={this.state.room.location.coordinates[1]}
          facilities={this.state.room.facilities}
        />
        <UserCard userImage={userImage} username={username} age={age} description={description} city={city}/>
        </div>:<Spinner/>}
      </div>
    )
  }
}
