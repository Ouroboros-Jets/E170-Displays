import React from 'react'
import './index.scss'
import { render } from '../../common/Hooks'
import { Mouse } from './components/mouse/mouse'
import MfdRouter from './components/router/router'
import DisplayProvider from './components/displayProvider/displayProvider'
import { AutoReversionary, getDisplayState, cDisplayFaulureState } from 'instruments/common/Reversionary/Reversionary'
import { PrimaryFlightDisplayContent } from '../PrimaryFlightDisplay'
import { EngineIndicatingAndCrewAlertingSystem } from '../EngineIndicatingAndCrewAlertingSystem'

// we need to create seperate variables for left and right MFDs

export const MultifunctionDisplayContent = (): JSX.Element => {
  const [isSystem, setIsSystem] = React.useState<boolean>(false)
  const [systemMenu, setSystemMenu] = React.useState<boolean>(false)
  const [showSystems, setShowSystems] = React.useState<boolean>(false)
  return (
    <div>
      <Mouse />
      <DisplayProvider
        systemMenu={systemMenu}
        setSystemMenu={setSystemMenu}
        showSystems={showSystems}
        setShowSystems={setShowSystems}
        porportionSize={0}
        topPage={MfdRouter(true, showSystems)}
        setIsSystem={setIsSystem}
        bottomPage={MfdRouter(false, false)}
      />
    </div>
  )
}

const MfdState = getDisplayState('MFD', cDisplayFaulureState)

const MFD = (): JSX.Element => {
  const displayStates = AutoReversionary(cDisplayFaulureState)
  switch (displayStates[1]) {
    case 'PFD':
      return <PrimaryFlightDisplayContent />
    case 'PFD2':
      return <div> PFD2 </div>
    case 'MFD':
      return <MultifunctionDisplayContent />
    case 'MFD2':
      return <div> MFD2 </div>
    case 'EICAS':
      return <EngineIndicatingAndCrewAlertingSystem />
    case 'FAILED':
      return <></>
    default:
      return <></>
  }
}

render(<MFD />)
