import React, { FC } from 'react';
import { E_AirspeedTypes } from './airspeedTypes';

type T_AirspeedBoxProps = {
  selectedAirspeed: number;
  mach: boolean;
  mode: E_AirspeedTypes;
};

export const SelectedAirspeedBox: FC<T_AirspeedBoxProps> = (props: T_AirspeedBoxProps): JSX.Element => {
  const invalidOutput: string = '---';

  const getString = (): { element: JSX.Element; color: string } => {
    switch (props.mode) {
      case E_AirspeedTypes.FMS:
        return {
          element: (
            <tspan>
              {props.selectedAirspeed}
              {props.mach ? (
                <tspan fill="white" fontSize={14}>
                  M
                </tspan>
              ) : (
                ''
              )}
            </tspan>
          ),
          color: 'magenta',
        };
      case E_AirspeedTypes.MAN:
        return {
          element: (
            <tspan>
              {props.selectedAirspeed}
              {props.mach ? (
                <tspan fill="white" fontSize={14}>
                  M
                </tspan>
              ) : (
                ''
              )}
            </tspan>
          ),
          color: 'cyan',
        };
      case E_AirspeedTypes.INOP:
        return { element: <tspan>{invalidOutput}</tspan>, color: 'yellow' };
    }
  };

  return (
    <g>
      <rect x={1} y={1} rx={2} ry={2} width={80} height={33} strokeWidth={2} fill="transparent" stroke="white" />
      <text x={41} y={28} textAnchor="middle" fill={getString().color} fontSize="30">
        {getString().element}
      </text>
    </g>
  );
};
