import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../../lib/AuthProvider";
import { Form, Button, FormGroup, Input } from 'reactstrap';
import styled from 'styled-components';


const Container = styled.div`
  margin-top: 10%;
  padding: 10%;
`;

const ButtonContainer = styled.div`
  text-align: center;
`;

const LoginPhrase = styled.div`
  margin-top: 5%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;



class Signup extends Component {
  state = {
    username: "",
    password: "",
    city:"",
    age:"",
    gender:"",
    email:"",
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password, city, age, gender, email  } = this.state;
    this.props.signup({ username, password, city, age, gender, email });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password, city , age, gender, email } = this.state;
    return (
        <Container>
        <Form onSubmit={this.handleFormSubmit}>
          <FormGroup>
            <Input
              placeholder="Username"
              type="text"
              name="username"
              value={username}
              onChange={this.handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Input
              placeholder="Email"
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
              required
            />
          </FormGroup>
          <FormGroup>         
            <Input
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
             <Input
              placeholder="City"
              type="text"
              name="city"
              value={city}
              onChange={this.handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
             <Input
              placeholder="Age"
              type="number"
              name="age"
              value={age}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
             <Input
              placeholder="Gender"
              type="text"
              name="gender"
              value={gender}
              onChange={this.handleChange}
            />
          </FormGroup>
          <ButtonContainer>
            <Button color="primary" type="submit" value="Signup" >Signup</Button>
          </ButtonContainer> 
        </Form>
        <LoginPhrase>
         <p style={{color: "white"}}>Already have account?</p> 
          <Link to={"/login"}> Login</Link>
        </LoginPhrase>
        </Container>
    );
  }
}

export default withAuth(Signup);
