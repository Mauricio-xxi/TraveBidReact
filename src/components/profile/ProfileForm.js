import React, { Component } from "react";
import user from "../../lib/user-service";
import  FileUpload  from "../firebase/index";
import { Form, Label, Input } from 'reactstrap';
import styled from 'styled-components';

const ProfileFormStyle = styled.div`
  display:block;
  text-align: center;
`

const SubmitUpdate = styled.button`
  padding: 3%;
  background-color: white;
  border: 1px solid #0F9D58;
  border-radius: 8px;
  margin-top: 2%;
  color: #0F9D58;
`;

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
        <FileUpload getUrl={this.getUrl}></FileUpload>

      <Form>
        <Label></Label>
        <Input name = "age" type = "number" placeholder="Age" onChange={this.handleChange}required/>
        <Label></Label>
        <Input  name = "gender" type = "string" placeholder="Gender"  onChange={this.handleChange} required/>
        <Label></Label>
        <Input name = "description" type = "textarea" placeholder="Personal description" onChange={this.handleChange} required/>
        <Label></Label>
        <Input name = "city" type = "string" placeholder="City" onChange={this.handleChange}  required/>
      </Form>

      <SubmitUpdate type= "submit" onClick={this.submit}> Submit </SubmitUpdate>

     </ProfileFormStyle>
    )
  } 
}

export default ProfileForm;