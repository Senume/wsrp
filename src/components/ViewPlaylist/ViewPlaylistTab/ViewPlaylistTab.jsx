import React, { useEffect, useState } from 'react';
import { useSelector} from 'react-redux';
// import { FaPlus } from "react-icons/fa";

import Playlist from '../../../utils/PlaylistClass';

import ViewPlaylistBox from '../ViewPlaylistBox/ViewPlaylistBox';




function ViewPlaylistTab() {

    const [PlaylistDetails, setPlaylistDetails] = useState([]);

    var SelectedPlaylist = useSelector(state => state.user.CurrentPlaylist);
    console.log("Current Selected Playlist: " + SelectedPlaylist)

    useEffect(() => {

        const fetchPlaylistData = async () => {
            const PlaylistObject = new Playlist();

            for (let i = 0; i < 5; i++) {
                let PlaylistData = await PlaylistObject.GetPlaylistbyUser('global');
                if (PlaylistData) {setPlaylistDetails(PlaylistData); break; }
            }
        }   

        fetchPlaylistData();

     },[]);

    // console.log("In state: ", PlaylistDetails);

    return (
        <div className='playlistTab'>
            <div>
                <div className="heading">
                    Playlist                    
                </div>

            </div>

            <div className="displaybox">
                {   
                    (PlaylistDetails)?(
                    PlaylistDetails.map((item, index) => <ViewPlaylistBox key = {index} data={item} />)): <></>
                }
            </div>
            
        </div>
    );
}

export default ViewPlaylistTab;