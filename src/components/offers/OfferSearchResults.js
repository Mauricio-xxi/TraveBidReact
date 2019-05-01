import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import { Link } from "react-router-dom";
import transformDate from "../../functions/dates"



class OfferSearchResults extends Component {
  
  render() {
    const { offers } = this.props;
    return (
     <div>
       <h2>All offers in your town</h2>
       {offers.map((offer)=>{
         const from = transformDate(offer.from)
         const until = transformDate(offer.until)
         return(
           <div key={offer._id}>
             <Link to={`/Offer/${offer._id}`}>
               <h4>{offer.budget}</h4>
               <p>{from}</p> 
               <p>{until}</p> 
             </Link>
           </div>
         )
       })}
       <p><strong>--------------------------------</strong></p>
     </div>
    )
  }
}

export default withAuth(OfferSearchResults);
