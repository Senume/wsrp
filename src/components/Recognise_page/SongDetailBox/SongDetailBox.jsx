import React from "react";
import { useState, useEffect } from "react";


import Song from "../../../utils/SongClass";

import './SongDetailBox.css'

function SongDetailBox (props) {
    
    const [Details, setDetails] = useState({});
    console.log("Component Props: ", props.id);

    useEffect(() => {

        if (props.id !== undefined && props.id !== null) {
            const SongObject = new Song();
        
            // Assuming GetDetails returns a Promise
            SongObject.GetDetails(props.id)
            .then((details) => {
                // Update the state with the details
                                
                if (details === undefined) {
                    SongObject.GetDetails(props.id)
                    setDetails(details);
                } else  setDetails(details);

            })
            .catch((error) => {
                console.log("Error retrieving details:", error);
            });    
        }
    
      }, [props.id]);
    
    return (    

        <div className="Detail-box">
            <div className="background-image"
                style={{
                    backgroundImage: `url(${Details.ArtistURL})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    width: '100%',
                    height: '300px',
                    overflow: 'hidden' 
            }}>

                    <div
                        className="background-blur"
                        style={{
                        position: 'relative',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backdropFilter: 'blur(2px)', // Adjust the blur strength as needed
                        zIndex: 1,
                        }}
                    >

                    <img src={Details.CoverURL} width={150} alt= "CoverART"></img>
                    
                    </div>
                    

                
            </div>
            <div className="details">
                <li>{Details.SongTitle}</li>
                <li>{Details.SongArtist}</li>
            </div>
        </div>

    );
}

export default  SongDetailBox;
