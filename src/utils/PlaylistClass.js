import hashIt from "hash-it"; // Library to handle Hash functionalities
import axios from "axios";

/**
 * @constructor Create a new instance of Playlist to hold the specified song list to a user.
 * @param {string} Name Name of the playlist
 * @param {number} UserId User to which this playlist belongs.
 */
export default class Playlist {
    constructor(playlistName = null, userId = null) {
        this.Name = playlistName;
        this.UserId = userId;
        this.SongList = [];
        this.ID = null;
    }

    /**
     * Function to generate a unique ID for this playlist based on the playlist details.
     * @returns {number} Returns the ID of the playlist
     */
    GenerateHashID() {
        const TempID = hashIt((this.Name + this.UserId).toUpperCase()); // Hashing Song details based on the Song Details
        this.ID = TempID; // Updating the Unique ID.
        return this.ID; // Logging purpose.
    }

    /**
     * Functionality to Add songs to the list of songs.
     * @param {number} SongID  Unique ID of the song which is being added to playlist.
     * @returns Returns a boolean value indicating success or failure of operation.
     */
    AddSong(SongID) {
        this.SongList.push(SongID);
        return 1;
    }

    /**
     * Functionality to remove a specified song from the playlist.
     * @param {number} SongID Unique ID of the song which needs to be filter out.
     */
    DeleteSong(SongID) {
        const Index = this.SongList.findIndex((element) => element === SongID);
        if (Index !== -1) {
            this.SongList.splice(Index, 1);
            return 1;
        } else {
            throw new Error("Song not in Playlist");
        }
    }

    /**
     * Retrives the playlist information.
     * @returns {object} returns details of the playlist, which includes playlist ID, songname, author, songlist
     */
    GetSongList() {
        return {
            ID: this.ID,
            Name: this.Name,
            UserId: this.UserId,
            SongList: this.SongList,
        };
    }

    async GetPlaylistDetails(list) {
        console.log("Inside Plalist class", list);
        try {
            const response = await axios.post(
                "http://localhost:3500/retrieve/playlist",
                {
                    listid: list,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            return response.data;
        } catch (error) {
            console.log(
                '"/retrieve/playlist" endpoint Playlist class error: ' +
                    error.message
            );
            return 0;
        }
    }

    async UpdatePlaylistDatabase(Data) {
        try {
            const response = await axios.post(
                "http://localhost:3500/addplaylist",
                {
                    playlist: Data,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            return response.data;
        } catch (error) {
            console.log("Playlist class error: " + error.message);
        }
    }

    async GetPlaylistbyID(id) {
        try {
            let url = "http://localhost:3500/playlistdetails/" + id;
            console.log("Resource locator for the playlist: ", url);
            const response = await axios.get(url);
            // console.log(response);
            return response.data;
        } catch (error) {
            console.log(
                '"playlistdetails" endpoint Playlist class error: ' +
                    error.message
            );
            return 0;
        }
    }

    async GetPlaylistbyUser(id) {
        try {
            let url = "http://localhost:3500/playlistdetails/User/" + id;
            console.log("Resource locator for the playlist: ", url);
            const response = await axios.get(url);
            // console.log(response);
            return response.data;
        } catch (error) {
            console.log(
                '"playlistdetails" endpoint Playlist class error: ' +
                    error.message
            );
            return 0;
        }
    }
}
