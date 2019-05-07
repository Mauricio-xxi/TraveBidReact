import React, {Component} from 'react'
import room from "../../lib/room-service";
import FileUpload from "../firebase/index";
import RoomGeo from "./RoomGeo";

class RoomData extends Component {
  
  state = {
    room,
    comodities: "",
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
      <label>Comodities:</label>
      <input  name = "comodities" type = "string" onChange ={this.handleChange}/>
      <label>Description:</label>
      <input name = "description" type = "string" onChange ={this.handleChange}/>
    </form>
    <label>Upload Room Image</label>
    <FileUpload getUrl={this.getUrl }></FileUpload>
    <button type= "submit" onClick={this.submit}> Submit </button>
    </>
  )    

  }

}

export default (RoomData);