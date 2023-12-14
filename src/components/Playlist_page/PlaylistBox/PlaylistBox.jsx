import React from 'react';
import { useDispatch } from 'react-redux';

import { UpdateCurrentPlaylist, RemoveSelectedSongID } from '../../Slicer/UserSlicer';

import './Playlistbox.css';

function PlaylistBox (props) {
    
    const dispatch = useDispatch();

    const SelectingPlaylistHandle = () => {
        dispatch(UpdateCurrentPlaylist(props.data.ID));
        dispatch(RemoveSelectedSongID());
    }


    return (
        <div className="playlistBox" onClick={SelectingPlaylistHandle}>
            <div className='count'>{props.data.SongList.length}</div>
            <div className='title'>{props.data.Name}</div>
        </div>
    );
};

export default PlaylistBox;