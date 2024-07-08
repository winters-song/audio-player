import styled from "@emotion/styled";


export const ListWrapper = styled.div`
  position: absolute;
  top: 40%;
  left: 10px;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 50px;
  height: 100px;
  transform: translateY(-50%);
  row-gap: 15px;
  font-family: var(--font-family);
  .dot{
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 2px solid white;
    transition: all 0.2s;
    cursor: pointer;
    transform: scale(1);
    &:hover, &.active{
      box-shadow: inset 0 0 2px 4px white;
    }
    &:hover{
      span{
        transform: translateX(0);
        opacity: 1;
      }
    }

    span{
      position: absolute;
      left: 30px;
      color: white;
      width: 100px;
      text-align: left;
      line-height: 15px;
      opacity: 0;
      transition: all 0.2s 0.1s;
      transform: translateX(-40px);
    }
  }
`