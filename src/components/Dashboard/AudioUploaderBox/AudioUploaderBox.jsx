import React, { useState } from 'react';
import { MdFileUpload } from "react-icons/md";
import { FaRegDotCircle, FaDotCircle } from "react-icons/fa";


import axios from 'axios';

import './AudioUploaderBox.css'

const AudioUploaderBox = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (ID) => {
    const formData = new FormData();
    formData.append('audioFile', selectedFile);

    try {
      const response = await axios.post('http://localhost:3500/upload-audio/' + ID, formData);

      if (response.status === 200) {
        console.log('Audio file uploaded successfully.');
        props.handle(props.value.ID);
        setSelectedFile(null);
        console.log('Updated the state');
        // Handle success, e.g., show a success message to the user
      } else {
        console.error('Failed to upload audio file.');
        // Handle failure, e.g., show an error message to the user
      }
    } catch (error) {
      console.error('Error uploading audio file:', error);
    }
  };

  return (
    <div className='uploaderBox'>
      <div className='content'>
        <img className='coverart' src={props.value.CoverURL} width={50} alt="coverart" />
        <li className='title'>{props.value.SongTitle}</li>
      </div>
      <div className='buttons'>
        <input type="file" accept="audio/*" onChange={handleFileChange} id={props.value.ID} hidden/>
        <label id='file-input-label' for={props.value.ID}>{selectedFile !== null ?<FaRegDotCircle />:<FaDotCircle />}</label>
        <button className='upload-button' onClick={() => handleUpload(props.value.ID)} disabled={!selectedFile}>
        <MdFileUpload />
        </button>
      </div>
    </div>
  );
};

export default AudioUploaderBox;
