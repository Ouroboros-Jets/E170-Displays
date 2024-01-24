import React, { useEffect, type FC, useState } from 'react'
import { render } from 'Systems/common/Hooks'
import './index.scss'
import { hydraulicPump } from 'Systems/src/Hydraulic/HydraulicPump/HydraulicPump'

const Systems: FC = (): JSX.Element => {
  const [pressure, setPressure] = useState(0)
  const [pump, setPump] = useState(false)
  useEffect(() => {
    console.log('Systems is mounted')

    let lastUpdate = Date.now()

    const simulationInterval = setInterval(() => {
      const now = Date.now()
      const dt = now - lastUpdate
      lastUpdate = now
      hydraulicPump({ isRunning: pump, p: pressure, sP: setPressure, dT: dt })
    }, 200)

    return () => {
      clearInterval(simulationInterval)
    }
  }, [pump, pressure])

  return (
    <div className="systems">
      <div
        onClick={() => {
          setPump(!pump)
        }}
      >
        turn pump on/off
      </div>
      <div>
        {pressure} and {pump.toString()}
      </div>
    </div>
  )
}

render(<Systems />)
