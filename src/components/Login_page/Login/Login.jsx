import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import "./stl.css";
// import User from "../Slicer/UserSlicer";
// import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { setUser } from "../../Slicer/UserSlicer";


const LoginPage = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();


  
  const UpdateUser = (data) => {
    dispatch(setUser(data));
  };
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const HandleLogin = async () => {
    try {
      // Replace 'http://localhost:5000' with your actual backend API URL
      const response = await axios.post("http://localhost:3500/login", {
        Username: username,
        password,
        rememberMe,
      });
      // const state = useSelector((state) => state.User);
      console.log("Login sucecessful:", response.data);
      UpdateUser(response.data);
      nav('/');

      // console.log("state is ", state);
      // Handle successful login (e.g., redirect to dashboard)
    } catch (error) {
      console.error("Login failed:", error.message);
      // Handle login failure (e.g., show error message)
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  // const val = useSelector((state) => state.user);
  // console.log("selected", val);
  return (
    // <Provider store={store}>
    <div className="container mt-5" style={{ backgroundColor: "white" }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
          
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    UserName:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={togglePasswordVisibility}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                      />
                    </button>
                  </div>
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember Me
                  </label>
                </div>
                <div className="d-grid">
                  {/* Use d-grid to make the button take full width */}
                  <button
                    type="button"
                    className="btn btn-primary rounded-0 border-0"
                    style={{ fontSize: "1.2em" }}
                    onClick={HandleLogin}
                  >
                    Login
                  </button>
                </div>
                <div className="text-center mt-3">
                  <a href="/forgot-password">Forgot Password?</a>
                </div>
                <div className="text-center mt-3">
                  <span>Don't have an account? </span>
                  <NavLink to="/signup">Sign Up</NavLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </Provider>
  );
};

export default LoginPage;