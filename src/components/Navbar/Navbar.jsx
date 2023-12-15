import React from "react";
import { NavLink } from "react-router-dom";
import image from './Logo_BG.png'
import './Navbar.css';

function Navbar() {

    return (
        <nav className="bar">
            <div className="logo">
                <img src={image} width={150} alt="LOGO"/>
            </div>
            <div className="menu">
                    <li>About</li>
                    <li><NavLink to='/dash'>Dashboard</NavLink></li>
                    <li><NavLink to='/'>Recognise</NavLink></li>
                    <li><NavLink to='/playlists'>Playlist</NavLink></li>
                    <li><NavLink to='/login'>Login</NavLink></li>

            </div>
        </nav>
    )
}

export default Navbar