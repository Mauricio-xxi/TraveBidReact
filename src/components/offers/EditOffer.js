import React, { Component } from 'react';
import offer from '../../lib/offer-service';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

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
        this.setState({
          budget: "",
          from: "",
          until:"", 
        }, () =>this.props.getOffers())
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
        <FormGroup>
          <Label>Budget:</Label>
          <Input type="number" name="budget"  onChange={e => this.handleChange(e)} />
        </FormGroup>
        <FormGroup>
          <Label>From:</Label>
          <Input type="date" name="from" onChange={e => this.handleChange(e)} />
        </FormGroup>
        <FormGroup>
          <Label>Until:</Label>
          <Input type="date" name="until"  onChange={e => this.handleChange(e)} />
        </FormGroup>
          <Button color= "success" type="submit" value="Edit">Edit</Button>
          {/* <input type="submit" value="Submit" /> */}
       </Form>
      </div>
    )
  }
}

export default EditOffer;