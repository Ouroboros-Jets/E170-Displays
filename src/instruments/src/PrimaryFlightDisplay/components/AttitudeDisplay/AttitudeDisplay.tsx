import React, { FC } from 'react';
import './AttitudeDisplay.scss';
import { AttitudeBackground } from './attitudeBackground';
import { AttitudeForeground } from './attitudeForeground';
import { useSimVar } from 'instruments/common/Hooks/simVars';
import { AttitudeMarkers } from './markers';

type T_AttitudeDisplayProps = {};

export const AttitudeDisplay: FC<T_AttitudeDisplayProps> = (props: T_AttitudeDisplayProps): JSX.Element => {
  const [bank] = useSimVar('PLANE BANK DEGREES', 'degrees');
  const [pitch] = useSimVar('PLANE PITCH DEGREES', 'degrees');

  return (
    <div className="attitude-continer">
      <svg className="attitude-svg" viewBox="0 0 600 460" width="100%" height="100%">
        <AttitudeBackground bank={bank} pitch={pitch} />
        <AttitudeForeground bank={bank} pitch={pitch} />
        <AttitudeMarkers />
      </svg>
    </div>
  );
};
