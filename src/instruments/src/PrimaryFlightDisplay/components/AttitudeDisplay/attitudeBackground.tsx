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
    <g transform={`rotate(${props.bank}, 275, 255)`}>
      <linearGradient id="SkyGradiant" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="#020383" />
        <stop offset="88%" stop-color="#020383" />
        <stop offset="100%" stop-color="#1717cf" />
      </linearGradient>
      <linearGradient id="GroundGradiant" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="#674200" />
        <stop offset="25%" stop-color="#352200" />
        <stop offset="100%" stop-color="#352201" />
      </linearGradient>
      <g transform={`translate(0,${getTranslation().value * 8.6})`}>
        <rect x="-2000" y="-2000" width="4600" height="2255" fill="url(#SkyGradiant)" />
        <rect x="-2000" y="254" width="4600" height="2205" fill="url(#GroundGradiant)" />
        {isHorizonMarkerActive() && <rect x="0" y="252" width="600" height="4" fill="white" stroke="black" strokeWidth={1} />}
      </g>
    </g>
  );
};
