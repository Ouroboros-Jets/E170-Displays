import { type EventBus, type SimVarDefinition, SimVarValueType, SimVarPublisher } from '@microsoft/msfs-sdk'

export type PFDSimvars = {
  pitch: number
  bank: number
  altitude: number
  airspeed: number
  heading: number
  ground_speed: number
  heading_lock: number
  vertical_speed: number
}

export enum PFDVars {
  pitch = 'PLANE PITCH DEGREES',
  bank = 'PLANE BANK DEGREES',
  altitude = 'INDICATED ALTITUDE',
  airspeed = 'AIRSPEED INDICATED',
  heading = 'PLANE HEADING DEGREES MAGNETIC',
  ground_speed = 'GROUND VELOCITY',
  heading_lock = 'AUTOPILOT HEADING LOCK DIR',
  vertical_speed = 'VERTICAL SPEED'
}

export class PFDSimvarPublisher extends SimVarPublisher<PFDSimvars> {
  private static readonly simvars = new Map<keyof PFDSimvars, SimVarDefinition>([
    ['pitch', { name: PFDVars.pitch, type: SimVarValueType.Degree }],
    ['bank', { name: PFDVars.bank, type: SimVarValueType.Degree }],
    ['altitude', { name: PFDVars.altitude, type: SimVarValueType.Feet }],
    ['airspeed', { name: PFDVars.airspeed, type: SimVarValueType.Knots }],
    ['heading', { name: PFDVars.heading, type: SimVarValueType.Degree }],
    ['ground_speed', { name: PFDVars.ground_speed, type: SimVarValueType.Knots }],
    ['heading_lock', { name: PFDVars.heading_lock, type: SimVarValueType.Degree }],
    ['vertical_speed', { name: PFDVars.vertical_speed, type: SimVarValueType.Feet }]
  ])

  public constructor(bus: EventBus) {
    super(PFDSimvarPublisher.simvars, bus)
  }
}
