import './Attitude.scss'
import { AttitudeForeground } from './AttitudeForeground'
import { AttitudeMarkers } from './Markers'
import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'

type AttitudeProps = ComponentProps & {
  bus: EventBus
}

export class Attitude extends DisplayComponent<AttitudeProps> {
  public render(): VNode {
    return (
      <div class="attitude-continer">
        <svg class="attitude-svg" viewBox="0 0 600 460" width="100%" height="100%">
          <AttitudeForeground bus={this.props.bus} />
          <AttitudeMarkers />
          <text x="100" y="100" font-size="20" fill="white" text-anchor="middle"></text>
        </svg>
      </div>
    )
  }
}
