import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import CityList from './pages/CityList'
// import { Button } from 'antd-mobile';
function App() {
  return (
    <Router>
    <Route path='/home' component={Home}></Route>
    <Route path='/cityList' component={CityList}></Route>
    </Router>
  );
}

export default App;
