import React from "react";


import PlaylistTab from "../PlaylistTab/PlaylistTab";
import SongsTab from "../SongsTab/SongsTab";
import HistoryTab from "../HistoryTab/HistoryTab";


import './PlaylistLayout.css'

function PlalistLayout() {




    return (
        <div className="layout">
            <PlaylistTab />
            <SongsTab />
            <HistoryTab />
        </div>
    )

}

export default PlalistLayout;
