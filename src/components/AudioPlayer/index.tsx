import React, { FC, useEffect, useRef, useState } from "react"
import { PlayerWrapper } from "./styles";
import { Slider, Typography } from 'antd';
import { IconFullscreen, IconLoop, IconNext, IconPause, IconPlay, IconPlayList, IconPrev, IconRandom, IconSingleCycle, IconVolume, IconVolumeMute } from "../common/icons";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../../models/common";
import { updateCurrentItem, updatePlayList, updatePlayListVisible, updatePlayMode, updateRandomPlayList } from "../../store/reducers/common";
import SceneMgr from "../SceneMgr";
import { formatTime, presetLocalMusic } from "../../utils/utils";
import { shuffle } from 'lodash';

/**
 * I import the first music by hard coding here, 
 * bacause the mp3 decoder only works through Blob
 */
import breath from '../../assets/audio/薬師寺寛邦,キッサコ - 呼吸.mp3';
import { PLAY_MODE, TOTAL_PLAY_MODE } from "../common/constants";

const {Text} = Typography

const Audio: FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(Number(localStorage.getItem('volume')) || 0.5);
  const [duration, setDuration] = useState(0);

  const dispatch = useDispatch()
  const playList = useSelector((state: IStore) => state.common.playList)
  const randomPlayList = useSelector((state: IStore) => state.common.randomPlayList)
  const currentItem = useSelector((state: IStore) => state.common.currentItem)
  const playListVisible = useSelector((state: IStore) => state.common.playListVisible)
  const playMode = useSelector((state: IStore) => state.common.playMode)
  const effectMode = useSelector((state: IStore) => state.common.effectMode)

  const lastVolume = useRef(volume)

  const pageInited = useRef(false)
  const sceneMgr = useRef<SceneMgr>()

  // toggle between play and pause
  const handlePlay = () => {
    if (!currentItem) {
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
    sceneMgr.current?.stopVisualize();

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

      if (value) {
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
    const list = playMode === PLAY_MODE.RANDOM ? randomPlayList : playList

    const index = list.findIndex((item) => item.url === currentItem?.url);
    if (index > 0) {
      dispatch(updateCurrentItem(list[index - 1]))
    }else{
      dispatch(updateCurrentItem(list[list.length - 1]))
    }
  }

  const onNext = () => {
    const list = playMode === PLAY_MODE.RANDOM ? randomPlayList : playList

    const index = list.findIndex((item) => item.url === currentItem?.url);
    if (index < list.length - 1) {
      dispatch(updateCurrentItem(list[index + 1]))
    }else{
      dispatch(updateCurrentItem(list[0]))
    }
  }

  const onEnded = () => {
    if (audioRef.current) {
      if (playMode === PLAY_MODE.SINGLE) {
        audioRef.current.currentTime = 0
        onPlay();
      }else{
        onNext();
      }
    }
  }

  const switchPlayMode = (playMode: number) => {
    const nextMode = (playMode + 1) % TOTAL_PLAY_MODE
    dispatch(updatePlayMode(nextMode))

  }

  // switch music 
  // (do not trigger before user interact - browser autoplay policy)
  useEffect(() => {
    if (pageInited.current) {
      if (currentItem) {
        onPlay();
        setIsPlaying(true)
      } else {
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
    }, 1000)
  }, [])


  useEffect(() => {
    if(playMode === PLAY_MODE.RANDOM){
      dispatch(updateRandomPlayList(shuffle([...playList])))
    }
  }, [playList, playMode])

  useEffect(() => {
    if(effectMode !== undefined){
      sceneMgr.current?.toggleEffect(effectMode)
    }
  }, [effectMode])

  return (
    <PlayerWrapper>
      <audio
        ref={audioRef}
        src={currentItem?.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onEnded}
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
            <Text className="name" ellipsis>{currentItem?.title ? `${currentItem?.title} - ${currentItem?.artist}` : currentItem?.name}</Text>
            <div className="time">{formatTime(currentTime)} / {formatTime(duration)}</div>
          </div>
        </div>

        <div className="center-bar">
          <div className="pager-btn prev-btn" onClick={onPrev}>
            <IconPrev />
          </div>
          <div className="play-btn" onClick={handlePlay}>
            {isPlaying ? <IconPause /> : <IconPlay />}
          </div>

          <div className="pager-btn next-btn" onClick={onNext}>
            <IconNext />
          </div>
        </div>

        <div className="right-bar">
          <div className="volume-wrapper">
            <div className="btn volume-btn" onClick={() => handleVolumeChange(volume ? 0 : lastVolume.current)}>
              {volume === 0 ? <IconVolumeMute /> : <IconVolume />}
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

          <div className="btn mode-btn" onClick={() => switchPlayMode(playMode)}>
            {playMode === PLAY_MODE.LOOP && <IconLoop />}
            {playMode === PLAY_MODE.SINGLE && <IconSingleCycle />}
            {playMode === PLAY_MODE.RANDOM && <IconRandom />}
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

