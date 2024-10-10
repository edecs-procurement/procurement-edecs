import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../EDECS Logo_.svg"; // استيراد الشعار
import "./Navbar.css"; // تأكد من استيراد ملف CSS

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <Logo className="navbar-logo-svg" /> {/* عرض الشعار كمكون SVG */}
                </Link>
                <ul className="navbar-menu">
                    <li><Link to="/">Home</Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
