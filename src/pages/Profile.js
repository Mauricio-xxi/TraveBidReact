import React, { Component } from 'react';
import Navbar from "../components/Navbar";
import { withAuth } from "../lib/AuthProvider";
import user from "../lib/user-service";
import  ProfileForm  from "../components/profile/ProfileForm";

class Profile extends Component {

  state = {
    user
  }

  getUser = () => {
    user.getUser()
    .then(responseData => {
      this.setState({
        user:responseData
      })
    })
    .catch( error => console.error(error) )
  }
  updateUser = (value)=>{
    console.log(value)
     user.updateUser(value)
     .then(responseData=>{
       console.log(responseData)
     })

  }

  renderProfileForm = ()=>{
    return(ProfileForm)
  }

  componentDidMount() {
    this.getUser();
  }

  render() {
    const { username } = this.state.user;
    return (
      <div>
        <Navbar/>
        <h1>Profile</h1>
        <h2>{username}</h2>  
        <ProfileForm updateUser={this.updateUser}/>
      </div>
    )
  }
}

export default withAuth(Profile);