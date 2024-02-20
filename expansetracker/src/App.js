import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './component/Login';
import Signup from './component/Signup'
import Navbar from './component/Navbar';
import Home from './component/Home';
import About from './component/About';
function App() {
  return (
    <>
     <Router>
    <Navbar></Navbar>
    <Routes>
      <Route path='/' element={<Home/>}/>
  
      <Route path='login' element={<Login/>} />
  
      <Route path='signup' element={<Signup/>} />
      <Route path='about' element={<About/>} />
    </Routes>
    </Router>
    </>
  );
}

export default App;
