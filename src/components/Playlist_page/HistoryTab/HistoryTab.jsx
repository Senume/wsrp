import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { RemoveSelectedSongID } from "../../Slicer/UserSlicer";

import Song from "../../../utils/SongClass";
import Playlist from "../../../utils/PlaylistClass";

import HistoryBox from "../HistoryBox/HistoryBox";

import './HistoryTab.css';


function HistoryTab () {

    const dispatch = useDispatch();

    var playlistID = useSelector( state => state.user.CurrentPlaylist);
    var history = useSelector( state => state.user.HistoryList);
    var ToBeAddedSongID = useSelector( state => state.user.ToBeAdded);


    const [SongList, setSongList] = useState([])
    const [HistoryDetails, setHistoryDetails] = useState([])
    console.log("Selected SONG ID:",ToBeAddedSongID)

    // Updaing the ToBeAddedSong ID in current playlist.
    useEffect(() => {
      const UpdateCurrentPlaylistDetails = async () => {
        
        if (ToBeAddedSongID !== null) {
          const NewPlaylistObject = new Playlist();
          var Data = await NewPlaylistObject.GetPlaylistbyID(playlistID);
          if (Data){
          Data.SongList.push(ToBeAddedSongID);
          await NewPlaylistObject.UpdatePlaylistDatabase(Data);
          dispatch(RemoveSelectedSongID());}
        }
      }

      UpdateCurrentPlaylistDetails();

  }, [ToBeAddedSongID, playlistID, dispatch])
    
    // Getting current playlists details
    useEffect(() =>{
        
      const fetchCurrentPlaylistDetails = async () => {
          
          const NewPlaylistObject = new Playlist();

          if (playlistID) {
          const Data = await NewPlaylistObject.GetPlaylistbyID(playlistID);
          if (Data) {
            const Songlist = Data.SongList;
            const RemainigSongs = history.filter(element => !Songlist.includes(element));
            setSongList(RemainigSongs);
            // console.log('History', history);
            // console.log('Songlist', Songlist);
            // console.log('RemainigSongs', RemainigSongs)
            // console.log('Songlist State', Songlist);
          };
          }
      }

      fetchCurrentPlaylistDetails()
    }, [playlistID, ToBeAddedSongID, history]);



    // Fetching all the song details from the history
    useEffect(() => {
        const fetchSongDetails = async () => {
          try {
            const songObject = new Song();

            for (let i = 0; i<5 ; i++) {
              // console.log('HistoryBox iteration', i);
              const details = await songObject.ListDetails(SongList);            
              if (details !== 0) {
                setHistoryDetails(details);
                break;
              }

            }


            // console.log("History IDs under playlist: ", history);
            // console.log("History Details under playlist: ", details);
            
          } catch (error) {
            // Handle the error
            console.log('Playlist HistoryTab - Error fetching song details:', error);
          }
        };
    
        fetchSongDetails();
      }, [SongList]);

    return (
        <div className="historylist">
            <div className="heading">
                <div className="title">Select Song</div>
                <button className='addsong' ><FaPlus /></button>
            </div>
            <div className="list">
                {HistoryDetails.map((item) => <HistoryBox value={item} />)}
            </div>
        </div>
    );
}

export default HistoryTab;