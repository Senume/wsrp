// import React, {useState} from "react";
import { FaMicrophone } from "react-icons/fa";
import axios from "axios";
import { useDispatch } from "react-redux";

import "./Record_button.css";

import Song from '../../../utils/SongClass';
import { UpdateCurrentSongState } from "../../Slicer/UserSlicer";

function RecordButton() {

    const dispatch = useDispatch();

    function Recording() {

        // Finding a device and getting permission from user.
        try {

        // Getting stream channel opened from an mic device.
        let stream = navigator.mediaDevices.getUserMedia({audio: {channelCount: 1}, video: false});
        console.log(stream);
        console.log("Creating Media Recording API Object");

        stream.then( MS => {

            // Logging the media stream channel in which the binary stream recorded.
            console.log(MS);
            
            // The stream channel is passed into Recorder API which help in manupilating the binary data to our needs.
            let MediaRec = new MediaRecorder(MS, {audioBitsPerSecond: 44100});
            
            // To store the stream data.
            const chunks = [];

            // When a stream data is available, specifies what to do with the data.
            MediaRec.ondataavailable = (e) => {
                chunks.push(e.data);
              };

            // Once the we stop listening on Recorder API, it specify what to then after.
            MediaRec.onstop = (e) => {

                // All the binary chunks are encapsulated into blob object which specifies the encoding type.
                const blob = new Blob(chunks, {
                  type: "audio/webm"
                });
                console.log(blob);

                // Blob is in binary representation, it isnt in structed representation. Making it into File object to 
                // provide a structured representation to transfer on net.
                const FileContent = new File([blob], 'Recorded_samples.webm', {
                    type: "audio/webm",
                });

                // Non-Tuple data structure are transfered as ForData, which reduced data loss on transfer.
                const AudioForm = new FormData();
                AudioForm.append('audio', FileContent, 'audio1.webm');

                // Calling API with "post" method.
                axios.post('http://localhost:3500/recognisesong', AudioForm, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then((response) => {

                    // Handling data
                    const Track = response.data;
                    console.log(Track);
                    const SongObject = new Song(Track.title, Track.subtitle, Track.images.coverart, Track.images.background)
                    SongObject.GenerateHashID();
                    console.log("Recognised Songs ID", SongObject.GetSongDetails());
                    
                    // Uploading the song
                    SongObject.UpdateDatabase().then(() => dispatch(UpdateCurrentSongState(SongObject.ID)));

                })
                .catch(
                    function (error) {
                        console.log("Error: ",error);
                    }
                );
            };

            // We start the Recording
            console.log("Starting Recording");
            MediaRec.start();
            
            // An interval is set to stop the recording and close the stream channel of given device.
            setTimeout( () => {
                MediaRec.stop();
                MS.getTracks().forEach( track => track.stop() );
                console.log("Stopped Recording");
            
            }, 4500);
            // console.log(MediaRec.ondataavailable);
        });



        } catch (error) {
        console.log("Error encounter while accessing a microphone device " + error);
        }
    }

    return (
        <button className="outer_circle" onClick={Recording}>
            <FaMicrophone id="symbol" />
        </button>

        // <div className="outer_circle">
        //     <FaMicrophone id="symbol" />
        // </div>
    );
}

export default RecordButton;