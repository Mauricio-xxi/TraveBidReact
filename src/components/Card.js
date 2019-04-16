import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";



class Card extends Component {
  constructor(props){
    super(props);
    this.state = {
        offers: this.props.searchResults,
    }
  }


  render() {
    const offers = this.state.offers;
    console.log(offers)
    return (
     <div>
       <h2>All offers in your town</h2>
       {offers.map((offer)=>{
         return(
           <div key={offer._id}>
             <Link to={`/Offer/${offer._id}`}>
               <p>{offer.from}</p> 
               <p>{offer.until}</p> 
               <p>{offer.budget}</p>
             </Link>
           </div>
         )
       })}
       <p><strong>--------------------------------</strong></p>
     </div>
    )
  }
}

export default withAuth(Card);
