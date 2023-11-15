import React from 'react';
import { useSimVar, useObjLocalVar } from 'instruments/common/Hooks/simVars';

type T_EngineVars = {
  thrustRatingAnnunciator: number;
  ittValue1: number;
  ittValue2: number;
  eng1Fire: boolean;
  eng2Fire: boolean;
  eng1IttInvalid: boolean;
  eng2IttInvalid: boolean;
};

export const EngineVars = (): T_EngineVars => {
  const [thrustRatingAnnunciator] = useObjLocalVar('EICAS_THRUST_RATING_ANNUNCIATOR', 'number');
  const [ittValue1] = useSimVar('TURB ENG1 ITT', 'celsius');
  const [ittValue2] = useSimVar('TURB ENG2 ITT', 'celsius');
  const [eng1Fire] = useObjLocalVar('EICAS_ENG1_FIRE', 'bool');
  const [eng2Fire] = useObjLocalVar('EICAS_ENG2_FIRE', 'bool');
  const [eng1IttInvalid] = useObjLocalVar('EICAS_ENG1_ITT_INVALID', 'bool');
  const [eng2IttInvalid] = useObjLocalVar('EICAS_ENG2_ITT_INVALID', 'bool');

  return { thrustRatingAnnunciator, ittValue1, ittValue2, eng1Fire, eng2Fire, eng1IttInvalid, eng2IttInvalid };
};
