import React from 'react'
import { withFormik, Field } from "formik";
import room from "../../lib/room-service";

function createRoom(value){
   room.create(value)
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

      <label>Comodities:</label>
      <Field  name = "comodities" type = "string"/>
      <label>Description:</label>
      <Field name = "description" type = "string" />
      <label>Upload Image</label>
      <Field name = "roomImage" type = "file"/>
      <button type= "submit" disabled={isSubmitting}> Submit </button>
    </form>
  )
}

export default withFormik({
  handleSubmit(value, formikBag){
    createRoom(value)
    formikBag.setSubmitting(false)
  }

})(RoomForm);