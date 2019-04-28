import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import { Link } from "react-router-dom";



class OfferSearchResults extends Component {
  
  render() {
    const { offers } = this.props;
    return (
     <div>
       <h2>All offers in your town</h2>
       {offers.map((offer)=>{
         const fromISO = new Date(offer.from);
         const from = fromISO.getFullYear()+'-' + (fromISO.getMonth()+1) + '-'+fromISO.getDate();
         const untilISO = new Date(offer.until);
         const until = untilISO.getFullYear()+'-' + (untilISO.getMonth()+1) + '-'+untilISO.getDate();
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
