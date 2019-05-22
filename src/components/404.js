import React, { Component } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  background-color: rgb(241, 241, 241);
  width: 100%;
  height: 100%;
  padding:0;
  padding-top: 130%;
  display: flex;
  flex-direction: row;
  object-fit: cover;
  background-size: cover; 
`;

const PinguinContainer = styled.div`
  width: 40%;
`;

const TextContainer = styled.div`
  width: 100%;
  margin-left: 15%;
  text-align:center;
`;

export default class NotFoundPage extends Component {
  render() {
    return (
      <div style={{backgroundColor: "rgb(241, 241, 241)"}}>
      <Container>
        <PinguinContainer>
          <img style={{width: "200px"}} src="/404_2.png" alt="404"></img>
        </PinguinContainer>
        <TextContainer>
          <img style={{width: "150px"}} src="/404.png" alt="404"></img>
          <p><Link to={"/"}>Home</Link></p>
        </TextContainer>
      </Container>
      </div>
    )
  }
}
