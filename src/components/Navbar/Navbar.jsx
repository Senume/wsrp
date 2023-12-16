import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ResetUser } from "../Slicer/UserSlicer";
import axios from "axios";

import image from './Logo_BG.png'
import './Navbar.css';

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

    return (
        <nav className="bar">
            <div className="logo">
                <img src={image} width={150} alt="LOGO"/>
            </div>
            <div className="menu">
                {
                    (user.Username === null && user.UserType === "global")?
                    (<>
                    <li>About</li>
                    <li><NavLink to='/'>Recognise</NavLink></li>
                    <li><NavLink to='/login'>Login</NavLink></li>
                    </>):
                    (<>
                    {(user.Username !== null && user.UserType === "common")?
                    (<>
                    <li>About</li>
                    <li><NavLink to='/'>Recognise</NavLink></li>
                    <li><NavLink to='/playlists'>Playlist</NavLink></li>
                    <li><NavLink to="/UpdateProfile">Update Profile</NavLink></li>
                    <button className="btn btn-danger" onClick={HandleLogout}>Logout</button>



                    </>):(<>
                        <li>About</li>
                        <li><NavLink to='/dash'>Dashboard</NavLink></li>
                        <li><NavLink to='/'>Recognise</NavLink></li>
                        <li><NavLink to='/playlists'>Playlist</NavLink></li>
                        <li><NavLink to="/UpdateProfile">Update Profile</NavLink></li>
                        <button className="btn btn-danger" onClick={HandleLogout}>Logout</button>
                        </>)}
                    </>)
                    
                }
                    {/* <li>About</li>
                    <li><NavLink to='/dash'>Dashboard</NavLink></li>
                    <li><NavLink to='/'>Recognise</NavLink></li>
                    <li><NavLink to='/playlists'>Playlist</NavLink></li>
                    <li><NavLink to='/login'>Login</NavLink></li>
                    <li><NavLink to="/UpdateProfile">Update Profile</NavLink></li>
                    <button className="btn btn-danger" onClick={HandleLogout}>Logout</button> */}



            </div>
        </nav>
    )
}

export default Navbar