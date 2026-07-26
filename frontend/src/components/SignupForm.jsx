import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";
import logo from "../assets/logo.png";
import { signUp } from "../services/authService";
import { googleLogin } from "../services/authService";
import { useNavigate } from "react-router-dom";
import googleLogo from "../assets/google-logo.svg";
function SignupForm() {

  const [fullName, setFullName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  
  const handleSignup = async (e) => {

    e.preventDefault();

    if (password !== confirmPassword) {

        alert("Passwords do not match.");

        return;

    }

    try {

        await signUp(email, password);

        navigate("/dashboard");

    }

    catch (error) {

        alert(error.message);

    }

  };
  const handleGoogleLogin = async () => {
    try {
      await googleLogin();

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <div className="login-header">

          <Link to="/">
            <img src={logo} alt="Logo" className="login-logo" />
          </Link>
          
          <Link
            to="/"
            className="brand-link"
          >
            <h2>AI Vision Detect</h2>
          </Link>
          

          <h1>Create Account</h1>

          <p>Join AI Vision Detect today</p>

        </div>

        <form 
          className="login-form"
          onSubmit={handleSignup}
        >

          <label>Full Name</label>

          <input
            type="text"
            placeholder="John Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <label>Email</label>

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Confirm Password</label>

          <input
            type="password"
            placeholder="********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit" className="auth-btn login-submit-btn">

            Create Account

          </button>
      
          <div className="login-divider">
            <span>OR</span>
          </div>

          <button type="button" onClick={handleGoogleLogin} className="auth-btn login-google-btn google-btn">
            <img
              src={googleLogo}
              alt="Google Logo"
              className="google-logo"
            />
            <span>Continue with Google</span>
          </button>

        </form>

        <div className="signup-link">

          <p>

            Already have an account?
            
            <Link
              to="/login"
              className="text-link"
          >

            Login

          </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default SignupForm;