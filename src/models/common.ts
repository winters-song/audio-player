export interface ICommonStore {
  playListVisible: boolean;
  playList: PlayListItem[];
  currentItem?: PlayListItem;
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
