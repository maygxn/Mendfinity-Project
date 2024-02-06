import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

function LoginForm() {
  const navigate = useNavigate(); // Use useNavigate hook to get the navigate function

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
    onSubmit: (values, { setSubmitting }) => {
      // Add setSubmitting parameter
      fetch("http://127.0.0.1:5555/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then((data) => {
          console.log(data);
          if (data) {
            // Check if login was successful
            navigate("/MainPage");
            console.log("login successful"); // Navigate to the home page
          } else {
            alert(data.message); // Show error message
          }
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        })
        .finally(() => {
          setSubmitting(false); // Reset submitting state after form submission
        });
    },
  });
  return (
    <div id="login_form">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
      >
        {" "}
        {/* Prevent default form submission */}
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default LoginForm;
