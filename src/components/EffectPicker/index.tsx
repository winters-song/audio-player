import React from "react"
import { ListWrapper } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../../models/common";
import { updateEffectMode } from "../../store/reducers/common";
import { effectList } from "../common/constants";



const EffectPicker = () => {
  const dispatch = useDispatch();
  const effectMode = useSelector((state: IStore) => state.common.effectMode)

  return (
    <ListWrapper>
      {effectList.map((item, index) => (
        <div
          key={index}
          className={`dot ${item === effectMode ? 'active' : ''}`}
          onClick={() => dispatch(updateEffectMode(item))}
        >
          <span>{item.name}</span>
        </div>
      ))}
    </ListWrapper>
  )
};

export default EffectPicker;
