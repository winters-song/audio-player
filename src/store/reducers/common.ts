import { createSlice } from '@reduxjs/toolkit';
import {ICommonStore} from "../../models/common";

// initial state
const initialState:ICommonStore = {
  playListVisible: false,
  playList: [],
  randomPlayList: [],
  currentItem: undefined,
  playMode: 0,
  effectMode: 0
};
// ==============================|| SLICE - MENU ||============================== //


const common = createSlice({
  name: 'common',
  initialState,
  reducers: {
    updatePlayListVisible(state, action) {
      state.playListVisible = action.payload
    },

    addMusic(state, action) {
      Object.assign(state, action.payload)
    },

    updatePlayList(state, action) {
      state.playList = action.payload
      console.log(action.payload)
    },

    updateRandomPlayList(state, action) {
      state.randomPlayList = action.payload
    },

    updateCurrentItem(state, action) {
      state.currentItem = action.payload
    },

    updatePlayMode(state, action) {
      state.playMode = action.payload
    },

    updateEffectMode(state, action) {
      state.effectMode = action.payload
    }
  }
});

export default common.reducer;

export const {
  updatePlayListVisible,
  addMusic,
  updatePlayList,
  updateRandomPlayList,
  updateCurrentItem,
  updatePlayMode,
  updateEffectMode
} = common.actions;
