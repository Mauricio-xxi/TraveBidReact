import React, { Component } from 'react';
import Navbar from "../components/Navbar";
import { withAuth } from "../lib/AuthProvider";
import user from "../lib/user-service";
import  ProfileForm   from "../components/profile/ProfileForm";
import RoomData from "../components/user/RoomData";
import UserCard from "../components/user/UserCard";
import styled from 'styled-components';
import { Button } from 'reactstrap';

const ProfileContainer = styled.div`
  display:block;
`;


class Profile extends Component {

  state = {
    user,
    showUserForm: false,
    showRoomForm: false,
  }

  getUser = () => {
    user.getUser()
    .then(responseData=>{
      console.log(responseData)
      this.setState({
        user:responseData
      })
    })
  }

 componentDidMount(){
   this.getUser()
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
        <Button onClick={this.showUserFormButton}>Update Profile</Button>
        {this.state.showUserForm? <ProfileForm  getUser={this.getUser} showUserFormButton={this.showUserFormButton} /> : <div/> }
        <Button onClick={this.showRoomFormButton}>Update Room</Button>
        {this.state.showRoomForm? <RoomData/> : <div/> }
      </ProfileContainer>
    )
  }
}

export default withAuth(Profile);