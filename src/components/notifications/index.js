import React, {Component} from 'react';
import styled from 'styled-components';
import ee from 'event-emitter';

const Container = styled.div`
  background-color: ${ props  =>  props.background === 'success' ? '#0F9D58' : props.background === 'warning' ? '#DB4437' : props.background === 'welcome' ? '#4285F4' : '' } ;
  color: white;
  padding: 16px;
  position:absolute;
  border-radius: 8px;
  top: ${props => props.top}px;
  right: 16px;
  z-index: 1300;
  transition: top 0.5s ease;
`;

const emitter = new ee();

export const notify = (msg, type) => {
  emitter.emit('notification', msg, type);
}

export default class Notifications extends Component {

  constructor(props){
    super(props);

    this.state = {
      top: -100,
      msg: '',
      type:'',
    }
    this.timeout = null;

    emitter.on('notification', (msg, type) => {
      this.onshow(msg, type);
    })
  }

  onshow = (msg, type) => {
    if (this.timeout){
      clearTimeout(this.timeout);
      this.setState({
        top: -100
      }, () => {
        this.timeout = setTimeout(()=>{
          this.showNotification(msg, type);
        }, 3000 );
      })
    } else {
      this.showNotification(msg, type);
    }
  }

  showNotification = (msg, type) => {
    this.setState({
      top: 16,
      msg,
      type,
    }, () => {
      this.timeout = setTimeout(()=>{
        this.setState({
          top: -100,
          msg,
          type,
        })
      }, 3000);
    })
  }

  render (){
    return (
        <Container background={this.state.type} top={this.state.top}> <h6>{this.state.msg}</h6></Container> 
    )
  }
}
