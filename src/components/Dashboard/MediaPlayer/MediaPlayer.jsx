import React, { useState } from 'react';

const MediaPlayer = ({ streamUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  return (
    <div>
      <h1>Audio Player</h1>
      <audio controls autoPlay={isPlaying}>
        <source src={streamUrl} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <button onClick={handlePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

export default MediaPlayer;
