// import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { NavLink } from "react-router-dom";
// import User from "../Slicer/UserSlicer";
// import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../Slicer/UserSlicer";

const UpdateProfile = () => {
  const [UserName, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male"); // Default to 'male'
  const [showPassword, setShowPassword] = useState(false);
  const val = useSelector((state) => state.user);
  console.log("state", val);
  const dispatch = useDispatch();
  const UpdateUser = (data) => {
    dispatch(setUser(data));
  };
  const handleUpdate = async () => {
    try {
      let tempuser = val.UserName;
      const pass = await axios.post("http://localhost:3500/finduser", {
        UserName: val.UserName,
      });

      console.log(pass, password);
      if (pass.data.password === password) {
        UpdateUser({ UserName, Email, age, gender });
        // Replace 'http://localhost:5000' with your actual backend API URL
        const response = await axios.post("http://localhost:3500/userupdate", {
          OldUser: tempuser,
          UserName: UserName,
          Email,
          age,
          gender,
        });

        console.log("Signup successful:", response.data);
      } else {
        console.log("incorrect password");
      }
      // Handle successful signup (e.g., redirect to login page)
    } catch (error) {
      console.error("Signup failed:", error.message);
      // Handle signup failure (e.g., show error message)
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //   UserName = val.UserName;
  useEffect(() => {
    // Set the initial value from val.UserName when the component mounts
    setUserName(val.UserName);
    setEmail(val.Email);
    setAge(val.age);
    setGender(val.gender);
  }, [val.UserName]);
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h1 className="text-center">Update Profile</h1>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="UserName" className="form-label text-start">
                    Name:
                  </label>
                  <input
                    type="text"
                    // defaultValue={val.UserName}
                    // placeholder={`${val.UserName}`}
                    className="form-control"
                    id="UserName"
                    value={UserName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Email" className="form-label text-start">
                    Email:
                  </label>
                  <input
                    type="Email"
                    defaultValue={val.Email}
                    className="form-control"
                    id="Email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="age" className="form-label text-start">
                    Age:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="gender" className="form-label text-start">
                    Gender:
                  </label>
                  <div className="form-check">
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="male"
                      checked={gender === "male"}
                      onChange={() => setGender("male")}
                      className="form-check-input"
                    />
                    <label htmlFor="male" className="form-check-label">
                      Male
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="female"
                      checked={gender === "female"}
                      onChange={() => setGender("female")}
                      className="form-check-input"
                    />
                    <label htmlFor="female" className="form-check-label">
                      Female
                    </label>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label text-start">
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
                <div className="d-grid">
                  {/* Use d-grid to make the button take full width */}
                  <button
                    type="button"
                    className="btn btn-primary rounded-0 border-0"
                    style={{ fontSize: "1.2em" }}
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                </div>
                <div className="text-start mt-3">
                  <span>Already have an account? </span>
                  <NavLink to="/login">Login</NavLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UpdateProfile;
