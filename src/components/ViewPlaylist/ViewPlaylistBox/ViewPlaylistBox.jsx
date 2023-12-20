import React from 'react';
import { useDispatch } from 'react-redux';
import { UpdateCurrentPlaylist } from '../../Slicer/UserSlicer';

import './ViewPlaylistbox.css';

function ViewPlaylistBox (props) {

    const dispatch = useDispatch();

    const handleOnclick = () => {
        dispatch(UpdateCurrentPlaylist(props.data.ID))
    }

    return (
        <div className="playlistBox" onClick={() => handleOnclick()} >
            <div className='count'>{props.data.SongList.length}</div>
            <div className='title'>{props.data.Name}</div>
        </div>
    );
};

export default ViewPlaylistBox;