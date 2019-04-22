import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';

const client = new ApolloClient ({
  link : new HttpLink ({
    uri: '/graphql',
    credentials:'same-origin'
  }),
})

ReactDOM.render(
  <ApolloProvider client ={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>
, document.getElementById('root'));
