import React, { Component } from 'react';
import bid from '../../lib/bid-service';
import { Form, Input } from 'reactstrap';
import styled from 'styled-components';

const CreateButtonsContainer = styled.div`
  text-align:center;
  width: 100%;
`;
const SubmitButton = styled.button`
  padding: 3%;
  background-color: white;
  border: 1px solid #0F9D58;
  border-radius: 8px;
  margin-top: 2%;
  color: #0F9D58;
`;

class CreateBid extends Component {
  
  state = {
      description: "", 
      value: "",
    };
  
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    this.props.showCreatedBidMessage()
    const { description, value } = this.state;
    const offerID = this.props.offerID;
    bid.create({ description, value, offerID })
    .then( () => {
      this.setState({
        description:"",
        value: "",
      })
      this.props.getBids()
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
         <Input style={{marginBottom: "2%"}} placeholder="Description" type="text" name="description" value={this.state.description} onChange={e => this.handleChange(e)} required/>
         <Input placeholder="Value" type="number" name="value" value={this.state.value} onChange={e => this.handleChange(e)} required />
         <CreateButtonsContainer>
            <SubmitButton type="submit" value="Submit"> Submit</SubmitButton> 
         </CreateButtonsContainer>
       </Form>
      </div>
    )
  }
}

export default CreateBid;