import { FSComponent, DisplayComponent, type VNode, type ComponentProps } from '@microsoft/msfs-sdk'
import { E_AirspeedTypes } from './airspeedTypes'

type SelectedAirspeedBoxProps = ComponentProps & {
  selectedAirspeed: number
  mach: boolean
  mode: E_AirspeedTypes
}

export class SelectedAirspeedBox extends DisplayComponent<SelectedAirspeedBoxProps> {
  invalidOutput: string = '---'

  getString = (): { element: JSX.Element; color: string } => {
    switch (this.props.mode) {
      case E_AirspeedTypes.FMS:
        return {
          element: (
            <tspan>
              {this.props.selectedAirspeed}
              {this.props.mach ? (
                <tspan fill="white" font-size={14}>
                  M
                </tspan>
              ) : (
                ''
              )}
            </tspan>
          ),
          color: 'magenta'
        }
      case E_AirspeedTypes.MAN:
        return {
          element: (
            <tspan>
              {this.props.selectedAirspeed}
              {this.props.mach ? (
                <tspan fill="white" font-size={14}>
                  M
                </tspan>
              ) : (
                ''
              )}
            </tspan>
          ),
          color: 'cyan'
        }
      case E_AirspeedTypes.INOP:
        return { element: <tspan>{this.invalidOutput}</tspan>, color: 'yellow' }
    }
  }

  public render(): VNode {
    return (
      <g>
        <rect x={1} y={1} rx={2} ry={2} width={80} height={33} stroke-width={2} fill="transparent" stroke="white" />
        <text x={41} y={28} text-anchor="middle" fill={this.getString().color} font-size="30">
          {this.getString().element}
        </text>
      </g>
    )
  }
}
