// import React, {useState} from "react";
import { FaMicrophone } from "react-icons/fa";
import axios from "axios";

import "./Record_button.css";


function RecordButton() {

    function Recording() {

        // Finding a device and getting permission from user.
        try {

        // Getting stream channel opened from an mic device.
        let stream = navigator.mediaDevices.getUserMedia({audio: true, video: false});
        console.log(stream);
        console.log("Creating Media Recording API Object");

        stream.then( MS => {

            // Logging the media stream channel in which the binary stream recorded.
            console.log(MS);
            
            // The stream channel is passed into Recorder API which help in manupilating the binary data to our needs.
            let MediaRec = new MediaRecorder(MS);
            
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
                  type: "audio/mp3"
                });
                
                // Blob is in binary representation, it isnt in structed representation. Making it into File object to 
                // provide a structured representation to transfer on net.
                const FileContent = new File([blob], 'Recorded_samples.mp3', {
                    type: "audio/mp3",
                });

                // Non-Tuple data structure are transfered as ForData, which reduced data loss on transfer.
                const AudioForm = new FormData();
                AudioForm.append('Audio', FileContent);

                // Calling API with "post" method.
                axios.post('http://localhost:3500/upload', AudioForm, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then((response) => {
                    // Handle success
                    console.log('Response:', response.data);
                })
                .catch(
                    function (error) {
                        if (error.response) {
                          // The request was made and the server responded with a status code
                          // that falls out of the range of 2xx
                          console.log("Error: 1");
                          console.log(error.response.data);
                          console.log(error.response.status);
                          console.log(error.response.headers);
                        } else if (error.request) {
                          // The request was made but no response was received
                          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                          // http.ClientRequest in node.js
                          console.log("Error: 2");
                          console.log(error.request);
                        } else {
                          // Something happened in setting up the request that triggered an Error
                          console.log("Error: 3");
                          console.log('Error', error.message);
                        }
                        console.log(error.config);
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
            
            }, 5000);
            

    
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