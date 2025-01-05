import React, { useState } from 'react'
import './index.scss'
import { render } from '../../common/Hooks'
import { Mouse } from './components/mouse/mouse'
import MfdRouter from './components/router/router'
import DisplayProvider from './components/displayProvider/displayProvider'

export const MultifunctionDisplayContent = (): JSX.Element => {
  const [isSystem, setIsSystem] = useState<boolean>(false)
  const [systemMenu, setSystemMenu] = useState<boolean>(false)
  const [showSystems, setShowSystems] = useState<boolean>(false)

  // going to store the flight plan in the MFD's state for now, since we dont have a working mcdu we will manually input waypoints

  return (
    <div>
      <Mouse />

      <DisplayProvider
        systemMenu={systemMenu}
        setSystemMenu={setSystemMenu}
        showSystems={showSystems}
        setShowSystems={setShowSystems}
        proportionSize={0}
        topPage={MfdRouter(true, showSystems)}
        setIsSystem={setIsSystem}
        bottomPage={MfdRouter(false, false)}
      />
    </div>
  )
}

render(<MultifunctionDisplayContent />)
