// compass svg, nothing else, rendered below paths on map

import React, { type FC } from "react";
import { createArray } from "common/util/createArray";

type T_CompassProps = {
  heading: number;
  range: number;
};

export const Compass: FC<T_CompassProps> = (
  props: T_CompassProps
): JSX.Element => {
  const compassArray: number[] = createArray(361);

  enum tickTypes {
    SMALL,
    LARGE,
    NUMBERED,
  }
  const drawTick = (tickType: tickTypes, rotation: number): JSX.Element => {
    const fixNumbers = (input: number): string => {
      if (input === 360) {
        return "N";
      } else if (input === 270) {
        return "W";
      } else if (input === 180) {
        return "S";
      } else if (input === 90) {
        return "E";
      } else {
        return (input / 10).toString();
      }
    };
    switch (tickType) {
      case tickTypes.SMALL:
        return (
          <g transform={`rotate(${rotation}, 300, 314)`}>
            <path d="M 300, 49 L 300 60" stroke="white" strokeWidth={3} />
          </g>
        );
      case tickTypes.LARGE:
        return (
          <g transform={`rotate(${rotation}, 300, 314)`}>
            <path d="M 300, 49 L 300 65" stroke="white" strokeWidth={3} />
          </g>
        );
      case tickTypes.NUMBERED:
        return (
          <g transform={`rotate(${rotation}, 300, 314)`}>
            <path d="M 300, 49 L 300 65" stroke="white" strokeWidth={3} />
            <text
              textAnchor="middle"
              x={300}
              y={95}
              fontSize={25}
              fontWeight="bold"
              fill="white"
            >
              {fixNumbers(rotation)}
            </text>
          </g>
        );
    }
  };

  const drawCompassTicks = (array: number[]): JSX.Element[] => {
    const ticks: JSX.Element[] = [];
    for (let a = 0; a < array.length; a++) {
      const element = array[a];
      if (element === 0) {
        ticks.push();
      } else {
        if (element % 30 === 0) {
          ticks.push(drawTick(tickTypes.NUMBERED, element));
        } else if (element % 10 === 0) {
          ticks.push(drawTick(tickTypes.LARGE, element));
        } else if (element % 5 === 0) {
          ticks.push(drawTick(tickTypes.SMALL, element));
        }
      }
    }
    return ticks;
  };
  return (
    <g>
      <g transform={`rotate(${-props.heading}, 300, 314)`}>
        <circle
          cx={300}
          cy={314}
          r={265}
          fill="transparent"
          stroke="white"
          strokeWidth={3}
        />
        {drawCompassTicks(compassArray)}
      </g>

      <circle
        cx={300}
        cy={314}
        r={130}
        fill="transparent"
        stroke="white"
        strokeWidth={3}
      />
      <g transform="rotate(-60, 300, 314)">
        <path
          d="M300,174 L 300 194"
          strokeLinecap="round"
          stroke="white"
          strokeWidth={3}
        />
      </g>
      <g transform="rotate(60, 300, 314)">
        <path
          d="M300,174 L 300 194"
          strokeLinecap="round"
          stroke="white"
          strokeWidth={3}
        />
      </g>
    </g>
  );
};
