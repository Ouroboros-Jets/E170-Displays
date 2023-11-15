import { useSimVar } from 'instruments/common/Hooks/simVars';
//this needs to be changed to avionics framework, should work using same method however
const stringHandler = (positionValue: number) => {
  switch (positionValue) {
    case 0:
      return 'VHF1';
    case 1:
      return 'VHF2';
    case 2:
      return 'VHF3';
    case 3:
      return 'HF1';
    case 4:
      return 'SAT';
  }
};

const getVolume = (index: number) => {
  const [pnl1Volume] = useSimVar('L:OBJ_COM_PNL_0_VOL', 'enum');
  const [pnl2Volume] = useSimVar('L:OBJ_COM_PNL_1_VOL', 'enum');

  if (index === 0) {
    return pnl1Volume;
  } else if (index === 1) {
    return pnl2Volume;
  }
};

const getSelection = (index: number) => {
  const [pnl1pos] = useSimVar('L:OBJ_COM_PNL_0_POS', 'enum');
  const [pnl2pos] = useSimVar('L:OBJ_COM_PNL_1_POS', 'enum');
  if (index === 0) {
    return stringHandler(pnl1pos);
  } else if (index === 1) {
    return stringHandler(pnl2pos);
  }
};

const SimInterface = (index: number) => {
  let volume = getVolume(index);
  let selection = getSelection(index);
  return { volume: volume, selection: selection || 'ERR' };
};

export default SimInterface;
