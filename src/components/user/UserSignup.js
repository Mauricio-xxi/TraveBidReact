import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../../lib/AuthProvider";
import { Form, FormGroup, Label, Input } from 'reactstrap';

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
      <div>
        <Form onSubmit={this.handleFormSubmit}>
          <FormGroup>
            <Label>Username:</Label>
            <Input
              type="text"
              name="username"
              value={username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Email:</Label>
            <Input
              type="text"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>         
            <Label>Password:</Label>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>City:</Label>
             <Input
              type="text"
              name="city"
              value={city}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Age:</Label>
             <Input
              type="text"
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
          <Input type="submit" value="Signup" />
        </Form>
        <p>
          Already have account?
          <Link to={"/login"}> Login</Link>
        </p>
      </div>
    );
  }
}

export default withAuth(Signup);
