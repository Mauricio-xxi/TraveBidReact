import React, { Component } from 'react';
import Navbar from "../components/Navbar";
import { withAuth } from "../lib/AuthProvider";
import user from "../lib/user-service";
import  ProfileForm   from "../components/profile/ProfileForm";
import RoomData from "../components/user/RoomData";
import UserCard from "../components/user/UserCard";
import styled from 'styled-components';
import { Button } from 'reactstrap';
import room from "../lib/room-service";
import RoomCard from "../components/user/RoomCard";

const ProfileContainer = styled.div`
  display:block;
`;



class Profile extends Component {

  state = {
    user,
    room,
    showUserForm: false,
    showRoomForm: false,
  }

  getUser = () => {
    user.getUser()
    .then(responseData=>{
      this.setState({
        user:responseData
      })
    })
  }

  getRoom = () => {
    room.getRoom()
    .then(responseData=>{
      console.log(responseData)
      this.setState({
        room:responseData
      })
    })
  }

 componentDidMount(){
   this.getUser()
   this.getRoom()
 }

 showUserFormButton = (e) => {
  const { showUserForm} = this.state
  if(showUserForm){this.setState({
   showUserForm:false
 })} else {this.setState({
   showUserForm:true
 })}
 }

 showRoomFormButton = (e) => {
   const { showRoomForm} = this.state
   if(showRoomForm){this.setState({
    showRoomForm:false
  })} else {this.setState({
    showRoomForm:true
  })}
 }
  renderForm = (value)=> {
    this.setState({
      user:value.data
    })
  }

  render() {
    const { username,age, description, city, userImage } = this.state.user;
    return (
      <ProfileContainer>
        <Navbar/>
        <UserCard userImage={userImage} username={username} age={age} description={description} city={city}/>
          <Button style={{margin:"5px"}}onClick={this.showUserFormButton}>Update Profile</Button>
          {this.state.showUserForm? <ProfileForm  getUser={this.getUser} showUserFormButton={this.showUserFormButton} placeholder={this.state.user}/> : <div/> }
        
        {this.state.room !== null ? 
          <RoomCard 
          roomImage={this.state.room.roomImage} 
          description={this.state.room.description} 
          longitude={41.397800000000025} 
          latitude={2.190348999999946}
          />
        : <div></div> }
        
          <Button style={{margin:"5px"}}onClick={this.showRoomFormButton}>Update Room</Button>
          {this.state.showRoomForm? <RoomData/> : <div/> }
      </ProfileContainer>
    )
  }
}

export default withAuth(Profile);