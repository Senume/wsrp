import { createSlice } from '@reduxjs/toolkit';

// Define the initial state for the user slice
const initialState = {
    Username: null,
    Email: null,
    UserType: null,
    PlaylistList: [],
    HistoryList: [9822579481960, 363418137682, 3825185555951, 2371941421287],
    CurrentSong: 10469201894658
};

// Create a user slice with reducer functions
const UserSlicer = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUser: (state, action) => {
        state.Username = action.payload.Username;
        state.Email = action.payload.Email;
        state.UserType = action.payload.UserType;
        state.PlaylistList = action.payload.PlaylistList;
        state.HistoryList = action.payload.HistoryList;
    },
    AddaPlaylist: (state, action) => {
        state.PlaylistList = state.PlaylistList.push(action.payload);
    },
    DeleteaPlaylist: (state, action) => {
        const Index = state.PlaylistList.findIndex((element) => element === action.payload);
        if (Index !== -1) state.PlaylistList.splice(Index, 1);
    
    },
    AddaHistory: (state, action) => {
        state.HistoryList = state.HistoryList.push(action.payload);
    },
    UpdateDatabase: (state, action) => {}
    ,
    UpdateCurrentSongState: (state, action) =>{
        state.CurrentSong = action.payload;
        state.HistoryList.push(action.payload);
    }
    }

});

// Export actions
export const { setUser, AddaPlaylist, DeleteaPlaylist, AddaHistory, UpdateDatabase, UpdateCurrentSongState} = UserSlicer.actions;

// Export the reducer
export default UserSlicer.reducer;