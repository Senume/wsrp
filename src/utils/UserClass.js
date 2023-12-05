import axios from "axios";

export default  class User {

    /**
     * @param {any} username Unique ID for logged-in user
     * @param {any} password password to grant access token to logged-in user.
     */
    constructor(username) {
        this.Username = username;
        this.Email =null;
        this.UserType = null;
        this.PlaylistList = [];
        this.HistoryList = [];
        this.accessToken = null;

    }

    /**
     * Function to return User data.
     * @returns Returns information as javscript object
     */
    GetUserDetails() {
        const details = {
            Username: this.Username,
            Email: this.Email,
            UserType: this.UserType,
            PlaylistList: this.PlaylistList,
            HistoryList: this.HistoryList
        }
        return details;
    }

    /**
     * Updates the access token for the current logged-in user.
     * @param {any} accessToken 
     */
    UpdateAccessToken(accessToken) {
        this.accessToken = accessToken;
    }


    async Login(password){
        try {
            // Replace 'http://localhost:5000' with your actual backend API URL
            const response = await axios.post("http://localhost:5000/login", 
            {
                UserName: this.Username,
                Password: password
            }
            );

            return response.data;
        }catch (error) {
            return 1;
        }};
    

    CreatePlaylist(playlistname){console.log("Create Playlist query initiated")};

    AddToPlaylist(playlistid, songid){console.log("Add a song to respective playlist")};

    RegisterUser(username, password){console.log("Register the user")};
}