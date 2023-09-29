import './App.css';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import Auth from './Components/2FA/auth';
import Verify from './Components/2FA/verify';
import Dashboard from './Components/Dashboard/dashboard';


import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Sidebar from './Components/Sidebar/Sidebar';
import Navigation from './Components/Navigation/Navigation';
import ShowProducts from './Components/Productos/ShowProducts/ShowProducts';

function App() {
  return (
    <div className="app">
        <Sidebar />
        <ShowProducts/>
      <BrowserRouter>
        <Routes>
          <Route path="/test" element={<div>Hello</div>} />
          <Route path="/" element={<Signin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Auth" element={<Auth />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;