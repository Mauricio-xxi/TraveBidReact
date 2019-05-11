import React, { Component } from "react";
// import { withFormik, Field } from "formik";
import user from "../../lib/user-service";
import  FileUpload  from "../firebase/index";
import { Form, Label, Input } from 'reactstrap';

class ProfileForm extends Component {
    state = {
      age: "",
      gender:"",
      city:"",
      description:"",
      userImage:""
    }

  submit = () => {
    this.props.showUserFormButton()
    this.updateUser(this.state)
  }

  updateUser = (data) => {
      user.updateUser(data)
      .then(responseData=>{
        console.log(responseData)
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
     <div>
        <label>Image</label>
        <FileUpload getUrl={this.getUrl }></FileUpload>

      <Form>
        <Label>Age:</Label>
        <Input name = "age" type = "number" onChange={this.handleChange}/>
        <Label>Gender:</Label>
        <Input  name = "gender" type = "string" onChange={this.handleChange}/>
        <Label>Description:</Label>
        <Input name = "description" type = "string"  onChange={this.handleChange}/>
        <Label>City:</Label>
        <Input name = "city" type = "string" onChange={this.handleChange}/>
      </Form>
      <button type= "submit" onClick={this.submit}> Submit </button>

     </div>
    )
  } 
}

export default ProfileForm;