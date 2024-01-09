import React from 'react'
import { useObjLocalVar } from 'instruments/common/Hooks/simVars'
import './buttonBars.scss'
import { ButtonBarButton } from './buttonBarButton/buttonBarButton'
import { SystemButton } from './systemButton/systemButton'

type T_SystemButtonBarProps = {
  isShown: boolean
}
export const SystemButtonBar: React.FC<T_SystemButtonBarProps> = (props: T_SystemButtonBarProps): JSX.Element => {
  if (!props.isShown) {
    return <></>
  } else {
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
    )
  }
}

type T_UpperButtonBarProps = {
  currentPage: number
  setSystemMenu: React.Dispatch<React.SetStateAction<boolean>>
  systemMenu: boolean
  showSystems: boolean
  setShowSystems: React.Dispatch<React.SetStateAction<boolean>>
}

export const UpperButtonBar: React.FC<T_UpperButtonBarProps> = (props: T_UpperButtonBarProps): JSX.Element => {
  return (
    <div className="upper-button-bar-container">
      <ButtonBarButton
        text="Map"
        isSystemButton={false}
        systemMenu={false}
        showSystems={props.showSystems}
        setShowSystems={props.setShowSystems}
        setSystemMenu={() => {}}
        isTop={true}
        routeTo={0}
      />
      <ButtonBarButton
        text="Plan"
        isSystemButton={false}
        systemMenu={false}
        setSystemMenu={() => {}}
        showSystems={props.showSystems}
        setShowSystems={props.setShowSystems}
        isTop={true}
        routeTo={1}
      />
      <ButtonBarButton
        text="Systems"
        isSystemButton={true}
        systemMenu={props.systemMenu}
        setSystemMenu={props.setSystemMenu}
        showSystems={props.showSystems}
        setShowSystems={props.setShowSystems}
        isTop={true}
        routeTo={2}
      />
    </div>
  )
}

export const LowerButtonBar = (): JSX.Element => {
  return (
    <div className="lower-button-bar-container">
      <ButtonBarButton
        text="TCAS"
        isSystemButton={false}
        systemMenu={false}
        setSystemMenu={() => {}}
        showSystems={false}
        setShowSystems={() => {}}
        isTop={false}
        routeTo={0}
      />
      <ButtonBarButton
        text="Weather"
        isSystemButton={false}
        systemMenu={false}
        setSystemMenu={() => {}}
        showSystems={false}
        setShowSystems={() => {}}
        isTop={false}
        routeTo={1}
      />
      <ButtonBarButton
        text="Checklist"
        isSystemButton={false}
        systemMenu={false}
        setSystemMenu={() => {}}
        showSystems={false}
        setShowSystems={() => {}}
        isTop={false}
        routeTo={2}
      />
    </div>
  )
}
