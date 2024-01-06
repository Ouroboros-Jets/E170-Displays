import React from 'react'
import { render } from 'instruments/common/Hooks'
import './index.scss'
import { PFDProvider } from './components/pfdProvider/pfdProvider'

/**
 * some insight to the PFD and how we are going to address reversionary modes
 *
 * first off, the PFD, MFD, and EICAS are all going to be exported from their respective folders then we will have a root folder as a entry point for each physical display in the cockpit
 * there shouldnt be much performance issues with this as only one display will be rendered at a time.
 * Known issues that will need to be addressed:
 * - State management, we dont want to store state in sim vars as that will cause mirroring issues (which we may want for some things) but for the most part we want to keep state in the instrument if it allows
 *
 */

// eslint-disable-next-line react-refresh/only-export-components
const PrimaryFlightDisplay = (): JSX.Element => {
  return (
    <div id="PFD-ROOT">
      <PFDProvider />
    </div>
  )
}

render(<PrimaryFlightDisplay />)
