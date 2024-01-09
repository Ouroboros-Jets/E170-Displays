import React from 'react'
import './index.scss'
import { render } from '../../common/Hooks'
import { Mouse } from './components/mouse/mouse'
import MfdRouter from './components/router/router'
import DisplayProvider from './components/displayProvider/displayProvider'

const MultifunctionDisplay = (): JSX.Element => {
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

render(<MultifunctionDisplay />)
