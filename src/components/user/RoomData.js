import React from 'react'
import { withFormik, Field } from "formik";
import user from "../../lib/user-service";
import  RoomGeo  from "../user/RoomGeo";

function updateUser(value){
   user.updateUser(value)
   .then(responseData=>{
     console.log(responseData)
   })
}

function RoomForm(props) {
  
  const {
    handleSubmit,
    isSubmitting
  } = props;


  return (
    <form onSubmit={handleSubmit}>
      <label>Location:</label>
      <RoomGeo/>
      <label>Comodities:</label>
      <Field  name = "gender" type = "string"/>
      <label>Description:</label>
      <Field name = "description" type = "string" />
      <label>Images</label>
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

})(RoomForm);