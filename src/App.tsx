import React, { useEffect, useState } from 'react';
import './App.css';
import AudioPlayer from './components/AudioPlayer';
import PlayList from './components/PlayList';
import { useSelector } from 'react-redux';
import { IStore } from './models/common';
import { Image } from 'antd';

import donateImg from './assets/img/donate.png';
import EffectPicker from './components/EffectPicker';
import { CANVAS_TYPE } from './components/common/constants';


function App() {
  const [visible, setVisible] = useState(false);
  const playListVisible = useSelector((state: IStore) => state.common.playListVisible)
  const currentEffectMode = useSelector((state: IStore) => state.common.effectMode)

  return (
    <div className="App">
      <canvas id="canvas-2d" className={`canvas ${currentEffectMode.type === CANVAS_TYPE.CANVAS_2D ? '' : 'hidden'}`}/>
      <canvas id="canvas-webgl" className={`canvas ${currentEffectMode.type === CANVAS_TYPE.WEBGL ? '' : 'hidden'}`}/>

      <EffectPicker />

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
