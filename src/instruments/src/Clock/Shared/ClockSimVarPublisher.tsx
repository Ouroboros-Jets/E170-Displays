import { EventBus, SimVarDefinition, SimVarValueType, SimVarPublisher } from '@microsoft/msfs-sdk';

export interface ClockSimVars {
  absTime: number;
  timeOfDay: number;
  currentUTC: number;
  dayOfMonth: number;
  monthOfYear: number;
  year: number;
  clockPowered: boolean;
}

export enum ClockVars {
  absTime = 'E:ABSOLUTE TIME',
  timeOfDay = 'E:TIME OF DAY',
  currentUTC = 'E:ZULU TIME',
  dayOfMonth = 'E:ZULU DAY OF MONTH',
  monthOfYear = 'E:ZULU MONTH OF YEAR',
  year = 'E:ZULU YEAR',
  clockPowered = 'L:OBJ_E170_CLOCK_POWERED',
}

export class ClockSimVarPublisher extends SimVarPublisher<ClockSimVars> {
  private static simvars = new Map<keyof ClockSimVars, SimVarDefinition>([
    ['absTime', { name: ClockVars.absTime, type: SimVarValueType.Number }],
    ['timeOfDay', { name: ClockVars.timeOfDay, type: SimVarValueType.Enum }],
    ['currentUTC', { name: ClockVars.currentUTC, type: SimVarValueType.Number }],
    ['dayOfMonth', { name: ClockVars.dayOfMonth, type: SimVarValueType.Number }],
    ['monthOfYear', { name: ClockVars.monthOfYear, type: SimVarValueType.Number }],
    ['year', { name: ClockVars.year, type: SimVarValueType.Number }],
    ['clockPowered', { name: ClockVars.clockPowered, type: SimVarValueType.Bool }],
  ]);

  public constructor(bus: EventBus) {
    super(ClockSimVarPublisher.simvars, bus);
  }
}
