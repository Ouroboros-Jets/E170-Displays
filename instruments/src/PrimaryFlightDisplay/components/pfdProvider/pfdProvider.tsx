import React from 'react'
import './pfdProvider.scss'
import { FMA } from '../FMA/FMA'
import { FmaVars } from '../FMA/FMA_Vars'
import { Airspeed } from '../Airspeed/airspeed'
import { Altitude } from '../Altitude/Altitude'
import { AttitudeDisplay } from '../AttitudeDisplay/AttitudeDisplay'

export const PFDProvider = (): JSX.Element => {
  return (
    <div>
      <div className="top-component">
        <AttitudeDisplay />
        <FMA x={0} y={0} vars={FmaVars()} />
        <Airspeed />
        <Altitude />
      </div>
      <div className="bottom-component">bottom</div>
    </div>
  )
}
