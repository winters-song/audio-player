import { css } from "@emotion/react";
import styled from "@emotion/styled";


export const scrollLight = css`
  ::-webkit-scrollbar-track-piece{
    background-color: rgba(255, 255, 255, 0.3);
    -webkit-border-radius:5px;
  }
  ::-webkit-scrollbar{
    width: 4px;
    height: 4px;
  }
  ::-webkit-scrollbar-thumb:vertical{
    height:18px;
    background-color: white;
    -webkit-border-radius: 8px;
    outline-offset:-2px;
  }

  ::-webkit-scrollbar-thumb:horizontal{
    width: 18px;
    background-color: #ccc;
    -webkit-border-radius: 8px;
  }

  ::-webkit-scrollbar-thumb:hover{
    height:18px;
    background-color:#aaa;
    -webkit-border-radius: 8px;
  }
`

export const ListWrapper = styled.div`
  position: absolute;
  right: 20px;
  top: 50px;
  bottom: 100px;
  width: 300px;
  background-color: rgba(0,0,0,0.4);
  border-radius: 20px;

  color: #f0f0f0;

  .header{
    padding: 0 15px;
    text-align: left;
    font-weight: 600;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 50px;

    .add-btn{
      width: 30px;
      height: 24px;
      line-height: 22px;
      text-align: center;
      border-radius: 5px;
      border: 1px solid #999;
      font-size: 24px;
      font-weight: 400;
      color: #999;
      cursor: pointer;
    }
  }

  .body{
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow: auto;

    ${scrollLight};
  }

  .list-item{
    background-color: #ffffff05;
    padding: 10px 15px;
    text-align: left;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .text{
      color: #999;
    }

    .delete-btn{
      color: #999;

      &:hover{
        color:#eee;
      }
    }

    &.active{
      background-color: #ffffff10;
      .text{
        color: #fff;
        text-shadow: 0 0 2px #fff;
      }
    }
  }

  .footer{
    position: absolute;
    bottom: 0;
    padding: 15px 0;
    text-align: center;
    left: 0;
    right: 0;
    color: #ffffff80;
  }
`