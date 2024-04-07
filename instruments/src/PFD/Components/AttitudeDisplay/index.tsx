import './index.scss'
import { AttitudeForeground } from './AttitudeForeground'
import { AttitudeMarkers } from './Markers'
import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'

type AttitudeProps = ComponentProps & {
  bus: EventBus
}

class Attitude extends DisplayComponent<AttitudeProps> {
  public render(): VNode {
    return (
      <g>
        <AttitudeForeground bus={this.props.bus} />
        <AttitudeMarkers />
        <text x="100" y="100" font-size="20" fill="white" text-anchor="middle"></text>
      </g>
    )
  }
}

export default Attitude
