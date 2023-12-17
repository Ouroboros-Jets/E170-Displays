import React, { type FC } from 'react';

type T_pathWithBlackBackgroundProps = {
  d: string;
  fill: string;
  fillTop: string;
  StrokeWidth: number;
  strokeWidthTop: number;
  forceTransparent?: boolean;
  fillTop2?: string;
};

export const PathWithBlackBackground: FC<T_pathWithBlackBackgroundProps> = (
  props: T_pathWithBlackBackgroundProps,
): JSX.Element => {
  return (
    <g>
      <path
        d={props.d}
        fill={props.forceTransparent ? 'transparent' : 'black'}
        strokeWidth={props.StrokeWidth}
        stroke={props.fill}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={props.d}
        fill={props.fillTop2 ? props.fillTop2 : props.fillTop}
        strokeWidth={props.strokeWidthTop}
        stroke={props.fillTop}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
};
