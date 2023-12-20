import React, { useEffect, useRef, useState } from "react";
import './MediaPlayer.css';

function MediaPlayer({ streamUrl, songdetails}) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const loadAndPlayAudio = async () => {

      console.log('Current Audio URL: ' + streamUrl);
      try {
        // Pause the current audio if any
        if (audioRef.current) {
          // if(isPlaying)
          audioRef.current.pause();
        }

        // Create a new audio element
        audioRef.current = new Audio(streamUrl);

        // Wait for the audio to load
        await audioRef.current.load();

        // Play the audio
        // audioRef.current.play();
        // setIsPlaying(true);

        // Set up event listeners for time updates
        audioRef.current.addEventListener("timeupdate", () => {
          setCurrentTime(audioRef.current.currentTime);
        });

        // Set up event listener for when audio ends
        audioRef.current.addEventListener("ended", () => {
          setIsPlaying(false);
        });
      } catch (error) {
        console.error("Error loading or playing audio:", error);
      }
    };

    loadAndPlayAudio();

    return () => {
      // Clean up resources when component unmounts or streamUrl changes
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("timeupdate", () => {});
        audioRef.current.removeEventListener("ended", () => {});
        audioRef.current = null;
        if (isPlaying) setIsPlaying(false);

      }
    };
  }, [streamUrl]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };



  return (
    (audioRef !== null)
    ?
    <div className="mediaplayer">
      <h2>{songdetails}</h2>
      <div>
        <audio controls ref={audioRef} hidden >
          Your browser does not support the audio element.
        </audio>
        <div>
          <button onClick={handlePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
          <input
            type="range"
            value={currentTime}
            max={audioRef.current ? audioRef.current.duration : 0}
          />
          <span>{formatTime(currentTime)}</span>
        </div>
      </div>
    </div> : <div className="error Box">Select a song</div>

  );
}

// Function to format time in minutes and seconds
function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

export default MediaPlayer;
