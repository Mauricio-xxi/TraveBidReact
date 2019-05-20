import React, {Component} from 'react'
import room from "../../lib/room-service";
import FileUpload from "../firebase/index";
import RoomGeo from "./RoomGeo";
import { Form, Label, Input, FormGroup } from 'reactstrap';
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
  padding: 5%, 3%;
  box-shadow: 5px  10px 10px grey;
  margin-bottom: 3%;
`;
const FacilitiesStyle = styled.div`
  padding:5%;
`
const InputsStyle = styled.div`
  display:flex;
  flex-wrap:wrap;
`

const SubmitUpdate = styled.button`
  padding: 3%;
  background-color: white;
  border: 1px solid #0F9D58;
  border-radius: 8px;
  margin-top: 2%;
  color: #0F9D58;
`;

const UploadRoomImageContainer = styled.div`
  max-width: 100%;
  text-align: center;
  padding-bottom: 4%;
`;



class RoomData extends Component {
  
  state = {
     id : this.props.roomID,
      privateRoom: this.props.facilities.privateRoom,
      sharedRoom: this.props.facilities.sharedRoom,
      entireProperty: this.props.facilities.entireProperty,
      tv: this.props.facilities.tv,
      wifi: this.props.facilities.wifi,
      air: this.props.facilities.air,
      garage: this.props.facilities.garage,
      termo: this.props.facilities.termo,
      washer: this.props.facilities.washer,
      pool: this.props.facilities.pool,
      privateBathroom: this.props.facilities.privateBathroom,
      wheelchair: this.props.facilities.wheelchair,
      smoke: this.props.facilities.smoke,
      pet: this.props.facilities.pet,
      description: this.props.description,
      roomImage: this.props.roomImage,
      coordinates : [],
  }

  createRoom = (value) => {
    room.create(value)
    .then(responseData=>{
    })
 }

 updateRoom = (value) => {
  room.updateRoom(value)
  .then(responseData=> {
  })
 }

 getUrl = (url) => {
  this.setState({
    roomImage: url,
  })
}
submit = () => {
  if(this.state.id === ""){
   this.createRoom(this.state)
   this.props.showRoomForm()
  } else {
    this.updateRoom(this.state)
    this.props.showRoomForm()
  }

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
    <FacilitiesStyle>

    <Form>
      <FormGroup>
        <Label ><h6>Description</h6></Label>
        <Input name = "description" type = "textarea" onChange ={this.handleChange} required/>
      </FormGroup>
        <h6>Facilities:</h6>
      <FormGroup>
        <Label>Private Room</Label>
        <Input style={{marginLeft: "6%"}} name = "privateRoom" type = "radio" onChange ={this.handleChange}/>
      </FormGroup>
      <FormGroup>  
        <Label>Shared Room</Label>
        <Input style={{marginLeft: "6%"}} name = "sharedRoom" type = "radio" onChange ={this.handleChange}/>
      </FormGroup> 
      <FormGroup>
        <Label>Entire Property</Label>
        <Input style={{marginLeft: "3%"}} name = "entireProperty" type = "radio"  onChange ={this.handleChange}/>
      </FormGroup>
      <InputsStyle>
      <FormGroup>
        <Input name ="tv" id="tv" type = "checkbox" value="True" className="noneCheckbox" onChange ={this.handleChange}/>
        <Label for="tv" className="checkboxInputs"> <TV/></Label>
      </FormGroup>
      <FormGroup>
        <Input name = "wifi" id="wifi" type = "checkbox"value="True" className="noneCheckbox" onChange ={this.handleChange}/>
        <Label for ="wifi" className="checkboxInputs"><Wifi/></Label>
      </FormGroup>
      <FormGroup>
        <Input name = "air" id="air" type = "checkbox"className="noneCheckbox"value="True" onChange ={this.handleChange}/>
        <Label for="air" className="checkboxInputs"><Air/></Label>
      </FormGroup>  
      <FormGroup>
        <Input name = "garage" id="garage" type = "checkbox" className="noneCheckbox" value="True" onChange ={this.handleChange}/>
        <Label for="garage" className="checkboxInputs"><Garage/></Label>
      </FormGroup>
      <FormGroup>
        <Input name = "termo" id="termo" type="checkbox"className="noneCheckbox" value="True" onChange ={this.handleChange}/>
        <Label for ="termo"className="checkboxInputs"><HotWater/></Label>
      </FormGroup>
      <FormGroup>
        <Input name = "washer" id="washer" type = "checkbox"className="noneCheckbox" value="True" onChange ={this.handleChange}/>
        <Label for="washer" className="checkboxInputs"><Washer/></Label>
      </FormGroup>   
      <FormGroup>
        <Input name = "pool" id="pool" type = "checkbox" className="noneCheckbox" value="True" onChange ={this.handleChange}/>
        <Label for="pool" className="checkboxInputs"><Pool/></Label>
      </FormGroup>
      <FormGroup>
        <Input name = "privateBathroom" id="privateBathroom" type = "checkbox" className="noneCheckbox" value="True" onChange ={this.handleChange}/>
        <Label for="privateBathroom" className="checkboxInputs"><PrivateBathroom/></Label>
      </FormGroup> 
      <FormGroup>
        <Input name = "wheelchair" id="wheelchair" type = "checkbox"className="noneCheckbox" value="True" onChange ={this.handleChange}/>
        <Label for="wheelchair" className="checkboxInputs"><Wheelchair/></Label>
      </FormGroup> 
      <FormGroup>
        <Input name = "smoke" id="smoke" type = "checkbox" className="noneCheckbox" value="True" onChange ={this.handleChange}/>
        <Label for="smoke" className="checkboxInputs"><Smoke/></Label>
      </FormGroup> 
      <FormGroup>
        <Input name = "pet" id="pet" type = "checkbox" className="noneCheckbox" value="True" onChange ={this.handleChange}/>
        <Label for="pet" className="checkboxInputs"><Pet/></Label>
      </FormGroup>
      <FormGroup>
        <Input name = "couples" id="couples" type = "checkbox" className="noneCheckbox" value="True" onChange ={this.handleChange}/>
        <Label for="couples" className="checkboxInputs"><Couples/></Label>
      </FormGroup>
      </InputsStyle>
    </Form>
    </FacilitiesStyle>
    <Label style={{marginLeft: "3%"}}><h6>Upload Room Image</h6></Label>
    <UploadRoomImageContainer>
      <FileUpload style={{backgroundColor: "blue"}} getUrl={this.getUrl }></FileUpload>
      <SubmitUpdate type= "submit" onClick={this.submit}> Submit </SubmitUpdate>
    </UploadRoomImageContainer>
    </ProfileCardStyle>
  )    

  }

}

export default (RoomData);