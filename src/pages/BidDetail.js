import React, { Component } from 'react'
import UserCard from "../components/user/UserCard";
import RoomCard from '../components/user/RoomCard';
import bidService from '../lib/bid-service'
import roomService from "../lib/room-service";
import userService from "../lib/user-service";
import Loader from 'react-loader-spinner'
import Navbar from "../components/Navbar";
import styled from 'styled-components';
import { Button } from 'reactstrap';

const GoBackContainer = styled.div`
  max-width: 30px;
  margin-top: 20%;
`;

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

goBack = () => {
  this.props.history.goBack();
}

  render() {
    const { username,age, description, city, userImage } = this.state.user;
    return (
      <div>
        <Navbar/>
        {this.state.loggedData === true? <div>
        <GoBackContainer>
          <Button color="primary" onClick={this.goBack}> <img style={{width: "20px"}} src="/arrow.png" alt=""/> </Button>
        </GoBackContainer> 
        <h1 style={{"color":"#007bff", "marginTop":"25px"}}>Bid Value: {this.state.bid.value} $</h1>
        <RoomCard
          roomImage={this.state.room.roomImage} 
          description={this.state.room.description} 
          longitude={this.state.room.location.coordinates[0]} 
          latitude={this.state.room.location.coordinates[1]}
          facilities={this.state.room.facilities}
        />
        <UserCard userImage={userImage} username={username} age={age} description={description} city={city}/>
        </div> :
         <div style={{textAlign: "center", marginTop:"40%"}}>
            <Loader 
              type="Puff"
              color="lightblue"
              height="60"	
              width="60"
            /> 
          </div> }

      </div>
    )
  }
}
