import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../../lib/AuthProvider";

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
        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
          />          
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <label>City:</label>
           <input
            type="text"
            name="city"
            value={city}
            onChange={this.handleChange}
          />
          <label>Age:</label>
           <input
            type="text"
            name="age"
            value={age}
            onChange={this.handleChange}
          />
          <label>Gender:</label>
           <input
            type="text"
            name="gender"
            value={gender}
            onChange={this.handleChange}
          />
          <input type="submit" value="Signup" />
        </form>
        <p>
          Already have account?
          <Link to={"/login"}> Login</Link>
        </p>
      </div>
    );
  }
}

export default withAuth(Signup);
