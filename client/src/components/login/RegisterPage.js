import React from "react";
import RegisterForm from "./RegisterForm";
import { Link } from "react-router-dom";

function RegisterPage() {
  return (
    <div className="generalContainer">
      <div className="formContainer">
        <div>
          <div>Register</div>
          <RegisterForm />
          <p>Have an account? <Link to="/">Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
