import React from 'react'
import './index.scss'
import { render } from '../../common/Hooks'
import { Mouse } from './components/mouse/mouse'
import MfdRouter from './components/router/router'
import DisplayProvider from './components/displayProvider/displayProvider'

const MultifunctionDisplay = (): JSX.Element => {
  return (
    <div>
      <Mouse />
      <DisplayProvider porportionSize={0} topPage={MfdRouter(true)} bottomPage={MfdRouter(false)} />
    </div>
  )
}

render(<MultifunctionDisplay />)
