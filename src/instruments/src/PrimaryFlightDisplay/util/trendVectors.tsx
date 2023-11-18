/**
 * purpose: to calculate the trend vector for the PFD
 *
 */
import React, { useEffect, useState, FC } from 'react';
import { useSimVar, useObjLocalVar } from 'instruments/common/Hooks/simVars';

export enum E_TrendVector {
  ASI,
  ALT,
}

type T_TrendVectors = {
  type: E_TrendVector;
  x?: number;
  y?: number;
  width?: number;
  scale?: number;
};

export const TrendVectors: FC<T_TrendVectors> = (props: T_TrendVectors): JSX.Element => {
  const [airspeed] = useSimVar('AIRSPEED INDICATED', 'knots');
  const [altitude] = useSimVar('INDICATED ALTITUDE', 'feet');
  const [lastRenderTime, setLastRenderTime] = useState<number>(Date.now());
  const [predictedAirSpeed, setPredictedAirSpeed] = useState(0);
  const [predictedAltitude, setPredictedAltitude] = useState(0);
  const [previousAltitude, setPreviousAltitude] = useState(0);
  const [previousAirSpeed, setPreviousAirSpeed] = useState(0);

  useEffect(() => {
    setPreviousAltitude(altitude);
  }, [airspeed, altitude]);

  const calculateTrendingAirspeed = (airspeed: number, previousAirspeed: number, lastRenderTime: number): number => {
    const currentTime = Date.now();
    const timeDelta = currentTime - lastRenderTime;

    const speedDelta = airspeed - previousAirspeed;
    const accelerationKnotsPerSecond: number = speedDelta / (timeDelta / 1000);
    const changeInSpeedKnots = accelerationKnotsPerSecond * 10;
    const trendingAirspeedKnots = changeInSpeedKnots;
    setLastRenderTime(currentTime);

    if (isNaN(trendingAirspeedKnots)) return 0;
    return trendingAirspeedKnots;
  };

  useEffect(() => {
    const trend: number = calculateTrendingAirspeed(airspeed, previousAirSpeed, lastRenderTime);
    if (isNaN(trend) || trend == 0) return;
    setPredictedAirSpeed(trend);
    setPreviousAirSpeed(airspeed);
    console.log('predictedAirSpeed', predictedAirSpeed);
  }, [airspeed, previousAirSpeed, lastRenderTime, altitude, previousAltitude]);

  return (
    <div>
      <div>
        airspeed:{airspeed} trend{predictedAirSpeed > 5 ? predictedAirSpeed : 0}
      </div>
      <div
        style={{ position: 'absolute', left: '50%', top: '50%', backgroundColor: 'red', width: `${predictedAirSpeed + 50}px` }}
      >
        the monkeys wil roam the earth
      </div>
    </div>
  );
};
