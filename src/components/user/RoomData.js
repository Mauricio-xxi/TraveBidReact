import React, {Component} from 'react'
import room from "../../lib/room-service";
import FileUpload from "../firebase/index";
import RoomGeo from "./RoomGeo";
import { Form, Label, Input, Button, FormGroup } from 'reactstrap';
import styled from 'styled-components';

const ProfileCardStyle = styled.div`
  width:100%;
  display:block;
  color: black;
  border-style: none;
  border-color: black;
  border-width: 1px;
  padding: 5%, 0%;
  box-shadow: 5px  10px 10px grey;
`;

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
      this.setState({
        room:responseData
      })
    })
  }

  createRoom = (value) => {
    room.create(value)
    .then(responseData=>{
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
    <ProfileCardStyle>
    <RoomGeo  getCoordinates={this.getCoordinates}></RoomGeo>
    <Form>
      <FormGroup>
        <Label>Description:</Label>
        <Input name = "description" type = "string" onChange ={this.handleChange}/>
      </FormGroup>
        <Label>Facilities:</Label>
      <FormGroup>
        <Label>Private Room:</Label>
        <Input name = "privateRoom" type = "checkbox" onChange ={this.handleChange}/>
      </FormGroup>
      <FormGroup>  
        <Label>Shared Room:</Label>
        <Input name = "sharedRoom" type = "checkbox" onChange ={this.handleChange}/>
      </FormGroup> 
      <FormGroup>
        <Label>Entire Property:</Label>
        <Input name = "entireProperty" type = "checkbox" onChange ={this.handleChange}/>
      </FormGroup>
      <FormGroup>
        <Label>TV:</Label>
        <Input name = "tv" type = "checkbox" onChange ={this.handleChange}/>
      </FormGroup>
      <FormGroup>
        <Label>WIFI:</Label>
        <Input name = "wifi" type = "checkbox" onChange ={this.handleChange}/>
      </FormGroup>
      <FormGroup>
        <Label>Air conditioner:</Label>
        <Input name = "air" type = "checkbox" onChange ={this.handleChange}/>
      </FormGroup>  
      <FormGroup>
        <Label>Garage:</Label>
        <Input name = "garage" type = "checkbox" onChange ={this.handleChange}/>
      </FormGroup>
      <FormGroup>
        <Label>Hot Water:</Label>
        <Input name = "termo" type = "checkbox" onChange ={this.handleChange}/>
      </FormGroup>
      <FormGroup>
        <Label>TV:</Label>
        <Input name = "tv" type = "checkbox" onChange ={this.handleChange}/>
      </FormGroup>
      <FormGroup>
        <Label>Washer:</Label>
        <Input name = "washer" type = "checkbox" onChange ={this.handleChange}/>
      </FormGroup>   
      <FormGroup>
        <Label>Pool:</Label>
        <Input name = "pool" type = "checkbox" onChange ={this.handleChange}/>
      </FormGroup>
      <FormGroup>
        <Label>Private Bathroom:</Label>
        <Input name = "privateBathroom" type = "checkbox" onChange ={this.handleChange}/>
      </FormGroup> 
      <FormGroup>
        <Label>Wheelchair:</Label>
        <Input name = "wheelchair" type = "checkbox" onChange ={this.handleChange}/>
      </FormGroup> 
      <FormGroup>
        <Label>Smoke:</Label>
        <Input name = "smoke" type = "checkbox" onChange ={this.handleChange}/>
      </FormGroup> 
      <FormGroup>
        <Label>Pet:</Label>
        <Input name = "pet" type = "checkbox" onChange ={this.handleChange}/>
      </FormGroup>
    </Form>
    <Label>Upload Room Image</Label>
    <FileUpload getUrl={this.getUrl }></FileUpload>
    <Button type= "submit" onClick={this.submit}> Submit </Button>
    </ProfileCardStyle>
  )    

  }

}

export default (RoomData);