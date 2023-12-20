import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUpPage = () => {
  const nav = useNavigate();

  const [UserName, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [age, setAge] = useState("");
  const [UserType, setUserType] = useState("");
  // const [gender, setGender] = useState("male"); // Default to 'male'
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async () => {
    if (password === confirmPassword) {
      try {
        // Replace 'http://localhost:5000' with your actual backend API URL
        const response = await axios.post("http://localhost:3500/signup", {
          UserName,
          Email,
          password,
          UserType,
        });

        console.log("Signup successful:", response.data);

        // Handle successful signup (e.g., redirect to login page)
      } catch (error) {
        console.error("Signup failed:", error.message);
        // Handle signup failure (e.g., show error message)
      }
    } else {
      alert("password and confirm password don't match");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const isValidEmail = () => {
    // Perform your email validation logic here
    // You can use a regular expression or any other method
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(Email);
  };
  const handleSubmit = (e) => {
    // Perform your client-side validation here
    if (!isValidEmail()) {
      // Display an error message or handle invalid email
      alert("Invalid email address");
      return;
    }

    // If validation passes, proceed with HandleSignUp
    handleSignUp();
  };
  return (
    <div class="Body">
      <div class="Box">
        <span class="borderLine"></span>

        <form
          onSubmit={(e) => {
            handleSignUp();
            nav("/login");
          }}
        >
          <h2>Sign Up</h2>
          <div class="inputBox">
            <input
              type="text"
              required="required"
              placeholder=""
              value={UserName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <span>UserName</span>
            <i></i>
          </div>
          <div class="inputBox">
            <input
              type="Email"
              required="required"
              placeholder=""
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span>Email</span>
            <i></i>
          </div>
          <div class="inputBox">
            <input
              type="text"
              required="required"
              placeholder=""
              value={UserType}
              onChange={(e) => setUserType(e.target.value)}
            />
            <span>UserType</span>
            <i></i>
          </div>
          <div class="inputBox">
            <input
              type="password"
              required="required"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span>Password</span>
            <i></i>
          </div>
          <div class="inputBox">
            <input
              type="password"
              required="required"
              placeholder=""
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span>Confirm Password</span>
            <i></i>
          </div>
          <div class="links">
            {/* <a href="#">Forgot Password</a> */}
            <NavLink to="/login">Login</NavLink>
          </div>
          <input className="Login" type="submit" value="Sign Up" />
          {/* <button
            // type="button"
            className="Login"
            onClick={(e) => {
              e.preventDefault();
              handleSignUp();
            }}
          >
            Sign Up
          </button> */}
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;