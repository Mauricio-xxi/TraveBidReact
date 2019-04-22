import React from "react";
import { Link } from "react-router-dom";
import { Mutation } from "react-apollo";
import { CREATE_USER } from "../lib/queries";

const signupp = () => {
    let username;
    let password;
  return (
  <Mutation mutation={CREATE_USER}>
    {(signupp,{data})=>(
      <div>
      {console.log(data)}
        <form 
          onSubmit ={ e => {
              e.preventDefault();
              signupp({ variables: { username: username.value , password: password.value } });
              username.value = "";
              password.value = "";
            }}
            >
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            ref={node => {
              username = node;
            }}
          />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            ref={node => {
              password = node;
            }}
          />
          <input type="submit" value="Signup" />
        </form>
        <p>
          Already have account?
          <Link to={"/login"}> Login</Link>
        </p>
      </div>
      )}
  </Mutation>
 );
}

export default signupp;
