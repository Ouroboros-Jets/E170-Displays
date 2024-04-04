import React from 'react'
import './displayProvider.scss'
import { LowerButtonBar, SystemButtonBar, UpperButtonBar } from '../buttonBars/buttonBars'
import { getTopPage } from '../router/router'

type T_DisplayProviderProps = {
  proportionSize: number
  topPage: JSX.Element
  bottomPage: JSX.Element
  setIsSystem: React.Dispatch<React.SetStateAction<boolean>>
  setSystemMenu: React.Dispatch<React.SetStateAction<boolean>>
  systemMenu: boolean
  showSystems: boolean
  setShowSystems: React.Dispatch<React.SetStateAction<boolean>>
}

const DisplayProvider: React.FC<T_DisplayProviderProps> = (props: T_DisplayProviderProps): JSX.Element => {
  // const resizePerportion: number = props.porportionSize
  /**
   * we need to resize the components in some combinations,
   * this will be done automatically by flexbox unless we need to do it maually (thats why this prop is here)
   */

  const [systemMenu, setSystemMenu] = React.useState<boolean>(false)

  return (
    <div className="MFD-container">
      <UpperButtonBar
        setShowSystems={props.setShowSystems}
        showSystems={props.showSystems}
        setSystemMenu={setSystemMenu}
        systemMenu={systemMenu}
        currentPage={getTopPage()}
      />
      <div className="upper-content-container">
        <SystemButtonBar
          isShown={systemMenu}
          setShown={setSystemMenu}
          text={['Status', 'Flight Ctrl', 'Hydraulics', 'Fuel', 'Electrical', 'ECS', 'Anti-Ice']}
        />
        {props.topPage}
      </div>
      <div className="center-divider" />
      <div className="lower-content-container">{props.bottomPage}</div>
      <LowerButtonBar />
    </div>
  )
}

export default DisplayProvider
