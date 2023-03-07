import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "userInfo",
  initialState: "",
  reducers: {
    userChange(state, a) {
      return a.payload;
    },
  },
});

let playing = createSlice({
  name: "playing",
  initialState: false,
  reducers: {
    playChange(state, a) {
      return a.payload;
    },
  },
});
let playList = createSlice({
  name: "playList",
  initialState: [
    { id: 0, music: "Girasol", name: "Quincas Moreira", extension: "mp3" },
    { id: 1, music: "Siestita", name: "Quincas Moreira", extension: "mp3" },
    {
      id: 2,
      music: "Oh Christmas Tree",
      name: "DJ Williams",
      extension: "mp3",
    },
    {
      id: 3,
      music: "God Rest Ye Merry Gentlmen",
      name: "DJ Williams",
      extension: "mp3",
    },
    {
      id: 4,
      music: "Spooky Boop",
      name: "Otis McDonald",
      extension: "mp3",
    },
    {
      id: 5,
      music: "Silver Waves",
      name: "TrackTribe",
      extension: "mp3",
    },
    { id: 6, music: "Girasol", name: "Quincas Moreira", extension: "mp3" },
    { id: 7, music: "Siestita", name: "Quincas Moreira", extension: "mp3" },
    {
      id: 8,
      music: "Oh Christmas Tree",
      name: "DJ Williams",
      extension: "mp3",
    },
    {
      id: 9,
      music: "God Rest Ye Merry Gentlmen",
      name: "DJ Williams",
      extension: "mp3",
    },
    {
      id: 10,
      music: "Spooky Boop",
      name: "Otis McDonald",
      extension: "mp3",
    },
    {
      id: 11,
      music: "Silver Waves",
      name: "TrackTribe",
      extension: "mp3",
    },
  ],
  reducers: {
    playListChange(state, a) {
      return a.payload;
    },
  },
});
let playNum = createSlice({
  name: "playNum",
  initialState: 0,
  reducers: {
    playNumChange(state, a) {
      return a.payload;
    },
    playNext(state, a) {
      return state + 1;
    },
    playPrev(state, a) {
      return state - 1;
    },
  },
});
let playVolume = createSlice({
  name: "playVolume",
  initialState: 1,
  reducers: {
    playVolumeChange(state, a) {
      return a.payload;
    },
  },
});

export let { playChange } = playing.actions;
export let { playNumChange } = playNum.actions;
export let { playNext } = playNum.actions;
export let { playPrev } = playNum.actions;
export let { playVolumeChange } = playVolume.actions;

export default configureStore({
  reducer: {
    playing: playing.reducer,
    playList: playList.reducer,
    playNum: playNum.reducer,
    playVolume: playVolume.reducer,
  },
});
