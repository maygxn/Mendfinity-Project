import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      console.log(user);
      navigate("/MainPage"); // Navigate on user update if not null
    }
  }, [user, navigate]);

  const formSchema = yup.object({
    username: yup.string().required("Please enter username"),
    password: yup.string().required("Please enter password."),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      setSubmitting(true);
      setError(""); // Reset error state on new submission
      fetch("http://127.0.0.1:5555/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) =>
          res.ok ? res.json() : Promise.reject("Failed to login.")
        )
        .then((data) => {
          setUser(data); // This will trigger the useEffect above
          sessionStorage.setItem('access_token', data.access_token)
          console.log(data);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
          setError("Login failed. Please try again."); // Set error state
        })
        .finally(() => {
          setSubmitting(false); // Always reset submitting state
        });
    },
  });

  return (
    <div id="login_form">
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.username}
            placeholder="Username"
          />
          {formik.errors.username && <div>{formik.errors.username}</div>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="Password"
          />
          {formik.errors.password && <div>{formik.errors.password}</div>}
        </div>
        {error && <div>{error}</div>}
        <button type="submit" disabled={submitting}>
          {submitting ? "Logging in..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
