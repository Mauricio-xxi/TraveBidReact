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

  componentDidMount() {
    this.setState({
      budget: this.props.budget,
      from: this.props.from,
      until: this.props.until, 
    });
  }
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const offerID = this.props.offerID;
    const { budget, from, until } = this.state;
    offer.editOffer({ offerID, budget, from, until })
    .then( () => {
        this.props.getOffer()
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
    const { budget, from, until } = this.state;
    return(
      <div>
       <form onSubmit={this.handleFormSubmit}>
         <label>Budget:</label>
         <input type="number" name="budget" value={budget} onChange={e => this.handleChange(e)} />
         <label>From:</label>
         <input type="date" name="from" value={from} onChange={e => this.handleChange(e)} />
         <label>Until:</label>
         <input type="date" name="until" value={until} onChange={e => this.handleChange(e)} />
         <input type="submit" value="Submit" />
       </form>
      </div>
    )
  }
}

export default EditOffer;