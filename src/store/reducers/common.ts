import { createSlice } from '@reduxjs/toolkit';
import {ICommonStore} from "../../models/common";
import { defaultPlayList } from '../../constants';

// initial state
const initialState:ICommonStore = {
  playListVisible: false,
  playList: [], // defaultPlayList,
  currentItem: undefined //defaultPlayList[0],
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

    updateCurrentItem(state, action) {
      state.currentItem = action.payload
    },
  }
});

export default common.reducer;

export const {
  updatePlayListVisible,
  addMusic,
  updatePlayList,
  updateCurrentItem,
} = common.actions;
