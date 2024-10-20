import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Views/Home.jsx"
import Menu from "./Views/Menu.jsx"
import './App.css'


function App() {
  return (
    <>
    {/* <link rel="icon" href={img2} /> */}
    <Router>
      {/* <Navigation/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Menu" element={<Menu />} />
      </Routes>
    </Router>
     
    </>
  )
}

export default App