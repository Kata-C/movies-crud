import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './views/Login';

function App() {
  return (
    <div className="App">
        <Layout />
    </div>
  );
}

export default App;
