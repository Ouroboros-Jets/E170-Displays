import React, { FC } from 'react';
import { N1Gauge } from './components/n1Gauge';
import { IttGauge } from './components/ittGauge/ittGauge';
import { EngineParameters } from './engineParameters';
import { EngineVars } from './engineVars';
import './engine.scss';

type T_EngineProps = {};

export const Engine: FC<T_EngineProps> = (props: T_EngineProps) => {
  const vars = EngineVars();

  return (
    <div className="engine-wrapper">
      <div className="flex-row">
        <N1Gauge
          n1Value={0}
          redlineValue={100}
          commandedN1={0}
          thrustRatingAnnunciator={vars.thrustRatingAnnunciator}
          invalid={false}
          attcsState={0}
        />
        <N1Gauge n1Value={0} redlineValue={100} commandedN1={0} thrustRatingAnnunciator={1} invalid={false} attcsState={0} />
      </div>
      <div className="flex-row">
        <IttGauge
          ittValue={vars.ittValue1}
          redlineValue={EngineParameters.E170_ITT.redlineValue}
          yellowLineValue={EngineParameters.E170_ITT.yellowLineValue}
          fire={vars.eng1Fire}
          invalid={vars.eng1IttInvalid}
          left={EngineParameters.E170_ITT.leftGague.x}
          top={EngineParameters.E170_ITT.leftGague.y}
          hardLimit={EngineParameters.E170_ITT.hardLimit}
          scaling={EngineParameters.E170_ITT.scaling}
          amberColor={EngineParameters.E170_ITT.amberColor}
          redColor={EngineParameters.E170_ITT.redColor}
          limeColor={EngineParameters.E170_ITT.limeColor}
          yellowColor={EngineParameters.E170_ITT.yellowColor}
          fillerColor={EngineParameters.E170_ITT.fillerColor}
          forceRedInYellowTime={EngineParameters.E170_ITT.forceRedInYellowTime}
        />
        <IttGauge
          ittValue={vars.ittValue2}
          redlineValue={EngineParameters.E170_ITT.redlineValue}
          yellowLineValue={EngineParameters.E170_ITT.yellowLineValue}
          fire={vars.eng2Fire}
          invalid={vars.eng2IttInvalid}
          left={EngineParameters.E170_ITT.rightGague.x}
          top={EngineParameters.E170_ITT.rightGague.y}
          hardLimit={EngineParameters.E170_ITT.hardLimit}
          scaling={EngineParameters.E170_ITT.scaling}
          amberColor={EngineParameters.E170_ITT.amberColor}
          redColor={EngineParameters.E170_ITT.redColor}
          limeColor={EngineParameters.E170_ITT.limeColor}
          yellowColor={EngineParameters.E170_ITT.yellowColor}
          fillerColor={EngineParameters.E170_ITT.fillerColor}
          forceRedInYellowTime={EngineParameters.E170_ITT.forceRedInYellowTime}
        />
      </div>
    </div>
  );
};
