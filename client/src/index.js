import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

/** top level components */
import App from './components/App';
import Header from './components/layouts/Header';
import Add from './components/orders/Add';
import List from './components/orders/List';

/** create Apollo client for GraphQL */
const client = new ApolloClient({
    uri: 'http://localhost:8080/data'
});

/** router */
const Root = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/add" component={Add} />
        <Route path="/list" component={List} />
        <Redirect to="/" />
      </Switch>
    </Router>
  )
};

ReactDOM.render(
    <ApolloProvider client={client}>
        <Root />
    </ApolloProvider>,
    document.getElementById('root')
);
