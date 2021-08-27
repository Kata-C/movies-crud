
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './views/Login';

function App() {
  return (
    <div className="App">
       <Router>
          <Switch>
            <Route  path='/' component={Layout} exact />
            <Route  path='/login' component={Login} exact />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
