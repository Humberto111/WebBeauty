import { useState } from 'react';
import Dashboard from './Modules/Dashboard';
import Signin from './Modules/Signin';
import Register from './Modules/Register';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
