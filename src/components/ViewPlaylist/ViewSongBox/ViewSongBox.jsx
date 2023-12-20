import React from "react";
import { useDispatch } from "react-redux";
import { UpdatePlaySong } from "../../Slicer/UserSlicer";

import './ViewSongbox.css'

function ViewSongBox(props) {
    const dispatch = useDispatch();

    const handlePlaySong = () => {
        dispatch(UpdatePlaySong(props.value.ID))
        console.log("Song Selected to Play", props.value.ID);
    }

    return (
        <div className="SongBox" >
            <img  src={props.value.CoverURL} width={50} alt="coverart" />
            <li>{props.value.SongTitle}</li>
            <button onClick={() => handlePlaySong()} >Play</button >
        </div>
    )
}

export default ViewSongBox;