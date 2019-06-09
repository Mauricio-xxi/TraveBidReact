import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import Navbar from "../components/Navbar";
import Chat from "../components/chat/Chat";

class ChatView extends Component {

  render(){
    console.log(this.props)
    return (

      <div>
        <Navbar/>
        <Chat props={this.props} />
      </div>
    )

  }


}

export default withAuth(ChatView)