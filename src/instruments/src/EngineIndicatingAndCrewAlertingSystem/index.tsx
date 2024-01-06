import React from 'react'
import { render } from 'instruments/common/Hooks'
import { ComponentProvider } from './Components/ComponentProvider/ComponentProvider'
import './index.scss'
import { useObjLocalVar } from 'instruments/common/Hooks/simVars'

// eslint-disable-next-line react-refresh/only-export-components
const EngineIndicatingAndCrewAlertingSystem = (): JSX.Element => {
  const [declutter] = useObjLocalVar('EICAS_DECLUTTER', 'bool')
  return (
    <div id="EICAS_ROOT">
      <ComponentProvider declutter={declutter} />
    </div>
  )
}

render(<EngineIndicatingAndCrewAlertingSystem />)
