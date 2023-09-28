import './App.css';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Sidebar from './Components/Sidebar/Sidebar';
import Navigation from './Components/Navigation/Navigation';
import ShowProducts from './Components/Productos/ShowProducts/ShowProducts';

function App() {
  return (
    <div className="app">
        <Sidebar />
        <ShowProducts/>
    </div>
  );
}

export default App;