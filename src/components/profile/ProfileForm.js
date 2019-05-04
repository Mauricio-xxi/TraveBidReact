import React, { Component } from "react";
// import { withFormik, Field } from "formik";
import user from "../../lib/user-service";
import  FileUpload  from "../firebase/index";


class ProfileForm extends Component {
    state = {
      age: "",
      gender:"",
      city:"",
      description:"",
      userImage:""
    }

  submit = () => {
    this.updateUser(this.state)
  }

  updateUser = (data) => {
      user.updateUser(data)
      .then(responseData=>{
        console.log(responseData)
      })
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

      <form>
        <label>Age:</label>
        <input name = "age" type = "number" onChange={this.handleChange}/>
        <label>Gender:</label>
        <input  name = "gender" type = "string" onChange={this.handleChange}/>
        <label>Description:</label>
        <input name = "description" type = "string"  onChange={this.handleChange}/>
        <label>City:</label>
        <input name = "city" type = "string" onChange={this.handleChange}/>
      </form>
      <button type= "submit" onClick={this.submit}> Submit </button>

     </div>
    )
  } 
}

export default ProfileForm;