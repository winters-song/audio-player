import React, { useEffect, useState } from 'react';
import './App.css';
import AudioPlayer from './components/AudioPlayer';
import PlayList from './components/PlayList';
import { useSelector } from 'react-redux';
import { IStore } from './models/common';
import { Image } from 'antd';

import donateImg from './assets/img/donate.png';


function App() {
  const [visible, setVisible] = useState(false);
  const playListVisible = useSelector((state: IStore) => state.common.playListVisible)

  return (
    <div className="App">
      <canvas id="canvas"/>

      <AudioPlayer />
      { playListVisible && <PlayList />}

      <div className="links">
        <a href="mailto:77941075@qq.com">Email</a>{" · "}
        <div className='link' onClick={() => setVisible(true)}>Donate</div>
      </div>

      <Image
        width={200}
        style={{ display: 'none' }}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
        preview={{
          visible,
          src: donateImg,
          toolbarRender: () => [<div></div>],
          onVisibleChange: (value) => {
            setVisible(value);
          },
        }}
      />
    </div>
  );
} 

export default App;
