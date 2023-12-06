import hashIt from "hash-it";            // Library to handle Hash functionalities
import axios from "axios";

/**
 * Class to store the Song details and use the object for further manipulation.
 * @construct 
 * @param {string} songTitle Title of the song
 * @param {string} songArtist Artist of the song
 * @param {string} uri Cover of the song
 * @param {number} artistcover Artist cover
 */
export default class Song {

    constructor(songTitle = null, songArtist = null, uri = null, artistcover = null){
        this.SongTitle = songTitle;                                                                     // Song Details - Title
        this.SongArtist = songArtist;                                                                   // Song Details - Artist
        this.CoverURL = uri;
        this.ArtistURL = artistcover;                                                             
        this.ID = 0;                                                                                    // Unique ID will be generated based on the Song Details
    }
    
    /** 
     * @function GenerateHashID Generates a unique Id for the object created. It uses hashing and the details of the song to generate the unique ID. This need to be called separately. Not integrated with constructor.
     * @returns {number} Unique ID for the object created.
    */
    GenerateHashID() {
        const TempID =  hashIt((this.SongTitle + this.SongArtist).toUpperCase());                       // Hashing Song details based on the Song Details
        this.ID = TempID;                                                                               // Updating the Unique ID.
        return this.ID;                                                                                 // Logging purpose.
    }

    /** Gets the song object as javascript object
     * @return {Object} Object with containing properties title, artist, duration, release description
    */
    GetSongDetails() {
        const Details = {
            ID: this.ID,
            SongTitle: this.SongTitle,
            SongArtist: this.SongArtist,
            CoverURL: this.CoverURL,
            ArtistURL: this.ArtistURL
        }
        return Details;
    }

    async UpdateDatabase() {
        const Details = this.GetSongDetails()

        var Response = await axios.post('http://localhost:3500/addsongdetails',Details,{
            headers: {
                "Content-Type": 'application/json',
            }
        });

        if (Response.data.success) {
            console.log("Data added successfully");
        } else {
            console.log("Data not added successfully");
        }
    }

    async GetDetails(id) {
        
        let url = 'http://localhost:3500/songdetails/' + id
        var Response = await axios.get(url);
        return Response.data;
    }

};

