import React, { useEffect } from "react";
import { useState } from "react";

import Media from "../../../utils/MediaClass";
import Song from "../../../utils/SongClass";

import AudioUploaderBox from "../AudioUploaderBox/AudioUploaderBox";

function AudioUploader() {

    const [NeedsUpload, setNeedsUpload] = useState([]);
    const [SongDetails, setSongDetails] = useState([]);


    const handleWhenUploded = (ID) => {
        const UpdatedNeededList = NeedsUpload.filter(item => item !== ID);
        setNeedsUpload(UpdatedNeededList);
    };


    useEffect(() => {

        const FindOutSongsNeededUpload = async () => {
            const MediaObject = new Media();

            for (let i = 0; i < 5; i++) {

            const SongsList = await  MediaObject.GetAllSonglist();
            const AvailableList = await MediaObject.GetAllMediaSongList();
    
            if (SongsList && AvailableList) {
                console.log("Current songlist: ", AvailableList);
                const NeededList = SongsList.filter(item => !AvailableList.includes(item));
                setNeedsUpload(NeededList);
                break; 
            }
        }
        }

        FindOutSongsNeededUpload();
        
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const SongObject = new Song();

            for (let i = 0; i < 5; i++) {
            const Data = await SongObject.ListDetails(NeedsUpload);
            if (Data)   {setSongDetails(Data);break;};
            }

        }

        fetchData();
    }, [NeedsUpload])

    console.log('Needs to be uploaded:', NeedsUpload);
    console.log('Song details: ', SongDetails);
    return (
    <div className="layout">

        {SongDetails.map((items) => <AudioUploaderBox value = {items} handle = {handleWhenUploded} />)}

    </div>);

}

export default AudioUploader;