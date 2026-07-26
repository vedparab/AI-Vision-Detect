import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { logout } from "../services/authService";

import logo from "../assets/logo.png";
import "../styles/Dashboard.css";

function DashboardNavbar() {

    const [showMenu, setShowMenu] = useState(false);

    const { user } = useAuth();

    const navigate = useNavigate();
    
    const handleLogout = async () => {

        try {

            await logout();

            navigate("/");

        } catch (error) {

            console.error(error);

        }

    };
    
    return (

       <header className="dashboard-navbar">

            <div className="navbar-left">

                <img
                    src={logo}
                    alt="AI Vision Detect Logo"
                    className="dashboard-logo"
                />

                <h2>AI Vision Detect</h2>

            </div>

            <div className="navbar-right">

                <div
                    className="profile-trigger"
                    onClick={() => setShowMenu(!showMenu)}
                >
                {showMenu && (

                    <div className="profile-dropdown">

                        <div className="dropdown-header">

                            <div className="dropdown-avatar">

                                {user?.email?.charAt(0).toUpperCase()}

                            </div>

                            <div>

                                <h4>{user?.displayName || "User"}</h4>

                                <p>{user?.email}</p>

                            </div>

                        </div>

                        <hr />

                        <Link
                            to="/profile"
                            className="dropdown-item"
                        >
                            My Profile
                        </Link>

                        <button
                            className="dropdown-item logout-btn"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>

                    </div>

                )}

                    <div className="profile-avatar">

                        {user?.email?.charAt(0).toUpperCase()}

                    </div>

                    <span className="profile-name">

                        {user?.displayName || "User"}

                    </span>

                </div>

            </div>

        </header> 

        

    );

}

export default DashboardNavbar;