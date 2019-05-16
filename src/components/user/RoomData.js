import React, {Component} from 'react'
import room from "../../lib/room-service";
import FileUpload from "../firebase/index";
import RoomGeo from "./RoomGeo";
import { Form, Label, Input, Button, FormGroup } from 'reactstrap';
import styled from 'styled-components';
import { ReactComponent as TV } from "../../../src/assets/television.svg";
import { ReactComponent as Wifi } from "../../../src/assets/wifi.svg";
import { ReactComponent as Air } from "../../../src/assets/acondicionador-de-aire.svg";
import { ReactComponent as Garage } from "../../../src/assets/garaje.svg";
import { ReactComponent as HotWater } from "../../../src/assets/termometro.svg";
import { ReactComponent as Washer } from "../../../src/assets/lavadora.svg";
import { ReactComponent as Pool } from "../../../src/assets/piscina.svg";
import { ReactComponent as PrivateBathroom } from "../../../src/assets/ducha.svg";
import { ReactComponent as Wheelchair } from "../../../src/assets/silla-de-ruedas.svg";
import { ReactComponent as Smoke } from "../../../src/assets/cigarrete.svg";
import { ReactComponent as Pet } from "../../../src/assets/mascotas.svg";
import { ReactComponent as Couples } from "../../../src/assets/pareja.svg";

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
const FacilitiesStyle = styled.div`
  padding:5%;
`


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
  console.log(name,value)
  this.setState({ [name]: value });
}

  render(){ 
  return (
    <ProfileCardStyle>
    <RoomGeo  getCoordinates={this.getCoordinates}></RoomGeo>
    <FacilitiesStyle>

    <Form>
      <FormGroup>
        <Label ><h3>Description:</h3></Label>
        <Input name = "description" type = "textarea" onChange ={this.handleChange} required/>
      </FormGroup>
        <h3>Facilities:</h3>
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
        <Input name = "entireProperty" type = "checkbox"  onChange ={this.handleChange}/>
      </FormGroup>
      <FormGroup>
        <Label for="tv" className="checkboxInputs"> <TV/></Label>
        <Input name ="tv" id="tv" type = "checkbox" value="True" className="noneCheckbox" onChange ={this.handleChange}/>
      </FormGroup>
      <FormGroup>
        <Label for ="wifi" className="checkboxInputs"><Wifi/></Label>
        <Input name = "wifi" id="wifi" type = "checkbox"value="True" className="noneCheckbox" onChange ={this.handleChange}/>
      </FormGroup>
      <FormGroup>
        <Label for="air" className="checkboxInputs"><Air/></Label>
        <Input name = "air" id="air" type = "checkbox"className="noneCheckbox"value="True" onChange ={this.handleChange}/>
      </FormGroup>  
      <FormGroup>
        <Label for="garage" className="checkboxInputs"><Garage/></Label>
        <Input name = "garage" id="garage" type = "checkbox" className="noneCheckbox" value="True" onChange ={this.handleChange}/>
      </FormGroup>
      <FormGroup>
        <Label for ="termo"className="checkboxInputs"><HotWater/></Label>
        <Input name = "termo" id="termo" type="checkbox"className="noneCheckbox" value="True" onChange ={this.handleChange}/>
      </FormGroup>
      <FormGroup>
        <Label for="washer" className="checkboxInputs"><Washer/></Label>
        <Input name = "washer" id="washer" type = "checkbox"className="noneCheckbox" value="True" onChange ={this.handleChange}/>
      </FormGroup>   
      <FormGroup>
        <Label for="pool" className="checkboxInputs"><Pool/></Label>
        <Input name = "pool" id="pool" type = "checkbox" className="noneCheckbox" value="True" onChange ={this.handleChange}/>
      </FormGroup>
      <FormGroup>
        <Label for="privateBathroom" className="checkboxInputs"><PrivateBathroom/></Label>
        <Input name = "privateBathroom" id="privateBathroom" type = "checkbox" className="noneCheckbox" value="True" onChange ={this.handleChange}/>
      </FormGroup> 
      <FormGroup>
        <Label for="wheelchair" className="checkboxInputs"><Wheelchair/></Label>
        <Input name = "wheelchair" id="wheelchair" type = "checkbox"className="noneCheckbox" value="True" onChange ={this.handleChange}/>
      </FormGroup> 
      <FormGroup>
        <Label for="smoke" className="checkboxInputs"><Smoke/></Label>
        <Input name = "smoke" id="smoke" type = "checkbox" className="noneCheckbox" value="True" onChange ={this.handleChange}/>
      </FormGroup> 
      <FormGroup>
        <Label for="pet" className="checkboxInputs"><Pet/></Label>
        <Input name = "pet" id="pet" type = "checkbox" className="noneCheckbox" value="True" onChange ={this.handleChange}/>
      </FormGroup>
      <FormGroup>
        <Label for="couples" className="checkboxInputs"><Couples/></Label>
        <Input name = "couples" id="couples" type = "checkbox" className="noneCheckbox" value="True" onChange ={this.handleChange}/>
      </FormGroup>
    </Form>
    </FacilitiesStyle>
    <Label>Upload Room Image</Label>
    <FileUpload getUrl={this.getUrl }></FileUpload>
    <Button type= "submit" onClick={this.submit}> Submit </Button>
    </ProfileCardStyle>
  )    

  }

}

export default (RoomData);