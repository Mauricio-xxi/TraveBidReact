import React, { Component } from 'react';
import offer from '../../lib/offer-service';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import {notify} from '../notifications/index'
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  margin-bottom: 5%;
  padding:5%;
  background-color: lavender;
`;

const SubmitUpdate = styled.button`
  padding: 3%;
  background-color: #0F9D58;
  border: 1px solid #0F9D58;
  border-radius: 8px;
  margin-top: 2%;
  color: white;
`;

class EditOffer extends Component {
      
    state = {
        budget: this.props.offer.budget,
        from: this.props.offer.from,
        until: this.props.offer.until, 
      };
  
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const offerID = this.props.offerID;
    const { budget, from, until } = this.state;
    offer.editOffer({ offerID, budget, from, until })
    .then( (data) => {
      notify('Offer successfully updated', 'success');
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
      <Container>
       <Form onSubmit={this.handleFormSubmit}>
        <FormGroup>
        <Label>Budget:</Label>
          <Input placeholder="Budget" type="number" name="budget"  onChange={e => this.handleChange(e)} />
        </FormGroup>
        <FormGroup>
          <Label>From:</Label>
          <Input placeholder="From" type="date" name="from" onChange={e => this.handleChange(e)} />
        </FormGroup>
        <FormGroup>
          <Label>Until:</Label>
          <Input type="date" name="until"  onChange={e => this.handleChange(e)} />
        </FormGroup>
          <SubmitUpdate color= "success" type="submit" value="Edit">Edit</SubmitUpdate>
       </Form>
      </Container>
    )
  }
}

export default EditOffer;