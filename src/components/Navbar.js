import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../EDECS Logo_.svg";
import "./Navbar.css";

const Navbar = ({ isLoggedIn }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <Logo className="navbar-logo-svg" />
        </Link>
        <ul className="navbar-menu">
          {isLoggedIn && ( // عرض زر Home فقط إذا كان المستخدم مسجل الدخول
            <li>
              <Link to="/home">Home</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
