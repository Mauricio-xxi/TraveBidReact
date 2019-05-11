import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import { Link } from "react-router-dom";
import transformDate from "../../functions/dates"


class OfferSearchResults extends Component {
  
  render() {
    const { offers } = this.props;
    return (
     <div>
       {offers.map((offer)=>{
         const from = transformDate(offer.from)
         const until = transformDate(offer.until)
         return(
           <div style={{ boxShadow: "5px  5px 5px grey",  }} key={offer._id}>
             <Link to={`/Offer/${offer._id}`}>
               <h4>{offer.budget}</h4>
               <p>{from}  to  {until}</p> 
             </Link>
           </div>
         )
       })}
     </div>
    )
  }
}

export default withAuth(OfferSearchResults);
