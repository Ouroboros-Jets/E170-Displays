/**
 * altitude tape will have a practical range of -1000' to 60,000' +/- 550' from the center, meaning the highest number will be 60,000' but we will extend the tick marks to 60,550'
 * tick marks label every 100' along the entire range,
 * single chevrons every 500' along the entire range,
 * double chevrons every 1000' along the entire range,
 * if there is a chevron, there will be no tick mark and a number will be displayed
 */
import React, { FC } from 'react';
import { createArray } from 'instruments/common/util/createArray';

const drawChevron = (double: boolean, y: number): JSX.Element => {
  const offset = -y / 3.31;
  if (double) {
    return (
      <g>
        <path
          d={`M 70 ${offset + 300} L 70 ${offset + 255} L38 ${offset + 223} L 70 ${offset + 190} L 70 ${offset + 148}`}
          stroke="white"
          strokeWidth="2"
          fill="none"
        />
        <path d={`M 70 ${offset + 265} L30 ${offset + 223} L 70 ${offset + 181}`} stroke="white" strokeWidth="2" fill="none" />
        {drawNumber(y)}
      </g>
    );
  } else {
    return (
      <g>
        <path
          d={`M 70 ${offset + 300} L 70 ${offset + 265} L30 ${offset + 223} L 70 ${offset + 181} L 70 ${offset + 148}`}
          stroke="white"
          strokeWidth="2"
          fill="none"
        />
        {drawNumber(y)}
      </g>
    );
  }
};

const drawTick = (y: number) => {
  const offset = -y / 3.31;
  return (
    <path
      d={`M 30 ${offset + 222} L ${42} ${offset + 222}`}
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
};
const drawNumber = (y: number) => {
  const offset = -y / 3.31;
  return (
    <text x="46" y={offset + 224} fill="white" fontSize="22px" textAnchor="start" dominantBaseline="middle">
      {y}
    </text>
  );
};

type T_altitudeTape = {
  invalid?: boolean;
  altitude?: number;
};

export const AltitudeTape: FC<T_altitudeTape> = ({ invalid, altitude }): JSX.Element => {
  const tickMarks = createArray(600);
  const negativeTickMarks = createArray(30);
  const tape = tickMarks.map((tick: number) => {
    if (tick % 10 === 0) {
      return drawChevron(true, tick * 100);
    }
    if (tick % 5 === 0) {
      return drawChevron(false, tick * 100);
    }
    return drawTick(tick * 100);
  });
  const negativeTape = negativeTickMarks.map((tick: number) => {
    if (tick % 10 === 0) {
      return drawChevron(true, tick * -100);
    }
    if (tick % 5 === 0) {
      return drawChevron(false, tick * -100);
    }
    return drawTick(tick * -100);
  });
  return (
    <g>
      <path d="M 29 58 L 29 391" stroke="white" strokeWidth="2" fill="none" />
      {negativeTape}
      {tape}
    </g>
  );
};
