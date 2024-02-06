import React from 'react'
import { render } from 'instruments/common/Hooks'
import './index.scss'

// eslint-disable-next-line react-refresh/only-export-components
const Clock = (): JSX.Element => {
  return (
    <div>
      <h1>Clock</h1>
    </div>
  )
}

render(<Clock />)
