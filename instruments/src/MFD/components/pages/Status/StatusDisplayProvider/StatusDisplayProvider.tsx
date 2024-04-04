import React from 'react'
import './StatusDisplayProvider.scss'
import { StatusAircraft } from '../StatusAircraft'

const isE190 = false

type T_StatusDisplayProviderProps = {
  stats: {
    flight: string
    TAT: number
    SAT: number
    GW: number
    TimeH: number
    TimeM: number
  }
  Elec: {
    Bat1: number
    Bat2: number
  }
  Oil: {
    eng1Level: number
    eng2Level: number
  }
  Oxygen: number
  Brakes: {
    EmerAccu1: number
    EmerAccu2: number
    Temp1Ib: number
    Temp2Ib: number
    Temp1Ob: number
    Temp2Ob: number
  }
  doors: {
    fwdElectronics: boolean
    fwdService: boolean
    fwdEntry: boolean
    fwdBaggage: boolean
    // emergencyLeft?: boolean
    // emergencyRight?: boolean
    centralElectronics: boolean
    rearBaggage: boolean
    rearService: boolean
    rearEntry: boolean
    hydraulic: boolean
    refuel: boolean
  }
}

export const StatusDisplayProvider: React.FC<T_StatusDisplayProviderProps> = (
  props: T_StatusDisplayProviderProps
): JSX.Element => {
  return (
    <div>
      <div className="status-svg-container">
        <svg viewBox="0 0 600 455" width="100%" height="100%">
          <path d="M 300 0 L 300 455" stroke="white" strokeWidth={4} />

          {/* doors */}
          <g>
            {(props.doors.fwdEntry || props.doors.rearEntry) && (
              <text x={480} y={20} fill="red" fontSize={17}>
                PASSENGER
              </text>
            )}
            {(props.doors.fwdService || props.doors.rearService) && (
              <text x={480} y={40} fill="red" fontSize={17}>
                SERVICE
              </text>
            )}
            {(props.doors.fwdBaggage || props.doors.rearBaggage) && (
              <text x={480} y={60} fill="red" fontSize={17}>
                CARGO
              </text>
            )}
            {props.doors.refuel && (
              <text x={480} y={80} fill="yellow" fontSize={17}>
                FUELING
              </text>
            )}
            {props.doors.fwdElectronics && (
              <text x={480} y={100} fill="yellow" fontSize={17}>
                FWD EBAY
              </text>
            )}
            {props.doors.centralElectronics && (
              <text x={480} y={120} fill="yellow" fontSize={17}>
                CENTER EBAY
              </text>
            )}
            {props.doors.hydraulic && (
              <text x={480} y={140} fill="yellow" fontSize={17}>
                HYD
              </text>
            )}
          </g>
          <g>
            <rect
              width={12}
              height={12}
              x={444}
              y={114}
              fill={props.doors.fwdElectronics ? 'yellow' : 'lime'}
              stroke="black"
              strokeWidth={1}
              rx={2}
              ry={2}
            />

            <rect
              width={12}
              height={12}
              x={434}
              y={160}
              fill={props.doors.fwdEntry ? 'red' : 'lime'}
              stroke="black"
              strokeWidth={1}
              rx={2}
              ry={2}
            />

            <rect
              width={12}
              height={12}
              x={454}
              y={160}
              fill={props.doors.fwdService ? 'red' : 'lime'}
              stroke="black"
              strokeWidth={1}
              rx={2}
              ry={2}
            />

            <rect
              width={12}
              height={12}
              x={454}
              y={200}
              fill={props.doors.fwdBaggage ? 'red' : 'lime'}
              stroke="black"
              strokeWidth={1}
              rx={2}
              ry={2}
            />

            {isE190 && (
              <g>
                <rect width={12} height={12} x={434} y={255} fill="lime" stroke="black" strokeWidth={1} rx={2} ry={2} />

                <rect width={12} height={12} x={454} y={255} fill="lime" stroke="black" strokeWidth={1} rx={2} ry={2} />
              </g>
            )}

            <rect
              width={12}
              height={12}
              x={434}
              y={290}
              fill={props.doors.centralElectronics ? 'yellow' : 'lime'}
              stroke="black"
              strokeWidth={1}
              rx={2}
              ry={2}
            />

            <rect
              width={12}
              height={12}
              x={454}
              y={315}
              fill={props.doors.rearBaggage ? 'red' : 'lime'}
              stroke="black"
              strokeWidth={1}
              rx={2}
              ry={2}
            />

            <rect
              width={12}
              height={12}
              x={434}
              y={350}
              fill={props.doors.rearEntry ? 'red' : 'lime'}
              stroke="black"
              strokeWidth={1}
              rx={2}
              ry={2}
            />

            <rect
              width={12}
              height={12}
              x={454}
              y={350}
              fill={props.doors.rearService ? 'red' : 'lime'}
              stroke="black"
              strokeWidth={1}
              rx={2}
              ry={2}
            />

            <rect
              width={12}
              height={12}
              x={454}
              y={385}
              fill={props.doors.hydraulic ? 'yellow' : 'lime'}
              stroke="black"
              strokeWidth={1}
              rx={2}
              ry={2}
            />

            <g transform="rotate(23, 540, 271)">
              <rect
                width={12}
                height={12}
                x={534}
                y={265}
                fill={props.doors.refuel ? 'yellow' : 'lime'}
                stroke="black"
                strokeWidth={1}
                rx={2}
                ry={2}
              />
            </g>
          </g>
        </svg>
      </div>

      <div className="doors-status">
        DOORS
        <StatusAircraft width={350} />
      </div>
      <div>mm</div>
    </div>
  )
}
