import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaPlus } from "react-icons/fa";

import Playlist from '../../../utils/PlaylistClass';
import { AddaPlaylist } from '../../Slicer/UserSlicer';

import PlaylistBox from '../PlaylistBox/PlaylistBox';

import './PlaylistTab.css';


function PlaylistTab() {

    var Playlist_Ids = useSelector(state => state.user.PlaylistList);
    const userId = useSelector(state => state.user.UserName);
    var ToBeAddedSong = useSelector( state => state.user.ToBeAdded);

    console.log("Playlist IDs: ", Playlist_Ids);
    console.log("User: ", userId);

    const dispatch = useDispatch();

    const [PlaylistDetails, setPlaylistDetails] = useState([]);
    const [ShowBox, setShowBox] = useState(false);
    const [Inputbox, setInputbox] = useState('');

    const ShowBoxHandle = () =>  {
        setShowBox(state => state = !ShowBox);
    };

    const InputBoxHandle = async (event) => {

        console.log("Adding a new playlist event initiated");

        const NewPlaylist = new Playlist(Inputbox, userId);
        NewPlaylist.GenerateHashID();

        let value = NewPlaylist.GetSongList();
        console.log("Created playlist: ", value);

        await NewPlaylist.UpdatePlaylistDatabase(value);
        dispatch(AddaPlaylist(NewPlaylist.ID));

        setInputbox('');
        setShowBox(state => state = !ShowBox);
    };


    useEffect(() => {
        const fetchData = async () => {

            
            const Playlistobject = new Playlist();
            const Data = await Playlistobject.GetPlaylistDetails(Playlist_Ids);
            

            if (Data)
            setPlaylistDetails(Data);
        }

        fetchData();
     },[Playlist_Ids, ToBeAddedSong]);

    console.log("In state: ", PlaylistDetails);
    console.log(Inputbox)

    return (
        <div className='playlistTab'>
            <div>
                <div className="heading">
                    Playlist
                    {!ShowBox?<button className='addplaylist' onClick={ShowBoxHandle}><FaPlus /></button>:<></>}
                    
                </div>
                {ShowBox?
                (<div className='textbox'>
                    <input type='text' className='playlistnamebox' placeholder='enter a name' onChange={(event) => setInputbox(event.target.value)}/>
                    <button className='addplaylist' onClick={InputBoxHandle}><FaPlus /></button>
                </div>): <></>
                }   
            </div>

            <div className="displaybox">
                {   
                    (PlaylistDetails)?(
                    PlaylistDetails.map((item) => <PlaylistBox data={item} />)): <></>
                }
            </div>
            
        </div>
    );
}

export default PlaylistTab;