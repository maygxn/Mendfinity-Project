import React from "react";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="generalContainer">
      <div className="formContainer">
        <div>
          <div className="loginName">Login</div>
          <LoginForm />
          <p>Don't have an account? <Link to="/Register">Register</Link></p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;