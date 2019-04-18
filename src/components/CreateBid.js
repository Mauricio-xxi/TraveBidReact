import React, { Component } from 'react';
import bid from '../lib/bid-service';

class CreateBid extends Component {
  constructor(props) {
      super(props);
      this.state = {
        description: "", 
        value: "",
      };
  }
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const { description, value } = this.state;
    const offerID = this.props.offerID;
    bid.create({ description, value, offerID })
    .then( () => {
        this.props.getBids()
        this.setState({
          description:"",
          value: "",
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
         <label>Description:</label>
         <input type="text" name="description" value={this.state.description} onChange={e => this.handleChange(e)}/>
         <label>Value:</label>
         <input type="number" name="value" value={this.state.value} onChange={e => this.handleChange(e)} />
         <input type="submit" value="Submit" />
       </form>
      </div>
    )
  }
}

export default CreateBid;