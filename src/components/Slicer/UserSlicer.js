import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the user slice
const initialState = {
    Username: null,
    Email: null,
    UserType: "global",
    PlaylistList: [],
    HistoryList: [],

    CurrentSong: null,
    CurrentPlaylist: null,
    ToBeAdded: null,

    FileUploadList: null,
};

// Create a user slice with reducer functions
const UserSlicer = createSlice({
    name: "User",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.Username = action.payload.UserName;
            state.Email = action.payload.email;

            if ("PlaylistList" in action.payload) {
                state.PlaylistList = action.payload.PlaylistList;
                state.HistoryList = action.payload.HistoryList;
                state.UserType = action.payload.userType;
            }
            state.age = action.payload.age;
            if ("password" in action.payload) {
                state.password = action.payload.password;
            }
            state.gender = action.payload.gender;
            console.log("here");
        },
        AddaPlaylist: (state, action) => {
            state.PlaylistList.push(action.payload);
            console.log(state.PlaylistList);
        },
        DeleteaPlaylist: (state, action) => {
            const Index = state.PlaylistList.findIndex(
                (element) => element === action.payload
            );
            if (Index !== -1) state.PlaylistList.splice(Index, 1);
        },
        AddaHistory: (state, action) => {
            state.HistoryList = state.HistoryList.push(action.payload);
        },
        UpdateDatabase: (state, action) => {},
        UpdateCurrentSongState: (state, action) => {
            state.CurrentSong = action.payload;
            state.HistoryList.push(action.payload);
        },
        UpdateCurrentPlaylist: (state, action) => {
            state.CurrentPlaylist = action.payload;
            console.log(state.CurrentPlaylist);
        },
        UpdateSelectedSongID: (state, action) => {
            state.ToBeAdded = action.payload;
        },
        RemoveSelectedSongID: (state, action) => {
            state.ToBeAdded = null;
        },
        UpdateFileUploadList: (state, action) => {
            state.FileUploadList = action.FileUploadList;
        },
        FilterOutIDUploadList: (state, action) => {
            state.FileUploadList = state.FileUploadList.filter(
                (item) => item !== action.payload
            );
        },
        ResetUser: (state, action) => {
            state.Username = null;
            state.Email = null;
            state.PlaylistList = [];
            state.HistoryList = [];
            state.UserType = "global";
            state.age = null;
            state.password = null;
            state.gender = null;
            console.log("reset", state);
        },
    },
});

// Export actions
export const {
    setUser,
    AddaPlaylist,
    DeleteaPlaylist,
    AddaHistory,
    UpdateDatabase,
    UpdateCurrentSongState,
    UpdateCurrentPlaylist,
    UpdateSelectedSongID,
    RemoveSelectedSongID,
    UpdateFileUploadList,
    FilterOutIDUploadList,
    ResetUser,
} = UserSlicer.actions;

// Export the reducer
export default UserSlicer.reducer;
