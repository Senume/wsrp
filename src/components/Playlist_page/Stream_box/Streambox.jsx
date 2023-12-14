import React from 'react';
import './Streambox.css';

import cover from './Data/cover.jpg';
import { FaPlay } from "react-icons/fa";

function Logging(event) {
    console.log("Clicked me");
    
    event.innerHTML = "A";
}

function Streamer() {
    return (
        <div className="Stream_outerbox">
            <div className="album_cover">
                <img alt='song_cover' src={cover} />
            </div>
            <div className="song_detail">
                <h1 id="song_title">Under the Tree</h1>
                <h2 id='descrip'>SIMs, NUEKI</h2>
            </div>
            <div className="controls">
                <input type="range" name="time" min="0" max="100" step="1" id="range" className="slider" onChange={Logging}/>
                <button onClick={Logging} id='ppbutton'>
                    <FaPlay/>
                </button>
            </div>
        </div>
    );
}

export default Streamer;
