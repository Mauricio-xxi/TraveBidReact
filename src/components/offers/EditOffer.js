import React, { Component } from 'react';
import offer from '../../lib/offer-service';

class EditOffer extends Component {
      
    state = {
        budget: this.props.offer.budget,
        from: this.props.offer.from,
        until: this.props.offer.until, 
      };
  

  // componentDidMount() {
  //   this.setState({
  //     budget: this.props.offer.budget,
  //     from: this.props.offer.from,
  //     until: this.props.offer.until, 
  //   });
  // }
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const offerID = this.props.offerID;
    const { budget, from, until } = this.state;
    offer.editOffer({ offerID, budget, from, until })
    .then( (data) => {
      console.log(data)
        this.props.getOffers()
        this.setState({
          budget: "",
          from: "",
          until:"", 
        })
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
      const { name, value } = event.target;
      this.setState({[name]: value})
  }

  render() {
    return(
      <div>
       <form onSubmit={this.handleFormSubmit}>
         <label>Budget:</label>
         <input type="number" name="budget"  onChange={e => this.handleChange(e)} />
         <label>From:</label>
         <input type="date" name="from" onChange={e => this.handleChange(e)} />
         <label>Until:</label>
         <input type="date" name="until"  onChange={e => this.handleChange(e)} />
         <input type="submit" value="Submit" />
       </form>
      </div>
    )
  }
}

export default EditOffer;