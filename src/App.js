import React from 'react';

import CompanyList from './pages/CompanyList'
import CompanyDetails from './pages/CompanyDetails'
import EmployeeList from './pages/EmployeeList'
import { ApolloProvider } from '@apollo/react-hooks'
import client from './helpers/ApolloInstance'

import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <Switch>

            <Route exact path="/">
              <CompanyList />
            </Route>

            <Route exact path="/company">
              <CompanyDetails />
            </Route>

            <Route path="/company/:id">
              <CompanyDetails />
            </Route>

            <Route exact path="/employees/:id">
              <EmployeeList />
            </Route>

          </Switch>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
