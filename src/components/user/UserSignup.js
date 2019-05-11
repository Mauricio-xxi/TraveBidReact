import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../../lib/AuthProvider";
import { Form, Button, FormGroup, Label, Input } from 'reactstrap';
import styled from 'styled-components';


const Container = styled.div`
  margin-top: 10%;
`;

const LoginPhrase = styled.div`
  margin-top: 5%;
  display: flex;
  flex-direction: row;
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
            <Label>Username:</Label>
            <Input
              type="text"
              name="username"
              value={username}
              onChange={this.handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Email:</Label>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
              required
            />
          </FormGroup>
          <FormGroup>         
            <Label>Password:</Label>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>City:</Label>
             <Input
              type="text"
              name="city"
              value={city}
              onChange={this.handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Age:</Label>
             <Input
              type="number"
              name="age"
              value={age}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Gender:</Label>
             <Input
              type="text"
              name="gender"
              value={gender}
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button color="primary" type="submit" value="Signup" >Signup</Button>
        </Form>
        <LoginPhrase>
         <p>Already have account?</p> 
          <Link to={"/login"}> Login</Link>
        </LoginPhrase>
        </Container>
    );
  }
}

export default withAuth(Signup);
