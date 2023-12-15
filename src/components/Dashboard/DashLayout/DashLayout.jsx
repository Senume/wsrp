import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { UpdateFileUploadList } from "../../Slicer/UserSlicer";

// import Song from "../../../utils/SongClass";

// import AudioUploaderBox from "../AudioUploaderBox/AudioUploaderBox";

import AudioUploader from "../AudioUploader/Audiouploader";


function DashLayout () {
    
    return (
    <div className="layout">
        <AudioUploader />
    </div>);
}

export default DashLayout;