import React, { FC, useEffect, useRef, useState } from "react"
import { PlayerWrapper } from "./styles";
import { Slider } from 'antd';
import { IconFullscreen, IconNext, IconPause, IconPlay, IconPlayList, IconPrev, IconVolume, IconVolumeMute } from "../common/icons";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../../models/common";
import { updateCurrentItem, updatePlayList, updatePlayListVisible } from "../../store/reducers/common";
import SceneMgr from "../SceneMgr";
import { decodeMusic, formatTime, presetLocalMusic } from "../../utils/utils";

import breath from '../../assets/audio/薬師寺寛邦,キッサコ - 呼吸.mp3';


const Audio: FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState( Number(localStorage.getItem('volume')) || 0.5);
  const [duration, setDuration] = useState(0);
  
  const dispatch = useDispatch()
  const playList = useSelector((state: IStore) => state.common.playList)
  const currentItem = useSelector((state: IStore) => state.common.currentItem)
  const playListVisible = useSelector((state: IStore) => state.common.playListVisible)
  
  const lastVolume = useRef(volume)

  const pageInited = useRef(false)
  const sceneMgr = useRef<SceneMgr>()

  const handlePlay = () => {
    if(!currentItem){
      return;
    }
    if (audioRef.current) {
      if (isPlaying) {
        onPause();
      } else {
        onPlay();
      }
      setIsPlaying(!isPlaying);
    }
  }

  const onPlay = async () => {
    sceneMgr.current?.stopVisualize();
    await audioRef.current?.play();
    const audio = audioRef.current as any;
    const stream = audio.captureStream();
    sceneMgr.current?.visualize(stream)
  }

  const onPause = async () => {
    audioRef.current?.pause();
    sceneMgr.current?.resetCanvas();
  }

  const handleProgressChange = (value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
    }
  }

  const handleVolumeChange = (value: number) => {
    if (audioRef.current) {
      audioRef.current.volume = value;
      setVolume(value);

      if(value){
        lastVolume.current = value
        localStorage.setItem('volume', value.toString())
      }
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  }

  const toggleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }

  const onPrev = () => {
    const index = playList.findIndex((item) => item.url === currentItem?.url);
    if (index > 0) {
      dispatch(updateCurrentItem(playList[index - 1]))
    }
  }

  const onNext = () => {
    const index = playList.findIndex((item) => item.url === currentItem?.url);
    if (index < playList.length - 1) {
      dispatch(updateCurrentItem(playList[index + 1]))
    }
  }

  useEffect(() => {
    // switch play
    if(pageInited.current){
      if(currentItem){
        onPlay();
        setIsPlaying(true)
      }else{
        onPause();
        setIsPlaying(false)
      }
    }

  }, [currentItem])

  

  useEffect(() => {
    // load default music
    presetLocalMusic(breath).then((item) => {
      dispatch(updatePlayList([...playList, item]))
      dispatch(updateCurrentItem(item))
    })

    sceneMgr.current = new SceneMgr('canvas')

    setTimeout(() => {
      pageInited.current = true
    }, 500)
  }, [])

  return (
    <PlayerWrapper>
      <audio
        ref={audioRef}
        src={currentItem?.url}
        onTimeUpdate={handleTimeUpdate}
      />
      <div className="audio-player">
        <div className="progress-bar">
          <Slider
            min={0}
            max={duration}
            step={0.1}
            value={currentTime}
            onChange={handleProgressChange}
          />
        </div>

        <div className="left-bar">
          <div className="cover" style={{
            backgroundImage: `url(${currentItem?.cover})`
          }}></div>
          <div className="col">
            <div className="name">{currentItem?.title ? `${currentItem?.title} - ${currentItem?.artist}` : currentItem?.name}</div>
            <div className="time">{formatTime(currentTime)} / {formatTime(duration)}</div>
          </div>
        </div>
        
        <div className="center-bar">
          <div className="pager-btn prev-btn" onClick={onPrev}>
            <IconPrev />
          </div>
          <div className="play-btn"  onClick={handlePlay}>
            {isPlaying ? <IconPause /> : <IconPlay />}
          </div>

          <div className="pager-btn next-btn" onClick={onNext}>
            <IconNext />
          </div>
        </div>

        <div className="right-bar">
          <div className="volume-wrapper">
            <div className="btn volume-btn" onClick={() => handleVolumeChange(volume ? 0 : lastVolume.current)}>
              {volume === 0 ? <IconVolumeMute /> :<IconVolume />}
            </div>
            <Slider
              className="volume-slider"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>

          <div className="btn list-btn" onClick={() => dispatch(updatePlayListVisible(!playListVisible))}>
            <IconPlayList /> 
          </div>

          <div className="btn fullscreen-btn" onClick={toggleFullScreen}>
            <IconFullscreen /> 
          </div>
        </div>
      </div>
    </PlayerWrapper>
  )
};

export default Audio;

