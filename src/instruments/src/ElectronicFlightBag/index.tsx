import React, { useState } from 'react';
import { useObjLocalVar } from 'instruments/common/Hooks/simVars';
import './index.scss';
import { render } from '../../common/Hooks';
import { Power } from './components/power/power';
import { LockScreenProvider } from './components/LockScreen/lockScreenProvider';
import { NavigraphAuthProvider } from './components/NavigraphProvider/useNavigraphAuth';
import { ButtonBar } from './components/ButtonBar/ButtonBar';

const ElectronicFlightBag = () => {
  const [powered, setPowered] = useObjLocalVar('B_EFBPOWERED', 'bool', 50);

  return (
    <NavigraphAuthProvider>
      <Power powered setPowered={() => setPowered}>
        <LockScreenProvider />
      </Power>
    </NavigraphAuthProvider>
  );
};
render(<ElectronicFlightBag />);
