import React from 'react'
import { render } from 'instruments/common/Hooks'
import { ComponentProvider } from './Components/ComponentProvider/ComponentProvider'
import './index.scss'
import { useObjLocalVar } from 'instruments/common/Hooks/simVars'
import { AutoReversionary, getDisplayState, cDisplayFaulureState } from 'instruments/common/Reversionary/Reversionary'
import { PrimaryFlightDisplayContent } from '../PrimaryFlightDisplay'
import { MultifunctionDisplayContent } from '../MultifunctionDisplay'

// eslint-disable-next-line react-refresh/only-export-components
export const EngineIndicatingAndCrewAlertingSystem = (): JSX.Element => {
  const [declutter] = useObjLocalVar('EICAS_DECLUTTER', 'bool')
  return (
    <div id="EICAS_ROOT">
      <ComponentProvider declutter={declutter} />
    </div>
  )
}

const EicasState = getDisplayState('EICAS', cDisplayFaulureState)

const EICAS = (): JSX.Element => {
  const displayStates = AutoReversionary(cDisplayFaulureState)
  switch (displayStates[2]) {
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

render(EicasState ? <></> : <EICAS />)
