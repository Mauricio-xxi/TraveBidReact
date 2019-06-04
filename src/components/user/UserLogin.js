import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import { Link } from "react-router-dom";
import { Form, FormGroup, Input, Button } from 'reactstrap';
import styled from 'styled-components';


const Container = styled.div`
  margin-top: 50%;
  padding: 10%;
  text-align: center;
`;

const ButtonContainer = styled.div`
  text-align: center;
`;

const SignUpPhrase = styled.div`
  margin-top: 5%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

class UserLogin extends Component {
  state = {
    username: "",
    password: ""
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    this.props.login({ username, password });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password } = this.state;
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
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              required
            />
          </FormGroup>
          <ButtonContainer>
            <Button color="primary" type="submit" value="Login" > Login </Button>
          </ButtonContainer>
        </Form>
        <SignUpPhrase>
         <p style={{color: "white"}}>Don't have an account?</p> 
          <Link to={"/signup"}> Signup</Link>
        </SignUpPhrase>
     </Container>
    );
  }
}

export default withAuth(UserLogin);
