import React, { FC } from 'react';
import { AltitudeTape } from './AltitudeTape';
import './altitude.scss';
import { SelectedAltitudeBox } from './selectedAltitudeBox';
import { BaroSettingBox } from './baroSettingBox';

type T_altitude = {};

export const Altitude: FC<T_altitude> = (props: T_altitude): JSX.Element => {
  return (
    <div className="altitude-continer">
      <svg className="altitude-svg" viewBox="0 0 120 422">
        <AltitudeTape />
        <SelectedAltitudeBox />
        <BaroSettingBox />
      </svg>
    </div>
  );
};
