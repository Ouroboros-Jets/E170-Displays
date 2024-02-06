import React from 'react'
import { StatusDisplayProvider } from './StatusDisplayProvider/StatusDisplayProvider'

export const Status = (): JSX.Element => {
  return (
    <StatusDisplayProvider
      stats={{ flight: 'SKW1001', TAT: 10, SAT: 10, GW: 10, TimeH: 10, TimeM: 10 }}
      Elec={{ Bat1: 27.6, Bat2: 27.7 }}
      Oil={{ eng1Level: 7, eng2Level: 7 }}
      Oxygen={1000}
      Brakes={{
        EmerAccu1: 10,
        EmerAccu2: 10,
        Temp1Ib: 10,
        Temp2Ib: 10,
        Temp1Ob: 10,
        Temp2Ob: 10
      }}
      doors={{
        fwdElectronics: true,
        fwdService: true,
        fwdEntry: true,
        fwdBaggage: true,
        centralElectronics: true,
        rearBaggage: true,
        rearService: true,
        rearEntry: true,
        hydraulic: true,
        refuel: true
      }}
    />
  )
}
