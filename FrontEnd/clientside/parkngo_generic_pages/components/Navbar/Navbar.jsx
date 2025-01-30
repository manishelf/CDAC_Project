import React, { useState } from "react";
import "./navbar.css";
import { RiParkingBoxFill } from "react-icons/ri";

const Navbar = () => {
  const [active, setActive] = useState("navBar");

  return (
    <section className="navBarSection">
      <header className="header flex">
        <div>
          <h1>
            <RiParkingBoxFill className="icon" /> Online Parking
          </h1>
        </div>
        <div className={active}>
          <ul className="navLists flex">
            <li className="navItem">
              <a href="#home" className="navLink">
                Home
              </a>
            </li>
            <li className="navItem">
              <a href="#menu" className="navLink">
                Menu
              </a>
            </li>
            <li className="navItem">
              <a href="#login" className="navLink">
                Login
              </a>
            </li>
            <li className="navItem">
              <a href="#signup" className="navLink">
                Sign Up
              </a>
            </li>
          </ul>
        </div>
      </header>
    </section>
  );
};

export default Navbar;
