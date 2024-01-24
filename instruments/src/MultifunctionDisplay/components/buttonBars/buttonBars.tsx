import React from 'react'
import { useObjLocalVar } from 'instruments/common/Hooks/simVars'
import './buttonBars.scss'
import { ButtonBarButton } from './buttonBarButton/buttonBarButton'
import { SystemButton } from './systemButton/systemButton'

type T_SystemButtonBarProps = {
  isShown: boolean
  setShown: React.Dispatch<React.SetStateAction<boolean>>
  text: string[]
}
export const SystemButtonBar: React.FC<T_SystemButtonBarProps> = (props: T_SystemButtonBarProps): JSX.Element => {
  if (!props.isShown) {
    return <></>
  } else {
    return (
      <div className={`system-button-bar-container ${props.isShown ? 'shown' : 'hidden'}`}>
        {props.text.map((text, index) => {
          return <SystemButton setShown={props.setShown} text={text} key={index} routeTo={index} />
        })}
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
