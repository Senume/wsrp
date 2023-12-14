import React, { useState } from 'react';
import { CiCircleCheck, CiCircleRemove } from "react-icons/ci";
import { useDispatch } from 'react-redux';
import { UpdateSelectedSongID } from '../../Slicer/UserSlicer';

import './HistroyBox.css';

function HistoryBox (props) {

    const dispatch = useDispatch();

    const [Selected, setSelected] = useState(false);

    const selectionHandle = () => {
        setSelected(state => !state);
        dispatch(UpdateSelectedSongID(props.value.ID));
    }

    return (
        <div className="historybox">
            <img src={props.value.CoverURL} width={50} alt="coverart" />
            <div className='content'>
                <li>{props.value.SongTitle}</li>
                <div className="selectbutton" onClick={selectionHandle}>{Selected?<CiCircleCheck />:<CiCircleRemove />}</div>
            </div>
        </div>
    );
}

export default HistoryBox;