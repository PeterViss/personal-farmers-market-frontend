import React from 'react';
import MainContainer from './Containers/MainContainer'
import {BrowserRouter as Router} from "react-router-dom"
import './App.css';

const App = () => {
  return (
  <Router>
   <div className="App">
     <MainContainer />
   </div>
  </Router>
  )
}

export default App;
