import React, { useEffect } from "react";
import { useState } from "react";

import PlaylistTab from "../PlaylistTab/PlaylistTab";
import SongsTab from "../SongsTab/SongsTab";
import HistoryTab from "../HistoryTab/HistoryTab";
import MediaPlayer from "../MediaPlayer/MediaPlayer";

import './PlaylistLayout.css'

function PlalistLayout() {

    const [SongToPlay, setSongToPlay] = useState(null);
    const [url, seturl] = useState(null);

    const handleWhenSelected = (ID) => {
        setSongToPlay(ID);
        console.log("Selected a song to play", ID);
    }

    useEffect(() => {
        seturl("http://localhost:3500/stream/" + SongToPlay);
    }, [SongToPlay])

    return (
        <div className="layout">
            <PlaylistTab />
            <SongsTab handle={handleWhenSelected}/>
            <HistoryTab />
            {/* {(SongToPlay !== null)?<MediaPlayer streamUrl={url} />:<></>} */}
            {SongToPlay !== null ? (
                <MediaPlayer streamUrl={`http://localhost:3500/stream/${SongToPlay}`} />
            ) : (
                <div className="placeholder">
                    <p>Select a song to play</p>
                </div>
            )}
            
        </div>
    )

}

export default PlalistLayout;
