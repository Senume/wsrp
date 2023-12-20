import React, { useEffect } from "react";
import { useState, useRef} from "react";
import { useSelector } from "react-redux";

import ViewPlaylistTab from "../ViewPlaylistTab/ViewPlaylistTab";
import ViewSongsTab from "../ViewSongsTab/ViewSongsTab";
import MediaPlayer from "../MediaPlayer/MediaPlayer";

import Song from "../../../utils/SongClass";

import './ViewPlaylistLayout.css'

function ViewPlaylistLayout() {

    var SelectedSongToPlay = useSelector(state => state.user.PlaySong);

    const AudioURL = useRef(null);
    const [SelectedSongDetails, setSelectedSongDetails] = useState(null);

    useEffect(() => {

        const fetchSongData = async () => {
            
            let SongObject = new Song();
            for (let i = 0; i < 5; i++) {
                let Data = await SongObject.GetDetails(SelectedSongToPlay);
                console.log("Data of the song :", Data);
                if (Data) { setSelectedSongDetails(Data); break;}
            }
        };


        if (SelectedSongToPlay){
            AudioURL.current = ("http://localhost:3500/stream/" + SelectedSongToPlay);
            fetchSongData();
        }
    }, [SelectedSongToPlay])

    console.log("SelectedSongToPlay", SelectedSongDetails)

    return (

        <div className="layout">
            <div>
            <ViewPlaylistTab />
            {SelectedSongToPlay && SelectedSongDetails ? (
                <MediaPlayer streamUrl={AudioURL.current} songdetails={SelectedSongDetails.SongTitle}/>
            ) : (
                <div className="placeholder">
                    <p>Select a song to play</p>
                </div>
            )}
            </div>
            <ViewSongsTab />
            
            
        </div>
    )

}

export default ViewPlaylistLayout;
