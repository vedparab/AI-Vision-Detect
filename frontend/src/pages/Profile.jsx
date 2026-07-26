import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Profile.css";

function Profile() {
    const navigate = useNavigate();
    const { user:currentUser } = useAuth();

    const name =
        currentUser?.displayName ||
        currentUser?.email?.split("@")[0] ||
        "User";

    const email = currentUser?.email || "Not available";

    const initial = name.charAt(0).toUpperCase();

    return (
        <div className="profile-page">

            <div className="profile-card">

                <div className="profile-page-avatar">
                    {initial}
                </div>

                <h1>My Profile</h1>

                <div className="profile-info">

                    <div className="profile-field">
                        <span>Name</span>
                        <p>{name}</p>
                    </div>

                    <div className="profile-field">
                        <span>Email</span>
                        <p>{email}</p>
                    </div>

                </div>

                <button
                    className="profile-back-btn"
                    onClick={() => navigate("/dashboard")}
                >
                    Back to Dashboard
                </button>

            </div>

        </div>
    );
}

export default Profile;