// Sidebar.js
import React from 'react';

const Sidebar = () => {
  return (
    <div className="bg-light border-end" id="sidebar">
      <div className="sidebar-heading">Mi Barra Lateral</div>
      <ul className="nav flex-column">
        <li className="nav-item">
          <a className="nav-link" href="#">
            Enlace 1
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Enlace 2
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Enlace 3
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
