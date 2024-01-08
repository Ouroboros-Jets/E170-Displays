import React from 'react';
import mouseIcon from '../../../../assets/svg/mouse.svg';
import useMousePosition from 'instruments/common/Hooks/getMousePosition';
import './mouse.scss';

export const Mouse = () => {
  const { x, y } = useMousePosition();

  return (
    <div className="mouse" style={{ top: y - 25, left: x - 25 }}>
      <img src={mouseIcon} alt="Mouse Cursor, This is broken if you see this" />
    </div>
  );
};
