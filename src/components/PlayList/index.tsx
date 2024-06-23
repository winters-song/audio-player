import React, { ChangeEventHandler } from "react"
import { ListWrapper } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../../models/common";
import {Typography} from "antd";
import { updateCurrentItem, updatePlayList } from "../../store/reducers/common";
import { decodeMusic } from "../../utils/utils";
const {Text} = Typography

const PlayList = () => {
  const dispatch = useDispatch()
  const list = useSelector((state: IStore) => state.common.playList)
  const currentItem = useSelector((state: IStore) => state.common.currentItem)

  const fileRef = React.createRef<HTMLInputElement>();

  const onUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      const promises = Array.from(e.target.files).map(async (file) => {
        const blobUrl = URL.createObjectURL(file);
        const filename = file.name.split('.')[0];

        const params = await decodeMusic(file)

        return { name: filename, url: blobUrl, ...params };
      });

      Promise.all(promises)
        .then((newList) => dispatch(updatePlayList([...list, ...newList])))
    }
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    
    if (files.length > 0) {
      const promises = Array.from(files).map(async (file) => {
        const blobUrl = URL.createObjectURL(file);
        const filename = file.name.split('.')[0];

        const params = await decodeMusic(file)

        return { name: filename, url: blobUrl, ...params };
      });

      Promise.all(promises)
        .then((newList) => dispatch(updatePlayList([...list, ...newList])))
      // const newList = [...list];
      // Array.from(files).forEach(file => {
      //   const blobUrl = URL.createObjectURL(file);
      //   const filename = file.name.split('.')[0];

      //   newList.push({ name: filename, url: blobUrl });
      // });
      // dispatch(updatePlayList(newList));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <ListWrapper onDrop={handleDrop} onDragOver={handleDragOver}>
      <div className="header">
        <div className="title">
          Play List
        </div>
        <div className="action">
          <div className="add-btn" onClick={(e) => {
            e.stopPropagation();
            fileRef.current?.click()
          }}>
            +
          </div>
          <input style={{display: 'none'}} ref={fileRef} type="file" onChange={onUpload} multiple accept="audio/*"/>
          <div className="btn collapse-btn">

          </div>
        </div>
      </div>
      <div className="body">
        <div className="list-inner">
          {
            list.map((item: any, index: number) => {
              return (
                <div className={`list-item ${currentItem?.url === item.url ? 'active' : ''}`} key={index} 
                onDoubleClick={() => dispatch(updateCurrentItem(item))}>
                  <Text className="text" ellipsis>
                    {item.title ? `${item.title} - ${item.artist}` : item.name}
                  </Text>
                  <div className="delete-btn" onClick={(e) => {
                    e.stopPropagation()
                    let arr = list.slice()
                    arr.splice(index, 1)
                    dispatch(updatePlayList(arr))
                  }}>✕</div>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="footer">
        <div className="note">drag your music here</div>
      </div>
    </ListWrapper>
  )
};

export default PlayList;
