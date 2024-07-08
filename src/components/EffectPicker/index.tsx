import React from "react"
import { ListWrapper } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../../models/common";
import { updateEffectMode } from "../../store/reducers/common";


const list = [
  'Bar Chart',
  'Pixel Art LED'
]

const EffectPicker = () => {
  const dispatch = useDispatch();
  const effectMode = useSelector((state: IStore) => state.common.effectMode)

  return (
    <ListWrapper>
      {list.map((item, index) => (
        <div
          key={index}
          className={`dot ${index === effectMode ? 'active' : ''}`}
          onClick={() => dispatch(updateEffectMode(index))}
        >
          <span>{item}</span>
        </div>
      ))}
    </ListWrapper>
  )
};

export default EffectPicker;
