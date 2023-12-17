import React from 'react';
import './AttitudeDisplay.scss';

type T_AttitudeBackgroundProps = {
  bank: number;
  pitch: number;
};

export const AttitudeBackground = (props: T_AttitudeBackgroundProps): JSX.Element => {
  const isHorizonMarkerActive = (): boolean => {
    if (Math.abs(props.pitch) <= 17) {
      return true;
    } else return false;
  };

  const getTranslation = (): { negative: boolean; value: number } => {
    const pitch = Number;
    if (props.pitch > 17) {
      return { negative: false, value: 17 };
    } else if (props.pitch < -17) {
      return { negative: true, value: -17 };
    } else {
      return { negative: false, value: props.pitch };
    }
  };

  return (
    <g transform={`rotate(${props.bank}, 300, 255)`}>
      <g transform={`translate(0,${getTranslation().value * 8.6})`}>
        <rect x="-2000" y="-2000" width="4600" height="2255" className="attitude-sky" />
        <rect x="-2000" y="254" width="4600" height="2205" className="attitude-ground" />
        {isHorizonMarkerActive() && <rect x="0" y="252" width="600" height="4" fill="white" stroke="black" strokeWidth={1} />}
      </g>
    </g>
  );
};
