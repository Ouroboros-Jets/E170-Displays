import React from 'react';
import { useSimVar, useObjLocalVar } from 'instruments/common/Hooks/simVars';
import { FMAVars } from './FMA';

export const FmaVars = (): FMAVars => {
  const [v_AT_Mode] = useObjLocalVar('PFD_FMA_AT_Mode', 'number');
  const [v_AP_Status] = useObjLocalVar('PFD_FMA_AP_Status', 'number');
  const [v_Lateral_Mode] = useObjLocalVar('PFD_FMA_Lateral_Mode', 'number');
  const [v_Vertical_Mode] = useObjLocalVar('PFD_FMA_Vertical_Mode', 'number');
  const [v_Armed_AT_Mode] = useObjLocalVar('PFD_FMA_Armed_AT_Mode', 'number');
  const [v_AT_Status] = useObjLocalVar('PFD_FMA_AT_Status', 'number');
  const [v_Armed_Lateral_Mode] = useObjLocalVar('PFD_FMA_Armed_Lateral_Mode', 'number');
  const [v_Armed_Vertical_Mode] = useObjLocalVar('PFD_FMA_Armed_Vertical_Mode', 'number');
  const [v_Selection_Source] = useObjLocalVar('PFD_FMA_Selection_Source', 'number');

  const vars: FMAVars = {
    v_AT_Mode: v_AT_Mode,
    v_AP_Status: v_AP_Status,
    v_Lateral_Mode: v_Lateral_Mode,
    v_Vertical_Mode: v_Vertical_Mode,
    v_Armed_AT_Mode: v_Armed_AT_Mode,
    v_AT_Status: v_AT_Status,
    v_Armed_Lateral_Mode: v_Armed_Lateral_Mode,
    v_Armed_Vertical_Mode: v_Armed_Vertical_Mode,
    v_Selection_Source: v_Selection_Source,
  };
  return vars;
};
