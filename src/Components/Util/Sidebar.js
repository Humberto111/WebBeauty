import React from "react";
import {
  RiHome6Line,
  RiPercentLine,
  RiPieChartLine,
  RiMailLine,
  RiNotification3Line,
  RiSettings4Line,
  RiLogoutCircleRLine,
} from "react-icons/ri";

const Sidebar = (props) => {
  const { showMenu } = props;

  return (
    <div
      className={`bg-dark fixed lg:left-0 top-0 w-28 h-100 d-flex flex-column justify-content-between py-5 rounded-top rounded-bottom z-50 transition-all ${
        showMenu ? "left-0" : "-left-100"
      }`}
    >
      <div>
        <ul className="pl-2">
          <li>
            <h1 className="text-2xl text-light text-uppercase font-weight-bold text-center my-3">
              Logo
            </h1>
          </li>
          <li className="bg-secondary p-2 rounded-top rounded-bottom">
            <a
              href="#"
              className="bg-primary p-2 d-flex justify-content-center rounded text-white"
            >
              <RiHome6Line className="text-2xl" />
            </a>
          </li>
          <li className="nav-item hover-bg-secondary p-2 rounded-top rounded-bottom">
            <a
              href="#"
              className="nav-link hover-bg-primary p-2 d-flex justify-content-center rounded text-primary"
            >
              <RiPercentLine className="text-2xl" />
            </a>
          </li>
          <li className="nav-item hover-bg-secondary p-2 rounded-top rounded-bottom">
            <a
              href="#"
              className="nav-link hover-bg-primary p-2 d-flex justify-content-center rounded text-primary"
            >
              <RiPieChartLine className="text-2xl" />
            </a>
          </li>
          <li className="nav-item hover-bg-secondary p-2 rounded-top rounded-bottom">
            <a
              href="#"
              className="nav-link hover-bg-primary p-2 d-flex justify-content-center rounded text-primary"
            >
              <RiMailLine className="text-2xl" />
            </a>
          </li>
          <li className="nav-item hover-bg-secondary p-2 rounded-top rounded-bottom">
            <a
              href="#"
              className="nav-link hover-bg-primary p-2 d-flex justify-content-center rounded text-primary"
            >
              <RiNotification3Line className="text-2xl" />
            </a>
          </li>
          <li className="nav-item hover-bg-secondary p-2 rounded-top rounded-bottom">
            <a
              href="#"
              className="nav-link hover-bg-primary p-2 d-flex justify-content-center rounded text-primary"
            >
              <RiSettings4Line className="text-2xl" />
            </a>
          </li>
        </ul>
      </div>
      <div>
        <ul className="pl-2">
          <li className="nav-item hover-bg-secondary p-2 rounded-top rounded-bottom">
            <a
              href="#"
              className="nav-link hover-bg-primary p-2 d-flex justify-content-center rounded text-primary"
            >
              <RiLogoutCircleRLine className="text-2xl" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
