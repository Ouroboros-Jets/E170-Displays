import React, { FC } from 'react';

import airportIcon from './airports.svg';
import fplIcon from './flightPlan.svg';
import homeIcon from './home.svg';
import wnbIcon from './WnB.svg';

interface IconProps {
  width: number;
}

export const AirportsIcon: FC<IconProps> = (props: IconProps): JSX.Element => {
  return (
    <div>
      <img style={{ width: `${props.width}` }} src={airportIcon} alt="airports" />
    </div>
  );
};

export const FplIcon: FC<IconProps> = (props: IconProps): JSX.Element => {
  return (
    <div>
      <img style={{ width: `${props.width}` }} src={fplIcon} alt="fpl" />
    </div>
  );
};

export const HomeIcon: FC<IconProps> = (props: IconProps): JSX.Element => {
  return (
    <div>
      <img style={{ width: `${props.width}` }} src={homeIcon} alt="home" />
    </div>
  );
};

export const WnBIcon: FC<IconProps> = (props: IconProps): JSX.Element => {
  return (
    <div>
      <img style={{ width: `${props.width}` }} src={wnbIcon} alt="wnb" />
    </div>
  );
};
