import React, { Component } from 'react';
import bid from '../../lib/bid-service';
import { Form, Label, Input } from 'reactstrap';

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
        this.props.checkIfUserBidded()
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
       <Form onSubmit={this.handleFormSubmit}>
         <Label>Description:</Label>
         <Input type="text" name="description" value={this.state.description} onChange={e => this.handleChange(e)} required/>
         <Label>Value:</Label>
         <Input type="number" name="value" value={this.state.value} onChange={e => this.handleChange(e)} required />
         <Input type="submit" value="Submit" />
       </Form>
      </div>
    )
  }
}

export default CreateBid;