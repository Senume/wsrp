import React, { useState, useEffect } from "react";
import { FaMicrophone } from "react-icons/fa";
import axios from "axios";
import { useDispatch } from "react-redux";

import "./Record_button.css";

import Song from "../../../utils/SongClass";
import { UpdateCurrentSongState } from "../../Slicer/UserSlicer";

function RecordButton() {
  const dispatch = useDispatch();
  const [recording, setRecording] = useState(false);
  const [indicatorColor, setIndicatorColor] = useState("gray");

  function Recording() {
    try {
      let stream = navigator.mediaDevices.getUserMedia({
        audio: { channelCount: 1 },
        video: false,
      });

      stream.then((MS) => {
        let MediaRec = new MediaRecorder(MS, { audioBitsPerSecond: 44100 });
        const chunks = [];

        MediaRec.ondataavailable = (e) => {
          chunks.push(e.data);
        };

        MediaRec.onstop = (e) => {
          const blob = new Blob(chunks, {
            type: "audio/webm",
          });

          const FileContent = new File([blob], "Recorded_samples.webm", {
            type: "audio/webm",
          });

          const AudioForm = new FormData();
          AudioForm.append("audio", FileContent, "audio1.webm");

          axios
            .post("http://localhost:3500/recognisesong", AudioForm, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => {
              const Track = response.data;
              const SongObject = new Song(
                Track.title,
                Track.subtitle,
                Track.images.coverart,
                Track.images.background
              );
              SongObject.GenerateHashID();
              SongObject.UpdateDatabase().then(() =>
                dispatch(UpdateCurrentSongState(SongObject.ID))
              );
            })
            .catch((error) => {
              console.log("Error: ", error);
            });

          // Toggle recording state and indicator color
          setRecording(false);
          setIndicatorColor("gray");
        };

        // Toggle recording state and indicator color
        setRecording(true);
        setIndicatorColor("red");
        MediaRec.start();

        setTimeout(() => {
          MediaRec.stop();
          MS.getTracks().forEach((track) => track.stop());
        }, 4500);
      });
    } catch (error) {
      console.log("Error encounter while accessing a microphone device " + error);
    }
  }

  return (
    <div>
      <h1>
        RECORDING&nbsp;<div id="indicator" style={{ backgroundColor: indicatorColor }}></div>
      </h1>
      <button className="outer_circle" onClick={recording ? null : Recording}>
        <FaMicrophone id="symbol" />
      </button>
      <div id="note">Hold down the record button to activate recording.</div>
    </div>
  );
}

export default RecordButton;
