import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import bid from '../../lib/bid-service';
import { Link } from "react-router-dom";


class Bids extends Component {
    state = {
        bids: [],
    }
  

  componentDidMount() {
    this.getUserBids();
  }


  getUserBids = () => {
    bid.getUserBids(this.props.user._id)
    .then(responseData => {
        this.setState({
          bids: [...responseData],
        })
    })
    .catch( error => console.log(error) )
  }
  

  render() {
    return (
      <div>
        {this.state.bids.map((bid) => {
          return(
            <div key={bid._id}>
              <Link to={`/Offer/${bid.offerID}`}>
              <p>{bid.value}</p> 
              <p>Budget: {bid.description}</p>
              </Link>
            </div>
          )
        })}
        <p>------------------------</p>
      </div>
    );
  }
}

export default withAuth(Bids);
