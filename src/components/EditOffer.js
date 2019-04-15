import React, { Component } from 'react';
import offer from '../lib/offer-service';

class EditOffer extends Component {
  constructor(props) {
      super(props);
      this.state = {
        budget: "",
        from: "",
        until:"",  
      };
  }
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const { budget, from, until } = this.state;
    offer.edit({ budget, from, until })
    .then( () => {
        // this.props.getOffers()
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
         <input type="number" name="budget" value={this.state.budget} onChange={e => this.handleChange(e)} />
         <label>From:</label>
         <input type="date" name="from" value={this.state.from} onChange={e => this.handleChange(e)} />
         <label>Until:</label>
         <input type="date" name="until" value={this.state.until} onChange={e => this.handleChange(e)} />
         <input type="submit" value="Submit" />
       </form>
      </div>
    )
  }
}

export default EditOffer;