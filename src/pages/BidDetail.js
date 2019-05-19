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
  this.getUser()
  this.getRoom()
}

getBid = () => {
  const id = this.props.match.params.id
  bidService.getBid(id)
  .then((responseData) => {
  this.setState({
      bid: responseData,
    })
  })
}

getUser = () => {
  userService.getUser()
  .then(responseData=>{
    this.setState({
      user:responseData,
    })
  })
}

getRoom = () => {
  roomService.getRoom()
  .then(responseData=>{
    this.setState({
      room:responseData,
      loggedData: true,
    })
  })
}

  render() {
    console.log(this.props.match.params.id)
    return (
      <div>
        {this.state.loggedData === true? <p>hola</p>:<Spinner/>}
        {/* <RoomCard/>
        <UserCard/> */}
      </div>
    )
  }
}
