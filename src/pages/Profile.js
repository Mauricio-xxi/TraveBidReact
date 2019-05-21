import React, { Component } from 'react';
import Navbar from "../components/Navbar";
import { withAuth } from "../lib/AuthProvider";
import userService from "../lib/user-service";
import  ProfileForm   from "../components/profile/ProfileForm";
import RoomData from "../components/user/RoomData";
import UserCard from "../components/user/UserCard";
import styled from 'styled-components';
import roomService from "../lib/room-service";
import RoomCard from "../components/user/RoomCard";
// import { ReactComponent as Edit } from "../assets/edit.svg";

const ProfileContainer = styled.div`
  display:block;
`;

const UpdateButtonsContainer = styled.div`
  text-align:center;
  width: 100%;
`;

const UpdateButtons = styled.button`
  padding: 3%;
  background-color: white;
  border: 1px solid #4285F4;
  border-radius: 8px;
  margin-top: 2%;
  color: #4285F4;
`;


class Profile extends Component {

  state = {
    user : {},
    room: {},
    showUserForm: false,
    showRoomForm: false,
    userLogged: false,
    roomLogged: false,
  }

  getUser = () => {
    userService.getUser()
    .then(responseData=>{
      this.setState({
        user:responseData,
        userLogged:true,
      })
    })
  }

  getRoom = () => {
    roomService.getRoom()
    .then(responseData=>{
      this.setState({
        room:responseData,
        roomLogged: true,
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
    const { username,age, description, city, userImage, email } = this.state.user;
    return (
      <ProfileContainer>
        <Navbar/>
        <UserCard userImage={userImage} email = {email}username={username} age={age} description={description} city={city}/>
          <UpdateButtonsContainer ><UpdateButtons style={{margin:"5px"}}onClick={this.showUserFormButton}>Update Profile</UpdateButtons></UpdateButtonsContainer> 
          {this.state.showUserForm? <ProfileForm  getUser={this.getUser} showUserFormButton={this.showUserFormButton} placeholder={this.state.user}/> : <div/> }
        
        {this.state.roomLogged !== false && this.state.room !== null? 
          <RoomCard 
          roomImage={this.state.room.roomImage} 
          description={this.state.room.description} 
          longitude={this.state.room.location.coordinates[0]} 
          latitude={this.state.room.location.coordinates[1]}
          facilities={this.state.room.facilities}
          />
        : <div></div> }
        
        <UpdateButtonsContainer ><UpdateButtons style={{margin:"5px"}}onClick={this.showRoomFormButton}>Update Room</UpdateButtons></UpdateButtonsContainer> 
          { this.state.roomLogged === true && this.state.room !== null && this.state.showRoomForm? <RoomData
                    roomID = {this.state.room._id}
                    roomImage={this.state.room.roomImage} 
                    description={this.state.room.description} 
                    longitude={this.state.room.location.coordinates[0]} 
                    latitude={this.state.room.location.coordinates[1]}
                    facilities={this.state.room.facilities}
                    exist={"true"}
                    showRoomForm={this.showRoomFormButton}
                    getRoom={this.getRoom}
          /> : <>{this.state.showRoomForm === true ?<RoomData
          roomID = {""}
          roomImage={""} 
          description={""} 
          longitude={""} 
          latitude={""}
          facilities={""}
          exist={"false"}
          showRoomForm={this.showRoomFormButton}
          getRoom={this.getRoom}
          />: <></>}</>}
      </ProfileContainer>
    )
  }
}

export default withAuth(Profile);