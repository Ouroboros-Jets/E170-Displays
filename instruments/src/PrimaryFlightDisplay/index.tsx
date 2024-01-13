import React from 'react'
import { render } from 'instruments/common/Hooks'
import './index.scss'
import { PFDProvider } from './components/pfdProvider/pfdProvider'
import { AutoReversionary, getDisplayState, cDisplayFaulureState } from 'instruments/common/Reversionary/Reversionary'
import { MultifunctionDisplayContent } from '../MultifunctionDisplay'
import { EngineIndicatingAndCrewAlertingSystem } from '../EngineIndicatingAndCrewAlertingSystem'

/**
 * some insight to the PFD and how we are going to address reversionary modes
 *
 * first off, the PFD, MFD, and EICAS are all going to be exported from their respective folders then we will have a root folder as a entry point for each physical display in the cockpit
 * there shouldnt be much performance issues with this as only one display will be rendered at a time.
 * Known issues that will need to be addressed:
 * - State management, we dont want to store state in sim vars as that will cause mirroring issues (which we may want for some things) but for the most part we want to keep state in the instrument if it allows
 *
 */

export const PrimaryFlightDisplayContent = (): JSX.Element => {
  return (
    <div id="PFD-ROOT">
      <PFDProvider />
    </div>
  )
}

const PfdState = getDisplayState('PFD', cDisplayFaulureState)

const PFD = (): JSX.Element => {
  const displayStates = AutoReversionary(cDisplayFaulureState)
  switch (displayStates[0]) {
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

render(PfdState ? <></> : <PFD />)
