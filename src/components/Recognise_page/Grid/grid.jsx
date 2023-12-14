import React from 'react';
import { useSelector} from "react-redux";
import { useState, useEffect } from 'react';

// import Streamer from '../Stream_box/Streambox';
import RecordBox from '../Record_box/Record_box';
import SongDetailBox from '../SongDetailBox/SongDetailBox';
import HistorySongBox from '../HistorySongBox/HistorySongBox';

import './grid.css';
import Song from '../../../utils/SongClass';

function GridLayout() {

    const currentSong = useSelector(state => state.user.CurrentSong);
    const history = useSelector(state => state.user.HistoryList);

    const [songDetails, setSongDetails] = useState([]);

    useEffect(() => {
      const fetchSongDetails = async () => {
        try {
          const songObject = new Song();
          const details = await songObject.ListDetails(history.slice(-4));

          if (details) {
          var Rdetails = history.slice(-4).map(ID => {
            return details.filter(record => record.ID === ID)[0];
          })

          setSongDetails(Rdetails);

          console.log("History ID: ", history.slice(-4));
          console.log("History Details: ", Rdetails);
        }
          
        } catch (error) {
          // Handle the error
          console.error('Error fetching song details:', error);
        }
      };
  
      fetchSongDetails();
    }, [history]);

    console.log(songDetails);

    const [SongID, setSongID] = useState(null);
    
    useEffect(() =>{
        setSongID(currentSong);
    }, [currentSong])


    return (

        <div id= "container">
            <div className='operations'>
                <div className= "item1"><RecordBox /></div>

                <div className= "item2"><SongDetailBox id={SongID} /></div>
            </div>
            <div className='display-history'>

            {
                console.log("State Details: ", songDetails)
            }{                
                songDetails.map((record, index) => (
                    <HistorySongBox value={record} /> ))
            }

            </div>
            
        </div>

    );

}

export default GridLayout;