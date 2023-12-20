import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { UpdateFileUploadList } from "../../Slicer/UserSlicer";

// import Song from "../../../utils/SongClass";

// import AudioUploaderBox from "../AudioUploaderBox/AudioUploaderBox";

import AudioUploader from "../AudioUploader/Audiouploader";
import CountBox from "../CountBox/CountBox";
import UserManager from "../UserManager/UserManager";

import './DashLayout.css';

function DashLayout () {
    
    return (
    <div className="layout">
        <div className="user-content">
        <CountBox />
        <UserManager/>
        </div>
        <div className="songs-upload">   
        <AudioUploader />
        </div>
        
    </div>);
}

export default DashLayout;