import { type EventBus, type SimVarDefinition, SimVarValueType, SimVarPublisher } from '@microsoft/msfs-sdk'

export type PFDSimvars = {
  pitch: number
  bank: number
  altitude: number
  indicated_airspeed: number
  heading: number
  ground_speed: number
  heading_lock: number
  vertical_speed: number
  airspeed_selected: number
  altitude_selected: number
  barometric_setting: number
  barometric_std: boolean
  true_airspeed: number
  acceleration_z: number
  nav_frequency: string
  nav_standby_frequency: string
  com_frequency: string
  com_standby_frequency: string
}

export enum PFDVars {
  pitch = 'PLANE PITCH DEGREES',
  bank = 'PLANE BANK DEGREES',
  altitude = 'INDICATED ALTITUDE',
  indicated_airspeed = 'AIRSPEED INDICATED',
  heading = 'PLANE HEADING DEGREES MAGNETIC',
  ground_speed = 'GROUND VELOCITY',
  heading_lock = 'AUTOPILOT HEADING LOCK DIR',
  vertical_speed = 'VERTICAL SPEED',
  airspeed_selected = 'L:OBJ_AP_SELECTED_AS',
  altitude_selected = 'AUTOPILOT ALTITUDE LOCK VAR',
  barometric_setting = 'KOHLSMAN SETTING HG',
  barometric_std = 'KOHLSMAN SETTING STD',
  true_airspeed = 'AIRSPEED TRUE',
  acceleration_z = 'ACCELERATION BODY Z',
  nav_frequency = 'NAV FREQUENCY',
  nav_standby_frequency = 'NAV STANDBY FREQUENCY:1',
  com_frequency = 'COM ACTIVE FREQUENCY:1',
  com_standby_frequency = 'COM STANDBY FREQUENCY:1'
}

export class PFDSimvarPublisher extends SimVarPublisher<PFDSimvars> {
  private static readonly simvars = new Map<keyof PFDSimvars, SimVarDefinition>([
    ['pitch', { name: PFDVars.pitch, type: SimVarValueType.Degree }],
    ['bank', { name: PFDVars.bank, type: SimVarValueType.Degree }],
    ['altitude', { name: PFDVars.altitude, type: SimVarValueType.Feet }],
    ['indicated_airspeed', { name: PFDVars.indicated_airspeed, type: SimVarValueType.Knots }],
    ['heading', { name: PFDVars.heading, type: SimVarValueType.Degree }],
    ['ground_speed', { name: PFDVars.ground_speed, type: SimVarValueType.Knots }],
    ['heading_lock', { name: PFDVars.heading_lock, type: SimVarValueType.Degree }],
    ['vertical_speed', { name: PFDVars.vertical_speed, type: SimVarValueType.Feet }],
    ['airspeed_selected', { name: PFDVars.airspeed_selected, type: SimVarValueType.Knots }],
    ['altitude_selected', { name: PFDVars.altitude_selected, type: SimVarValueType.Feet }],
    ['barometric_setting', { name: PFDVars.barometric_setting, type: SimVarValueType.InHG }],
    ['barometric_std', { name: PFDVars.barometric_std, type: SimVarValueType.Bool }],
    ['true_airspeed', { name: PFDVars.true_airspeed, type: SimVarValueType.Knots }],
    ['acceleration_z', { name: PFDVars.acceleration_z, type: SimVarValueType.Feet }],
    ['nav_frequency', { name: PFDVars.nav_frequency, type: SimVarValueType.MHz }],
    ['nav_standby_frequency', { name: PFDVars.nav_standby_frequency, type: SimVarValueType.MHz }],
    ['com_frequency', { name: PFDVars.com_frequency, type: SimVarValueType.MHz }],
    ['com_standby_frequency', { name: PFDVars.com_standby_frequency, type: SimVarValueType.MHz }]
  ])

  public constructor(bus: EventBus) {
    super(PFDSimvarPublisher.simvars, bus)
  }
}
