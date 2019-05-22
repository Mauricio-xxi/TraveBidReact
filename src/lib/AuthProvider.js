import React, { Component } from "react";
import auth from "./auth-service";
import Loader from 'react-loader-spinner'
import styled from 'styled-components';
import {notify} from '../components/notifications/index'
const { Consumer, Provider } = React.createContext();

const SpinnerContainer = styled.div`
  width: 100%;
  display:flex;
  justify-content: center;
  margin-top: 30%;
`;

export { Consumer };

export const withAuth = Comp => {
  return class WithAuth extends Component {
    render() {
      return (
        <Consumer>
          {authStore => {
            return (
              <Comp
                login={authStore.login}
                signup={authStore.signup}
                user={authStore.user}
                logout={authStore.logout}
                isLoggedin={authStore.isLoggedin}
                {...this.props}
              />
            );
          }}
        </Consumer>
      );
    }
  };
};

class AuthProvider extends Component {
  state = {
    isLoggedin: false,
    user: null,
    isLoading: true
  };

  componentDidMount() {
    auth
      .me()
      .then(user => {
        this.setState({
          isLoggedin: true,
          user,
          isLoading: false
        });
      })
      .catch(() => {
        this.setState({
          isLoggedin: false,
          user: null,
          isLoading: false
        });
      });
  }

  signup = user => {
    const { username, password, city, age, gender, email } = user;
    auth
      .signup({ username, password, city, age, gender, email })
      .then(user => {
        this.setState({
          isLoggedin: true,
          user
        });
      })
      .catch(({ response: { data: error } }) => {
        this.setState({
          message: error.statusMessage
        });
      });
  };

  login = user => {
    const { username, password } = user;
    auth
      .login({ username, password })
      .then(user => {
        this.setState({
          isLoggedin: true,
          user
        });
        notify(`Welcome ${username}!`, 'welcome')
      })
      .catch(() => {
        notify(`Username or password is incorrect!`, 'warning')
      });
  };

  logout = () => {
    auth
      .logout()
      .then(() => {
        this.setState({
          isLoggedin: false,
          user: null
        });
      })
      .catch(() => {});
  };
  render() {
    const { isLoading, isLoggedin, user } = this.state;
    return isLoading ? (
      <SpinnerContainer>
        <Loader 
        type="Plane"
        color="#00BFFF"
        height="100"	
        width="100"
        /> 
      </SpinnerContainer> 
    ) : (
      <Provider
        value={{
          isLoggedin,
          user,
          login: this.login,
          logout: this.logout,
          signup: this.signup
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export default AuthProvider;
