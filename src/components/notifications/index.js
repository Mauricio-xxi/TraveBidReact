import React, {Component} from 'react';
import styled from 'styled-components';
import ee from 'event-emitter';

const Container = styled.div`
  background-color:  #4285F4;
  color: white;
  padding: 16px;
  position:absolute;
  top: ${props => props.top}px;
  right: 16px;
  z-index: 1300;
  transition: top 0.5s ease;
`;

const emitter = new ee();

export const notify = (msg) => {
  emitter.emit('notification', msg);
}

export default class Notifications extends Component {

  constructor(props){
    super(props);

    this.state = {
      top: -100,
      msg: '',
    }
    this.timeout = null;

    emitter.on('notification', (msg) => {
      this.onshow(msg);
    })
  }

  onshow = (msg) => {
    if (this.timeout){
      clearTimeout(this.timeout);
      this.setState({
        top: -100
      }, () => {
        this.timeout = setTimeout(()=>{
          this.showNotification(msg);
        }, 3000 );
      })
    } else {
      this.showNotification(msg);
    }
  }

  showNotification = (msg) => {
    this.setState({
      top: 16,
      msg,
    }, () => {
      this.timeout = setTimeout(()=>{
        this.setState({
          top: -100,
          msg,
        })
      }, 3000);
    })
  }

  render (){
    return (
        <Container top={this.state.top}> <h6>{this.state.msg}</h6></Container> 
    )
  }
}
