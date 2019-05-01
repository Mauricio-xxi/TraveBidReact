import React from 'react'
import { withFormik, Field } from "formik";
import user from "../../lib/user-service";

function updateUser(value){
   user.updateUser(value)
   .then(responseData=>{
     console.log(responseData)
   })
}

function ProfileForm(props) {
  
  const {
    handleSubmit,
    isSubmitting
  } = props;


  return (
    <form onSubmit={handleSubmit}>
      <label>Age:</label>
      <Field name = "age" type = "number"/>
      <label>Gender:</label>
      <Field  name = "gender" type = "string"/>
      <label>Description:</label>
      <Field name = "description" type = "string" />
      <label>City:</label>
      <Field name = "city" type = "string"/>
      <label>Image</label>
      <Field name = "userImage" type = "file"/>
      <button type= "submit" disabled={isSubmitting}> Submit </button>
    </form>
  )
}

export default withFormik({
  handleSubmit(value, formikBag){
    updateUser(value)
    formikBag.setSubmitting(false)
  }

})(ProfileForm);