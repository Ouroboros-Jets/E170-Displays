import { type EventBus, type SimVarDefinition, SimVarValueType, SimVarPublisher } from '@microsoft/msfs-sdk'

export type PFDSimvars = {
  pitch: number
  bank: number
}

export enum PFDVars {
  pitch = 'PLANE PITCH DEGREES',
  bank = 'PLANE BANK DEGREES'
}

export class PFDSimvarPublisher extends SimVarPublisher<PFDSimvars> {
  private static readonly simvars = new Map<keyof PFDSimvars, SimVarDefinition>([
    ['pitch', { name: PFDVars.pitch, type: SimVarValueType.Degree }],
    ['bank', { name: PFDVars.bank, type: SimVarValueType.Degree }]
  ])

  public constructor(bus: EventBus) {
    super(PFDSimvarPublisher.simvars, bus)
  }
}
