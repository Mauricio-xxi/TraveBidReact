import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import Navbar from "../components/Navbar";
import Chat from "../components/chat/Chat";

class ChatView extends Component {

  render(){

    return (

      <div>
        <Navbar/>
        <Chat/>
      </div>
    )

  }


}

export default withAuth(ChatView)