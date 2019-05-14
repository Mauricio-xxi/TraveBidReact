import React, { Component } from 'react';
import offer from '../../lib/offer-service';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import styled from 'styled-components';

const CreateOfferForm = styled.div`
  display:block;
  margin-top: 5%;
  width: 100%;
`

class CreateOffer extends Component {
  state = {
        location: "", 
        budget: "",
        from: "",
        until:"",  
      };
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const { location, budget, from, until } = this.state;
    offer.create({ location, budget, from, until })
    .then( () => {
        this.props.getOffers()
        this.props.renderOfferForm()
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
      <CreateOfferForm>
       <Form onSubmit={this.handleFormSubmit}>
          <FormGroup>
            <Label>Location:</Label>
            <Input type="text" name="location" value={this.state.location} onChange={e => this.handleChange(e)} required />
          </FormGroup>
          <FormGroup>
            <Label>Budget:</Label>
            <Input type="number" name="budget" value={this.state.budget} onChange={e => this.handleChange(e)} required />
          </FormGroup>
          <FormGroup>
            <Label>From:</Label>
            <Input type="date" name="from" value={this.state.from} onChange={e => this.handleChange(e)} required />
          </FormGroup>
          <FormGroup>
            <Label>Until:</Label>
            <Input type="date" name="until" value={this.state.until} onChange={e => this.handleChange(e)} required />
          </FormGroup>
            <Button color= "success" type="submit" value="Submit"> Create</Button>
            {/* <Input type="submit" value="Submit" /> */}
       </Form>
      </CreateOfferForm>
    )
  }
}

export default CreateOffer;