import React from "react";

import './HistorySongBox.css';



function HistorySongBox(props) {
    

    return (
        <div className="HistorySongBox">
            <img src={props.value.CoverURL} width={50} alt="coverart" />
            <li>{props.value.SongTitle}</li>
        </div>
    )
}

export default HistorySongBox;
