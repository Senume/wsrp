import React from "react";
// import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Playlist from "../../../utils/PlaylistClass";
import Song from "../../../utils/SongClass";

import ViewSongBox from "../ViewSongBox/ViewSongBox";
import './ViewSongsTab.css';

function ViewSongsTab (props) {

    var SelectedPlaylistID = useSelector( state => state.user.CurrentPlaylist);
    // console.log("SongTab side - Currently selected PLaylist:", playlistID);
    // console.log('Playlist ID at songslist: ', playlistID);

    const [PlaylistDetails, setPlaylistDetails] = useState({});
    const [Songlist, setSonglist] = useState([]);


    
    useEffect(() =>{
        
        const fetchCurrentPlaylistDetails = async () => {
            
            const NewPlaylistObject = new Playlist();
            if (SelectedPlaylistID) {
                for (let i = 0; i < 5; i++ ) {
                    let Data = await NewPlaylistObject.GetPlaylistbyID(SelectedPlaylistID);
                    if (Data) { setPlaylistDetails(Data); break;}
                }
            }
        }

        fetchCurrentPlaylistDetails()
    }, [SelectedPlaylistID]);

    useEffect(()=> {
        const fetchSongdetails = async () => {
            
            const SongObject = new Song();
            if (PlaylistDetails.SongList !== null && PlaylistDetails) {            
                for (let i = 0; i < 5; i++){
                    let SongDetails = await SongObject.ListDetails(PlaylistDetails.SongList);
                    if (SongDetails) { setSonglist(SongDetails); break;}
                }
            }
        }

        fetchSongdetails();

    }, [PlaylistDetails])

    // console.log("Selected Playlst song details: ", Songlist);

    return (
    <div className="songlist">
        <div className="heading">
            <span className="title">{PlaylistDetails.Name}</span>
        </div>

        <div className="list">
        {/* handle={props.handle} */}       
            { Songlist.map((item, index) => <ViewSongBox key = {index} value={item} /> )}
        </div>
    </div>
    );
}

export default ViewSongsTab;