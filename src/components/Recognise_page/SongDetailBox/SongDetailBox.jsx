import React from "react";
import { useState, useEffect } from "react";


import Song from "../../../utils/SongClass";

import './SongDetailBox.css'

function SongDetailBox (props) {
    
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
