import React from "react";

import './Songbox.css'



function SongBox(props) {
    

    return (
        <div className="SongBox">
            <img src={props.value.CoverURL} width={50} alt="coverart" />
            <li>{props.value.SongTitle}</li>
        </div>
    )
}

export default SongBox;