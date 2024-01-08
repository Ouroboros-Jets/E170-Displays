/**
 * Engine Gauge Parameters,
 * prefer this to hard coding in the component itself to make it easier to change
 */

export const EngineParameters = {
  //itt gauge on the E170 eicas
  E170_ITT: {
    hardLimit: 1130,
    scaling: 4.2,
    amberColor: 'orange',
    redColor: 'red',
    limeColor: 'lime',
    yellowColor: 'yellow',
    fillerColor: 'grey',
    redlineValue: 1050,
    yellowLineValue: 950,
    forceRedInYellowTime: 120000,
    leftGague: {
      x: 11,
      y: 210,
    },
    rightGague: {
      x: 192,
      y: 210,
    },
  },
  // itt gauge on the E190 eicas (has different engine so values could be different, idk tho :shrug: probably overengineered this)
  E190_ITT: {},
  //N1 Gauge
  E170_N1: {},
};
