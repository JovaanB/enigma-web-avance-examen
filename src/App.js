import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Login} from './pages/Login';
import {Home} from './pages/Home';

const App = () => (
  <>
    <Router>
      <Switch>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  </>
);

export default App;
