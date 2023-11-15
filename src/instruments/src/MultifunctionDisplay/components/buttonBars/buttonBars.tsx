import React from 'react';
import { useObjLocalVar } from 'instruments/common/Hooks/simVars';
import './buttonBars.scss';
import { ButtonBarButton } from './buttonBarButton/buttonBarButton';
import { SystemButton } from './systemButton/systemButton';

interface SystemButtonBarProps {
  isShown: boolean;
}
const SystemButtonBar: React.FC<SystemButtonBarProps> = (props: SystemButtonBarProps): JSX.Element => {
  return (
    <div className={`system-button-bar-container ${props.isShown ? 'shown' : 'hidden'}`}>
      <SystemButton text="Status" routeTo={0} />
      <SystemButton text=" Flight Ctrl" routeTo={1} />
      <SystemButton text="Hydraulics" routeTo={2} />
      <SystemButton text="Fuel" routeTo={3} />
      <SystemButton text="Electrical" routeTo={4} />
      <SystemButton text="ECS" routeTo={5} />
      <SystemButton text="Anti-Ice" routeTo={6} />
      <SystemButton text="Engine Maint" disabled routeTo={7} />
      <SystemButton text="Maintenance" routeTo={8} />
      <SystemButton text="Sys Config" routeTo={9} />
    </div>
  );
};

interface UpperButtonBarProps {
  currentPage: number;
}

export const UpperButtonBar: React.FC<UpperButtonBarProps> = (props: UpperButtonBarProps): JSX.Element => {
  return (
    <div className="upper-button-bar-container">
      <ButtonBarButton text="Map" isTop routeTo={0} />
      <ButtonBarButton text="Plan" isTop routeTo={1} />
      <ButtonBarButton isSystemButton text="Systems" isTop routeTo={2} />
    </div>
  );
};

export const LowerButtonBar = () => {
  return (
    <div className="lower-button-bar-container">
      <ButtonBarButton text="TCAS" routeTo={0} />
      <ButtonBarButton text="Weather" routeTo={1} />
      <ButtonBarButton text="Checklist" routeTo={2} />
    </div>
  );
};
