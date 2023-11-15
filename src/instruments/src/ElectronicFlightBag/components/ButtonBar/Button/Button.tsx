import React, { FC, ReactElement, useEffect, useState } from 'react';
import { animated, useSpring, config } from 'react-spring';
import { useObjLocalVar } from 'instruments/common/Hooks/simVars';
import './button.scss';

interface ButtonProps {
  text: string;
  icon: ReactElement;
  routeTo: number;
  active: boolean;
}

const Buttons = [
  'M 5 0 L 190 0 Q 194 1, 195 5 L 195 140 Q 194 144, 190 145 L 148 145 L 99 145 Q 97 145, 95 145 L 47 145 L 5 145 Q 1 144, 0 140 L 0 5 Q 1 1, 5 0',
  'M 5 0 L 190 0 Q 194 1, 195 5 L 195 140 Q 194 144, 190 145 L 148 145 L 99 175 Q 97 176, 95 175 L 47 145 L 5 145 Q 1 144, 0 140 L 0 5 Q 1 1, 5 0',
];

export const Button: FC<ButtonProps> = (props: ButtonProps): JSX.Element => {
  const [efbRoute, setEfbRoute] = useObjLocalVar('EFB_ROUTE', 'number', 400);
  const [active, setActive] = useState(false);
  const { x } = useSpring({
    config: { duration: 100 },
    x: active ? 1 : 0,
  });

  useEffect(() => {
    setActive(props.active);
  }, [props.active]);

  return (
    <div onClick={() => setEfbRoute(props.routeTo)} className={`${props.active ? 'active' : 'normal'} button`}>
      <svg width="200" height="200" viewBox="0 0 200 200" fill="#ffffff36" xmlns="https://www.w3.org/2000/svg">
        <g transform="scale(1.05) translate(-4,0)">
          <animated.path
            d={x.to({
              range: [0, 1],
              output: Buttons,
            })}
            fill={'#2a2fff'}
          />
        </g>

        <animated.path
          d={x.to({
            range: [0, 1],
            output: Buttons,
          })}
          fill={'#007eff'}
        />
      </svg>
      <div className="buttonContents">
        {props.icon}
        {props.text}
      </div>
    </div>
  );
};
