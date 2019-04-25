import React, { Component } from 'react';
import Navbar from "../components/Navbar";
import { withAuth } from "../lib/AuthProvider";
import { User } from "../lib/user-service";

class Profile extends Component {

  getUser = () => {
    // User.showOfferList(this.props.user._id)
    // .then(responseData => {
    //     this.setState({
    //       offers: responseData
    //     })
    // })
    // .catch( error => console.log(error) )
  }

  componentDidMount() {
    //this.getUser();
  }


  render() {
    return (
      <div>
        <Navbar/>
        <h1>Edit your Profile</h1>
      </div>
    )
  }
}

export default withAuth(Profile);