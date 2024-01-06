import './index.scss'
import React from 'react'
import { IESRoot } from './components/root'
import { render } from '../../common/Hooks'

// eslint-disable-next-line react-refresh/only-export-components
const IntegratedElectronicStandby = (): JSX.Element => {
  const [isAligned, setIsAligned] = React.useState<boolean>(false)
  React.useEffect(() => {
    setTimeout(() => {
      setIsAligned(true)
    }, 4000)
  }, [])

  return (
    <div>
      <IESRoot isAligning={isAligned} />
    </div>
  )
}

render(<IntegratedElectronicStandby />)
