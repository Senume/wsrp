import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";


import Song from "../../../utils/SongClass";

import './SongDetailBox.css'

function SongDetailBox (props) {
    
    const val = useSelector((state) => state.user);


    const [Details, setDetails] = useState({});
    console.log("Component Props: ", props.id);

    useEffect(() => {

        const fetchData = async () => {

            try{
            if (props.id !== undefined && props.id !== null) {
                const SongObject = new Song();
                
                for (let i = 0; i < 5; i++){
                const Data = await SongObject.GetDetails(props.id)
                if (Data) setDetails(Data);
                }


            }}
            catch (err) {
                console.log(err.message);
            }
        }

        fetchData();
    
      }, [props.id]);
    
    return (    

        <div className="Detail-box">
        {!(val.CurrentSong === null) && (
          <div
            className="background-image"
            style={{
              backgroundImage: 'url(${Details.ArtistURL})',
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              width: "100%",
              height: "300px",
              overflow: "hidden",
            }}
          >
            <div
              className="background-blur"
              style={{
                position: "relative",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backdropFilter: "blur(2px)", // Adjust the blur strength as needed
                zIndex: 1,
              }}
            >
              {/* {!(props.value.CoverURL === undefined) && (
                <img src={props.value.CoverURL} width={50} alt="coverart" />
              )} */}
  
              <img src={props.value.CoverURL} width={50} alt="coverart" />
  
              <div className="details">
                <li>{Details.SongTitle}</li>
                <li>{Details.SongArtist}</li>
              </div>
            </div>
          </div>
        )}
        {val.CurrentSong === null && (
          <div
            className="background-image"
            style={{
              backgroundImage: 'url(${Details.ArtistURL})',
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              width: "100%",
              overflow: "hidden",
            }}
          >
            <div
              className="background-blur"
              style={{
                position: "relative",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backdropFilter: "blur(2px)", // Adjust the blur strength as needed
                zIndex: 1,
              }}
            >
              <img
                src="\images\music1.jpeg"
                className="position-relative"
                alt="coverart"
              />
              <div>Vamos !</div>
              <div> Start Your Recognizing Joruney</div>
            </div>
          </div>
        )}
      </div>

    );
}

export default  SongDetailBox;
