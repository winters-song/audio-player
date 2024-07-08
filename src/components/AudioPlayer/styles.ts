import styled from "@emotion/styled";

const mainColor = "#f0f0f0";

export const PlayerWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  .audio-player {
    padding: 0 20px;
    height: 80px;
    background-image: linear-gradient(180deg, #00000000 0%, #00000080 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${mainColor};
  }

  .progress-bar{
    position: absolute;
    top: -4px;
    left: 20px;
    right: 20px;

    .ant-slider{
      margin: 0;

      .ant-slider-rail {
        background-color: rgba(255, 255, 255, 0.3);
        /* background-color: white;
        box-shadow: 0 0 12px 0px rgb(255 255 255), 0 0 12px 3px rgb(0 210 255), 0 0 20px 0px rgb(0 179 255), 0 0 40px 10px rgb(0 155 255), 0 0 60px 20px rgb(0 155 255); */
      }

      .ant-slider-track{
        background-color: ${mainColor};
      }
    }
  }

  .center-bar{
    width: 240px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    z-index: 2;
    
    .play-btn{
      width: 44px;
      height: 44px;
      border: 2px solid ${mainColor}; 
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      svg{
        width: 30px;
        height: 30px;
      }

      .icon-play{
        position: relative;
        left: 1px;
      }
    }

    .pager-btn{
      width: 44px;
      height: 44px;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      svg{
        width: 30px;
        height: 30px;
      }
    }
  }

  .left-bar{
    position: absolute;
    left: 20px;
    text-align: left;
    display: flex;
    flex-direction: row;

    .cover{
      width: 44px;
      height: 44px;
      border-radius: 4px;
      background-size: contain;
      margin-right: 10px;
    }
    .col{
      display: flex;
      flex-direction: column;
    }

    .name{
      width: 200px;
      color: white;
    }
    
    .time{
      margin-top: 5px;
      color: #ffffff80;
      font-size: 14px;
    }
  }

  .right-bar{
    position: absolute;
    right: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 20px;

    .btn{
      width: 44px;
      height: 44px;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      svg{
        width: 30px;
        height: 30px;
      }
    }

    .list-btn{
      svg{
        width: 28px;
        height: 28px;
        position: relative;
        top: -1px;
      }
    }

    .volume-wrapper{
      display: flex;
      flex-direction: row;
      align-items: center;

      .volume-slider{
        width: 100px;

        .ant-slider-rail {
          background-color: rgb(255, 255, 255, 0.1);
        }

        .ant-slider-track{
          background-color: ${mainColor};
        }
      }
    }
  }
  
`