import React, {useState} from "react";
import { FaMicrophone } from "react-icons/fa";

import "./Record_button.css";


function RecordButton() {

    function Recording() {

        // Finding a device and getting permission from user.
        try {

        let stream = navigator.mediaDevices.getUserMedia({audio: true, video: false});
        console.log(stream);
        console.log("Creating Media Recording API Object");

        stream.then( MS => {
            console.log(MS);

            let MediaRec = new MediaRecorder(MS);
            
            const chunks = [];

            MediaRec.ondataavailable = (e) => {
                chunks.push(e.data);
              };

            MediaRec.onstop = (e) => {
                const blob = new Blob(chunks, {
                  type: "audio/mp3"
                });

                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = "Recorded.mp3";
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);


            };

            console.log("Starting Recording");
            MediaRec.start();
            
            setTimeout( () => {
                MediaRec.stop();
                MS.getTracks().forEach( track => track.stop() );
                console.log("Stopped Recording");
            
            }, 10000);
            

    
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