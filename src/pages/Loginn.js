import React from "react";
import { Mutation } from "react-apollo";
import { LOGIN_USER } from "../lib/queries";



const loginUser = () => {
  let username;
  let password;

  return (
    <Mutation mutation={LOGIN_USER}>
      {(loginUser, { data }) => (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              loginUser({ variables: { username: username.value , password: password.value } });
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
            <button type="submit">Login</button>
          </form>
        </div>
      )}
    </Mutation>
  );
};

export default loginUser;