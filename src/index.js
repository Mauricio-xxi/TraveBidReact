import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient ({
  networkInterface : createNetworkInterface({
    uri: '/api',
  }),
})

ReactDOM.render(
  <Router>
    <ApolloProvider client ={client}>
      <App />
    </ApolloProvider>
  </Router>
, document.getElementById('root'));
