import React, { Component } from 'react';
import Navbar from "../components/Navbar";
import { withAuth } from "../lib/AuthProvider";
import user from "../lib/user-service";
import  ProfileForm   from "../components/profile/ProfileForm";
import RoomData from "../components/user/RoomData";



class Profile extends Component {

  state = {
    user,
    showUserForm: false,
    showRoomForm: false,
  }

  getUser(){
    user.getUser()
    .then(responseData=>{
      this.setState({
        user:responseData
      })
    })
  }

 componentDidMount(){
   this.getUser()
 }

 showUserFormButton = (e) => {
  this.setState({
    showUserForm:true
  })
 }

 showRoomFormButton = (e) => {
  this.setState({
    showRoomForm:true
  })
 }
  renderForm = (value)=> {
    this.setState({
      user:value.data
    })
  }

  render() {
    const { username,age, description, city, userImage } = this.state.user;
    return (
      <div>
        <Navbar/>
        <img src={userImage} alt="profile avatar"></img>
        <h1>Profile</h1>
        <h2>{username}</h2>
        <h2>{age}</h2>
        <h2>{description}</h2>
        <h2>{city}</h2>   
        <button onClick={this.showUserFormButton}>Update Profile</button>
        {this.state.showUserForm? <ProfileForm /> : <div/> }
        <button onClick={this.showRoomFormButton}>Update Room</button>
        {this.state.showRoomForm? <RoomData/> : <div/> }
        {/*  */}
      </div>
    )
  }
}

export default withAuth(Profile);