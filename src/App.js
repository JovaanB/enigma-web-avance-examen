import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import NotProtectedRoute from './routes/NotProtectedRoute';
import {Login} from './pages/Login';
import {Home} from './pages/Home';
import {NotFound} from './pages/NotFound';

const App = () => (
  <>
    <Router>
      <Switch>
        <ProtectedRoute exact path="/" component={Home} />
        <NotProtectedRoute exact path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </>
);

export default App;
