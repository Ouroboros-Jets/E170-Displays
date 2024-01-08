import React, { FC } from 'react';
import './n1Gauge.scss';
import { E_ThrustRatingType } from '../types/thrustRatingTypes';
import { getThrustRatingAnnunciatorString } from '../hooks/getThrustRatingAnnunciatorString';

type T_N1GaugeProps = {
  n1Value: number;
  redlineValue: number;
  commandedN1: number;
  invalid: boolean;
  maxThrustRating?: number;
  thrustRatingAnnunciator: E_ThrustRatingType;
  attcsState: number;
  fadecState?: number;
  flexTemp?: number;
};

export const N1Gauge: FC<T_N1GaugeProps> = (props: T_N1GaugeProps): JSX.Element => {
  let annunciator = getThrustRatingAnnunciatorString(props.thrustRatingAnnunciator);
  return (
    <div>
      <div>n1 gauge {annunciator}</div>
    </div>
  );
};
