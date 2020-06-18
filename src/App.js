import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import CityList from './pages/CityList'
import Map from './pages/Map'
// import { Button } from 'antd-mobile';
function App() {
  return (
    <Router>
    <Route
      path="/"
      render={props => {
          return <Redirect to="/home/index"></Redirect>
      }}
      ></Route>
    <Route path='/home' component={Home}></Route>
    <Route path='/cityList' component={CityList}></Route>
    <Route path="/map" component={Map}/>
    </Router>
  );
}

export default App;
