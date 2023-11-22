import React from 'react';
import './pfdProvider.scss';
import { FMA } from '../FMA/FMA';
import { FmaVars } from '../FMA/FMA_Vars';
import { Airspeed } from '../Airspeed/airspeed';

export const PFDProvider = () => {
  return (
    <div>
      <div className="top-component">
        <FMA x={0} y={0} vars={FmaVars()} />
        <Airspeed />
      </div>
      <div className="bottom-component">bottom</div>
    </div>
  );
};
