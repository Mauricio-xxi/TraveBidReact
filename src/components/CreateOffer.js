import React, { Component } from 'react';
import offer from '../lib/offer-service';

class CreateOffer extends Component {
  constructor(props) {
      super(props);
      this.state = {
        location: "", 
        budget: "",
        from: "",
        until:"",  
      };
  }
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const { location, budget, from, until } = this.state;
    offer.create({ location, budget, from, until })
    .then( () => {
        this.props.getAllOffers()
        this.setState({
          location:"",
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
         <label>Location:</label>
         <input type="text" name="location" value={this.state.location} onChange={e => this.handleChange(e)}/>
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

export default CreateOffer;