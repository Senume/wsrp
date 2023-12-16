import React from "react";
// import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Playlist from "../../../utils/PlaylistClass";
import Song from "../../../utils/SongClass";

import SongBox from "../SongBox/SongBox";
import './SongsTab.css';

function SongsTab (props) {

    var playlistID = useSelector( state => state.user.CurrentPlaylist);
    var ToBeAddedSong = useSelector( state => state.user.ToBeAdded);
    // console.log("SongTab side - Currently selected PLaylist:", playlistID);
    // console.log('Playlist ID at songslist: ', playlistID);

    const [PlaylistDetails, setPlaylistDetails] = useState({});
    const [Songlist, setSonglist] = useState([]);


    
    useEffect(() =>{
        
        const fetchCurrentPlaylistDetails = async () => {
            
            const NewPlaylistObject = new Playlist();

            if (playlistID) {
            const Data = await NewPlaylistObject.GetPlaylistbyID(playlistID);
            if (Data) setPlaylistDetails(Data);
            }
        }

        fetchCurrentPlaylistDetails()
    }, [playlistID, ToBeAddedSong]);

    useEffect(()=> {
        const fetchSongdetails = async () => {
            const SongObject = new Song();

            if (PlaylistDetails.SongList && PlaylistDetails) {
            
            for (let i = 0; i < 5; i++){
                const SongDetails = await SongObject.ListDetails(PlaylistDetails.SongList);
                if (SongDetails !== 0 ) {setSonglist(SongDetails);
                break;}
            }
        
            }

        }

        fetchSongdetails();

    }, [PlaylistDetails])

    // console.log("Selected Playlst song details: ", Songlist);

    return (
    <div className="songlist">
        <div className="heading">
            <span className="title">Songs</span>
        </div>

        <div className="list">
            { Songlist.map((item) => <SongBox value={item} handle={props.handle}/> )}
        </div>
    </div>
    );
}

export default SongsTab;