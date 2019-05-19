import React, { Component } from "react";
import user from "../../lib/user-service";
import  FileUpload  from "../firebase/index";
import { Form, Label, Input } from 'reactstrap';
import styled from 'styled-components';

const ProfileFormStyle = styled.div`
  display:block;
`

class ProfileForm extends Component {
  value = this.props.placeholder
    state = {
      age: this.value.age,
      gender:this.value.gender,
      city:this.value.city,
      description:this.value.description,
      userImage:this.value.userImage
    }

  submit = () => {
    this.props.showUserFormButton()
    this.updateUser(this.state)
    this.props.getUser();
  }

  updateUser = (data) => {
      user.updateUser(data)
      .then(responseData=>{
      })
      this.props.getUser()
   }

  getUrl = (url) => {
    this.setState({
      userImage: url,
    })
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render () {
    return (
     <ProfileFormStyle>
        <label>Image</label>
        <FileUpload getUrl={this.getUrl }></FileUpload>

      <Form>
        <Label>Age:</Label>
        <Input name = "age" type = "number" onChange={this.handleChange}required/>
        <Label>Gender:</Label>
        <Input  name = "gender" type = "string"  onChange={this.handleChange} required/>
        <Label>Description:</Label>
        <Input name = "description" type = "textarea"  onChange={this.handleChange} required/>
        <Label>City:</Label>
        <Input name = "city" type = "string"  onChange={this.handleChange}  required/>
      </Form>
      <button type= "submit" onClick={this.submit}> Submit </button>

     </ProfileFormStyle>
    )
  } 
}

export default ProfileForm;