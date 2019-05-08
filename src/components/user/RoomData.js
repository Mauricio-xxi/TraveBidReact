import React, {Component} from 'react'
import room from "../../lib/room-service";
import FileUpload from "../firebase/index";
import RoomGeo from "./RoomGeo";

class RoomData extends Component {
  
  state = {
    room,
    privateRoom:"",
    sharedRoom:"",
    entireProperty:"",
    tv:"",
    wifi:"",
    air:"",
    garage:"",
    termo:"",
    washer:"",
    pool:"",
    privateBathroom:"",
    wheelchair:"",
    smoke:"",
    pet:"",
    description:"",
    roomImage:"",
    coordinates:[],
  }

  // location: {
  //   type: {
  //     type: String,
  //   },
  //   coordinates: [Number],

  componentDidMount(){
    this.getRoom()
  }

  getRoom = () => {
    room.getRoom()
    .then(responseData=>{
      console.log(responseData)
      this.setState({
        room:responseData
      })
    })
  }

  createRoom = (value) => {
    room.create(value)
    .then(responseData=>{
      console.log(responseData)
    })
 }
 getUrl = (url) => {
  this.setState({
    roomImage: url,
  })
}
submit = () => {
  this.createRoom(this.state)
}

getCoordinates =(coordinates) => {
  this.setState({
    coordinates:coordinates
  })
}

handleChange = event => {
  const { name, value } = event.target;
  this.setState({ [name]: value });
}

  render(){
  return (
    <>
    <RoomGeo  getCoordinates={this.getCoordinates}></RoomGeo>
    <form>
      <label>Description:</label>
      <input name = "description" type = "string" onChange ={this.handleChange}/>
      <label>Facilities:</label>
      <label>Private Room:</label>
      <input name = "privateRoom" type = "checkbox" onChange ={this.handleChange}/>
      <label>Shared Room:</label>
      <input name = "sharedRoom" type = "checkbox" onChange ={this.handleChange}/>
      <label>Entire Property:</label>
      <input name = "entireProperty" type = "checkbox" onChange ={this.handleChange}/>
      <label>TV:</label>
      <input name = "tv" type = "checkbox" onChange ={this.handleChange}/>
      <label>WIFI:</label>
      <input name = "wifi" type = "checkbox" onChange ={this.handleChange}/>
      <label>Air conditioner:</label>
      <input name = "air" type = "checkbox" onChange ={this.handleChange}/>
      <label>Garage:</label>
      <input name = "garage" type = "checkbox" onChange ={this.handleChange}/>
      <label>Hot Water:</label>
      <input name = "termo" type = "checkbox" onChange ={this.handleChange}/>
      <label>TV:</label>
      <input name = "tv" type = "checkbox" onChange ={this.handleChange}/>
      <label>Washer:</label>
      <input name = "washer" type = "checkbox" onChange ={this.handleChange}/>
      <label>Pool:</label>
      <input name = "pool" type = "checkbox" onChange ={this.handleChange}/>
      <label>Private Bathroom:</label>
      <input name = "privateBathroom" type = "checkbox" onChange ={this.handleChange}/>
      <label>Wheelchair:</label>
      <input name = "wheelchair" type = "checkbox" onChange ={this.handleChange}/>
      <label>Smoke:</label>
      <input name = "smoke" type = "checkbox" onChange ={this.handleChange}/>
      <label>Pet:</label>
      <input name = "pet" type = "checkbox" onChange ={this.handleChange}/>
    </form>
    <label>Upload Room Image</label>
    <FileUpload getUrl={this.getUrl }></FileUpload>
    <button type= "submit" onClick={this.submit}> Submit </button>
    </>
  )    

  }

}

export default (RoomData);