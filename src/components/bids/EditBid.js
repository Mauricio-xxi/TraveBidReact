import React, { Component } from 'react';
import bid from '../../lib/bid-service';
import { Form, Label, Input, Button } from 'reactstrap';
import {notify} from '../notifications/index'
import styled from 'styled-components';


const CreateBidForm = styled.div`
  text-align:center;
  display:block;
  margin-top: 5%;
  width: 100%;
  padding:5%;
  background-color: lavender;
`

class EditBid extends Component {
    
  state = {
      description: this.props.description, 
      value: this.props.value,
      Status: this.props.Status  
    };

  handleFormSubmit = (event) => {
    event.preventDefault();
    notify('Bid successfully updated!', 'success');
    const bidID = this.props.bidID;
    const { description, value, Status } = this.state;
     bid.editBid({ bidID, description, value, Status  })
     .then((data)=>{
        this.props.getBids()
        this.setState({
          description: "", 
          value: "",
          Status: "" 
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
      <CreateBidForm>
        <Form onSubmit={this.handleFormSubmit}>
         <Label>Description:</Label>
         <Input type="text" name="description"  onChange={e => this.handleChange(e)} />
         <Label>Value:</Label>
         <Input type="number" name="value" onChange={e => this.handleChange(e)} />
         <Button color= "success" type="submit" value="Submit">Edit</Button>
       </Form>
      </CreateBidForm>
    )
  }
}

export default EditBid;