import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo-section">
        <Link to="/">
          <img
            src={logo}
            alt="AI Vision Detect Logo"
            className="logo"
          />
        </Link>
      
        <h2>AI Vision Detect</h2>
        
      </div>

      <div className="nav-buttons">
        <Link 
          to="/login"
          className="nav-login-btn"
        >
          Login

        </Link>
        <Link 
          to="/signup"
          className="nav-start-btn"
        >
          Get Started
          
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;