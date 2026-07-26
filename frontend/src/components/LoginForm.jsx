import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";
import logo from "../assets/logo.png";
import { login } from "../services/authService";
import { googleLogin } from "../services/authService";
import { useNavigate } from "react-router-dom";
import googleLogo from "../assets/google-logo.svg";
function LoginForm() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

        await login(email, password);

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
    }catch (error) {
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

          <h1>Welcome Back</h1>

          <p>Login to continue to AI Vision Detect</p>

        </div>

        <form 
          className="login-form"
          onSubmit={handleLogin}
        >

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

          <div className="forgot-password">

            <a href="#">Forgot Password?</a>

          </div>

          <button className="auth-btn login-submit-btn" type="submit">

            Login

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

            Don't have an account?
            
            <Link
              to="/signup"
              className="text-link"
            >

              Sign Up

            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default LoginForm;