import React, { FC } from 'react';
import { createArray } from 'instruments/common/util/createArray';
import './airspeed.scss';
import { useSimVar } from 'instruments/common/Hooks/simVars';
import { SelectedAirspeedBox } from './selectedAirspeedBox';

/**
 * airspeed tape has a range of 30 to 942 knots +/- 42 knots from the center, meaning the highese number will be 900 but we will extend the tick marks to 942
 * tick marks are labeled every 10 knotes from 30 to 200, then every 20 knots from 200 to 900
 * schlawg trippin this shit looks like the tick marks are 2 dif sizes, dont read the docs while high (they were not and i wasted my time, too late tho)
 */

export const AirspeedTape: FC = (): JSX.Element => {
  const [airspeed] = useSimVar('AIRSPEED INDICATED', 'knots');
  const tapeLength = 942;
  const spacing = 3.95;
  const startOffset = 200;
  const airspeedTapeScaling = 3.95;
  const array = createArray(tapeLength);

  const drawTick = (small: boolean, y: number) => {
    return (
      <path
        d={`M 82 ${-y} L ${small ? 70 : 58} ${-y}`}
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    );
  };
  const Tape = array.map((item, index) => {
    if (index < 30) {
      return null;
    }
    if (index < 200) {
      if (index % 10 === 0) {
        return (
          <g key={index}>
            {drawTick(false, index * spacing)}
            <text x="53" y={-index * spacing + 9} textAnchor="end" fill="white" fontSize="22">
              {index}
            </text>
          </g>
        );
      } else return null;
    } else {
      if (index % 20 === 0) {
        return (
          <g key={index}>
            {drawTick(false, index * spacing)}
            <text x="53" y={-index * spacing + 9} textAnchor="end" fill="white" fontSize="22">
              {index}
            </text>
          </g>
        );
      } else if (index % 20 === 10) {
        return drawTick(false, index * spacing);
      } else return null;
    }
  });
  return (
    <div className="airspeed-container">
      <svg className="airspeed-svg" viewBox="0 0 82 396">
        <path d="M 81 32 L 81 364" stroke="white" strokeWidth="2" />
        <clipPath id="tapeClip">
          <rect x={0} y={34} width={81} height={330} />
        </clipPath>
        <g clipPath="url(#tapeClip)">
          <g transform={`translate(0,${(airspeed < 30 ? 30 : airspeed) * airspeedTapeScaling + startOffset})`}>{Tape}</g>
        </g>
        <SelectedAirspeedBox selectedAirspeed={0.79} mach={true} mode={0} />
      </svg>
    </div>
  );
};
