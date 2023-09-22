// App.js
import React from 'react';
import Sidebar from '../Util/Sidebar';

function App() {
  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              {/* Main Navigation */}
              <Sidebar />
            </div>
          </div>
        </nav>
        {/* Resto del contenido del encabezado */}
      </header>
      <main className="container-fluid">
        {/* Contenido principal */}
        <h1>Dashboard</h1>
        {/* Resto de tu aplicación */}
      </main>
    </div>
  );
}

export default App;
