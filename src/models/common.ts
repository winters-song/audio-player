export interface ICommonStore {
  playListVisible: boolean;
  playList: PlayListItem[];
  randomPlayList: PlayListItem[];
  currentItem?: PlayListItem;
  // 0 - loop, 1 - single cycle, 2 - random
  playMode: number; 
}

export interface IStore {
  common: ICommonStore
}

export interface PlayListItem {
  name: string;
  title?: string;
  artist?: string;
  url: string;
  cover?: string;
}
