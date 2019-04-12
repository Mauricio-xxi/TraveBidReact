import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import Navbar from "../components/Navbar";
import CreateOffer from "../components/CreateOffer";


class Private extends Component {
  constructor(props){
    super(props);
    this.state = {
        offers: [], 
        bids: [],
        showCreateOfferForm: true,
    }
  }

  renderOfferForm = (e) => {
    this.setState({
      showCreateOfferForm: !this.state.showCreateOfferForm
     })
  }
  

  render() {
    const { showCreateOfferForm } = this.state;
    return (
      <div>
        <Navbar />
        <h1>Welcome {this.props.user.username}</h1>
        <button onClick={this.renderOfferForm}>
          { showCreateOfferForm ? 'Create offer' : 'Hide'}
        </button>
        { !showCreateOfferForm ? <CreateOffer /> : <div></div>}
        
      </div>
    );
  }
}

export default withAuth(Private);
