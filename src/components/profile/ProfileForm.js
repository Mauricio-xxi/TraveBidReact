import React from 'react'
import { withFormik, Field } from "formik";


function ProfileForm(props) {
  const {
    handleSubmit,
    isSubmitting,
    userUpdate

  } = props;
  return (
    <form onSubmit={userUpdate}>
      <label>Age:</label>
      <Field name = "age" type = "number"/>
      <label>Gender:</label>
      <Field  name = "gender" type = "string"/>
      <label>Description:</label>
      <Field name = "description" type = "string" />
      <label>City:</label>
      <Field name = "city" type = "string"/>
      <button type= "submit" disabled={isSubmitting}> Submit </button>
    </form>
  )
}

export default withFormik({
  handleSubmit(value, formikBag){
    console.log(value)
    formikBag.setSubmitting(false)
  }

})(ProfileForm);