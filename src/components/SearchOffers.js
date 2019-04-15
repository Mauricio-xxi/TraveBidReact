import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import offer from '../lib/offer-service';


class SearchOffers extends Component {
  constructor(props){
    super(props);
    this.state = {
        searchResults: [],
        location: "CARTAGENA"
    }
  }

  
  searchOffers = () => {
    offer.searchOffers(this.state.location)
    .then(responseData => {
        this.setState({
          searchResults: responseData
        })
        console.log(responseData)
    })
    .catch( error => console.log(error) )
  }

  componentDidMount() {
    this.searchOffers();
  }

  showSearchResults(){
    const results = this.state.searchResults;
    return(
      results.map((offer)=>{
        return (
          <div key={offer._id}>
            <h5>{offer.budget}</h5>
            <h5>{offer.from}</h5>
            <h5>{offer.until}</h5>
          </div>
        )
      })
    )
  }

  render() {
    return (
      <div>
       <button onClick={this.showSearchResults}>Search Offers</button>
      </div>
    );
  }
}

export default withAuth(SearchOffers);
