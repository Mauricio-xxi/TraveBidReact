import { gql } from "apollo-boost";

export  const LOGIN_USER = gql`
  mutation login($username : String!, $password : String!){
      login(input:{username:$username,password:$password}){
        username
    }
  }
`