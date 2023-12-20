import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ResetUser } from "../Slicer/UserSlicer";
import axios from "axios";

import image from './Logo_BG.png'
import './Navbar.css';
import User from "../../utils/UserClass";

function Navbar() {
    
    const dispatch = useDispatch();
    const nav = useNavigate();
    const logoutUser = () => {
        dispatch(ResetUser());
    };
    const user = useSelector((state) => state.user);
    
    const HandleLogout = async () => {
        try {
            console.log("User", user);
            //   const data = useSelector((state) => state.User);
            const response = await axios.post("http://localhost:3500/logout", user);
            console.log("hola");
            console.log(response);
            console.log(user);
            // UpdateUser({});
            logoutUser();
            // console.log("navbar after logout", user);
            nav('/');

        } catch (error) {
            console.log("error in logout ", error);
        }
    };

    let UserTypeSpecificContent;
    console.log("Navbar log: ", user)
    switch (user.UserType) {
        case "global":
            UserTypeSpecificContent = (
                <>
                    {/* Specific content for global user */}
                    <li>About</li>
                    <li><NavLink to='/'>Recognise</NavLink></li>
                    <li><NavLink to='/login'>Login</NavLink></li>
                </>
            );
            break;

        case "common":
            UserTypeSpecificContent = (
                <>
                    <li>About</li>
                    <li><NavLink to='/'>Recognise</NavLink></li>
                    <li><NavLink to='/viewplaylist'>View Playlist</NavLink></li>
                    <li><NavLink to='/UpdateProfile'>Update Profile</NavLink></li>
                    <button className="btn btn-danger" onClick={HandleLogout}>Logout</button>
                </>

            );
            break;

        case "playlist-maker":
            UserTypeSpecificContent = (
                <>
                    {/* Specific content for playlist-maker user */}
                    <li>About</li>
                    <li><NavLink to='/playlists'>Make Playlist</NavLink></li>
                    <li><NavLink to='/UpdateProfile'>Update Profile</NavLink></li>
                    <button className="btn btn-danger" onClick={HandleLogout}>Logout</button>
                </>
            );
            break;
        case "admin":
            UserTypeSpecificContent = (
                <>
                    {/* Specific content for admin user */}
                    <li><NavLink to='/dash'>Dashboard</NavLink></li>
                    <li><NavLink to='/'>Recognise</NavLink></li>
                    <li><NavLink to='/playlists'>Make Playlist</NavLink></li>
                    <li><NavLink to='/viewplaylist'>View Playlist</NavLink></li>
                    <li><NavLink to="/UpdateProfile">Update Profile</NavLink></li>
                    <button className="btn btn-danger" onClick={HandleLogout}>Logout</button>
                </>
            );
            break;
        default:
            UserTypeSpecificContent = null;
    }

    return (
        <nav className="bar">
            <div className="logo">
                <img src={image} width={150} alt="LOGO"/>
            </div>
            <div className="menu">
                {/* Common elements for all user types */}

                {/* User type specific content */}
                {UserTypeSpecificContent}
            </div>
        </nav>
    );
}

export default Navbar