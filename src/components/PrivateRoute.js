import React from "react";
import { Route, Redirect } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import { Query } from "react-apollo";
import { IS_LOGGEDIN } from "../lib/queries";


function PrivateRoute({ component: Component, isLoggedin, ...rest }) {
  return (
    <Query query={IS_LOGGEDIN}>
    {({loading, data,error})=>{
      if(loading) return "loading..."
      if(error) return <Redirect to="/loginn" />
      const  {currentsession} =data.usersession
      if(currentsession)
      return "hola" 
    }}
    {/* <Route
      {...rest}
      
      render={props =>
        isLoggedin ? <Component {...props} /> : <Redirect to="/login" />
      }
    /> */}
    </Query>
  );
}

export default withAuth(PrivateRoute);
