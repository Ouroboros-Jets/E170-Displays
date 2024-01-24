import { type Dispatch, type SetStateAction } from 'react'

type T_HydraulicPumpArgs = {
  isRunning: boolean
  p: number
  sP: Dispatch<SetStateAction<number>>
  dT: number
}

// every time we call for a pump update we need to feed a delta time to figure out how much fluid has been pumped

export const hydraulicPump = (args: T_HydraulicPumpArgs): void => {
  // Pump specifications
  const ratedFlowRate = 3.7 // in gallons per minute also exerts 3.7 pounds-force
  const maxPressure = 2700 // in PSI

  // Motor specifications
  const inletPressure = 50 // in PSI
  const minMotorVoltage = 115 // in volts
  const maxMotorVoltage = 200 // in volts
  const motorFrequency = 400 // in hertz

  const updatePump = (): void => {
    // Update pressure based on pump flow rate and time
    const newPressure = (ratedFlowRate / 60) * args.dT + args.p
    args.sP(Math.round(newPressure))
  }

  if (args.isRunning) {
    // Check if the pump is within the specified pressure limit
    if (args.p < maxPressure) {
      updatePump()
    }
  }
}
