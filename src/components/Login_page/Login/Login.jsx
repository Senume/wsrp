import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

// import User from "../Slicer/UserSlicer";
// import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { setUser } from "../../Slicer/UserSlicer";
import "./Login.css";
const LoginPage = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const UpdateUser = (data) => {
    dispatch(setUser(data));
  };
  const [UserName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const HandleLogin = async () => {
    try {
      // Replace 'http://localhost:5000' with your actual backend API URL
      const response = await axios.post("http://localhost:3500/login", {
        UserName: UserName,
        password,
        rememberMe,
      });
      // const state = useSelector((state) => state.User);
      console.log("Login sucecessful:", response.data);
      UpdateUser(response.data);
      nav("/");

      // console.log("state is ", state);
      // Handle successful login (e.g., redirect to dashboard)
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("Incorrect Password");
      // Handle login failure (e.g., show error message)
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div class="Body">
      <div class="box">
        <span class="borderLine"></span>
        <form>
          <h2>Sign In</h2>
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
              type="password"
              required="required"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span>Password</span>
            <i></i>
          </div>
          <div class="links">
            {/* <a href="#">Forgot Password</a> */}
            <NavLink to="/signup">Sign Up</NavLink>
          </div>
          <button
            // type="button"
            className="Login"
            onClick={(e) => {
              e.preventDefault();
              HandleLogin();
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;