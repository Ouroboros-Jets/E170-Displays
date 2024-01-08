import React, { FC } from 'react';
import { AltitudeTape } from './AltitudeTape';
import './altitude.scss';
import { SelectedAltitudeBox } from './selectedAltitudeBox';
import { BaroSettingBox } from './baroSettingBox';
import { useSimVar } from 'instruments/common/Hooks/simVars';

type T_altitude = {};

export const Altitude: FC<T_altitude> = (props: T_altitude): JSX.Element => {
  const [altitude] = useSimVar('INDICATED ALTITUDE', 'feet');
  return (
    <div className="altitude-continer">
      <svg className="altitude-svg" viewBox="0 0 120 422">
        <rect x="29" y="0" width="83" height="422" fill="#000" opacity={0.3} />
        <AltitudeTape altitude={altitude} />
        <SelectedAltitudeBox />
        <BaroSettingBox />
      </svg>
    </div>
  );
};
