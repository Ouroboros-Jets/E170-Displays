import './Altitude.scss'
import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'
import { AltitudeTape } from './AltitudeTape'
import { SelectedAltitudeBox } from './SelectedAltitudeBox'
import { BaroSettingBox } from './BaroSettingBox'

type AltitudeProps = ComponentProps & {
  bus: EventBus
}

export class Altitude extends DisplayComponent<AltitudeProps> {
  render(): VNode {
    return (
      <div class="altitude-continer">
        <svg class="altitude-svg" viewBox="0 0 120 422">
          <rect x="29" y="0" width="83" height="422" fill="#000" opacity={0.3} />
          <AltitudeTape bus={this.props.bus} />
          <SelectedAltitudeBox />
          <BaroSettingBox />
        </svg>
      </div>
    )
  }
}
