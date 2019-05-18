import React, { Component } from 'react';
import bid from '../../lib/bid-service';
import { Form, Label, Input } from 'reactstrap';

class EditBid extends Component {
    
  state = {
      description: this.props.description, 
      value: this.props.value,
      Status: this.props.Status  
    };

  handleFormSubmit = (event) => {
    event.preventDefault();
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
      <div>
        <Form onSubmit={this.handleFormSubmit}>
         <Label>Description:</Label>
         <Input type="text" name="description"  onChange={e => this.handleChange(e)} />
         <Label>Value:</Label>
         <Input type="number" name="value" onChange={e => this.handleChange(e)} />
         <Input type="submit" value="Submit" />
       </Form>
      </div>
    )
  }
}

export default EditBid;