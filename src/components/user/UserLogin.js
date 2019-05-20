import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import { Form, FormGroup, Label, Input } from 'reactstrap';
import styled from 'styled-components';


const Container = styled.div`
  margin-top: 10%;
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
            <Label>Password:</Label>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              required
            />
          </FormGroup>
          <Input type="submit" value="Login" />
        </Form>
     </Container>
    );
  }
}

export default withAuth(UserLogin);
