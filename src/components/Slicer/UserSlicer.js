import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the user slice
const initialState = {
    UserName: null,
    Email: null,
    UserType: "global",
    PlaylistList: [],
    HistoryList: [],

    CurrentSong: null,
    CurrentPlaylist: null,
    ToBeAdded: null,
    PlaySong: null,

    FileUploadList: null,
};

// Create a user slice with reducer functions
const UserSlicer = createSlice({
    name: "User",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.UserName = action.payload.UserName;
            state.Email = action.payload.Email;

            if ("UserType" in action.payload) {
                state.UserType = action.payload.UserType;
            }

            if ("PlaylistList" in action.payload) {
                state.PlaylistList = action.payload.PlaylistList;
                state.HistoryList = action.payload.HistoryList;
                // state.UserType = action.payload.UserType;
            }
            // state.age = action.payload.age;
            if ("password" in action.payload) {
                state.password = action.payload.password;
            }
            // state.gender = action.payload.gender;
            console.log(
                "While Setting the reduc state:",
                JSON.stringify(state)
            );
            localStorage.setItem(
                "user",
                JSON.stringify(JSON.parse(JSON.stringify(state)))
            );
        },
        AddaPlaylist: (state, action) => {
            state.PlaylistList.push(action.payload);
            console.log(state.PlaylistList);
            localStorage.setItem(
                "user",
                JSON.stringify(JSON.parse(JSON.stringify(state)))
            );
        },
        DeleteaPlaylist: (state, action) => {
            const Index = state.PlaylistList.findIndex(
                (element) => element === action.payload
            );
            if (Index !== -1) state.PlaylistList.splice(Index, 1);
            localStorage.setItem(
                "user",
                JSON.stringify(JSON.parse(JSON.stringify(state)))
            );
        },
        AddaHistory: (state, action) => {
            state.HistoryList = state.HistoryList.push(action.payload);
            localStorage.setItem(
                "user",
                JSON.stringify(JSON.parse(JSON.stringify(state)))
            );
        },
        UpdateDatabase: (state, action) => {},
        UpdateCurrentSongState: (state, action) => {
            state.CurrentSong = action.payload;
            state.HistoryList.push(action.payload);
            localStorage.setItem(
                "user",
                JSON.stringify(JSON.parse(JSON.stringify(state)))
            );
        },
        UpdateCurrentPlaylist: (state, action) => {
            state.CurrentPlaylist = action.payload;
            localStorage.setItem(
                "user",
                JSON.stringify(JSON.parse(JSON.stringify(state)))
            );
        },
        UpdateSelectedSongID: (state, action) => {
            state.ToBeAdded = action.payload;
            localStorage.setItem(
                "user",
                JSON.stringify(JSON.parse(JSON.stringify(state)))
            );
        },
        RemoveSelectedSongID: (state, action) => {
            state.ToBeAdded = null;
            localStorage.setItem(
                "user",
                JSON.stringify(JSON.parse(JSON.stringify(state)))
            );
        },
        UpdateFileUploadList: (state, action) => {
            state.FileUploadList = action.FileUploadList;
            localStorage.setItem(
                "user",
                JSON.stringify(JSON.parse(JSON.stringify(state)))
            );
        },
        FilterOutIDUploadList: (state, action) => {
            state.FileUploadList = state.FileUploadList.filter(
                (item) => item !== action.payload
            );

            localStorage.setItem(
                "user",
                JSON.stringify(JSON.parse(JSON.stringify(state)))
            );
        },
        ResetUser: (state, action) => {
            state.UserName = null;
            state.Email = null;
            state.PlaylistList = [];
            state.HistoryList = [];
            state.UserType = "global";
            state.age = null;
            state.password = null;
            state.gender = null;
            console.log("reset", state);

            localStorage.setItem(
                "user",
                JSON.stringify(JSON.parse(JSON.stringify(state)))
            );
        },
        UpdatePlaySong: (state, action) => {
            state.PlaySong = action.payload;
            localStorage.setItem(
                "user",
                JSON.stringify(JSON.parse(JSON.stringify(state)))
            );
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
    UpdatePlaySong,
} = UserSlicer.actions;

// Export the reducer
export default UserSlicer.reducer;
