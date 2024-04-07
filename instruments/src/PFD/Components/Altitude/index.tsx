import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'
import { AltitudeTape } from './AltitudeTape'
import { SelectedAltitudeBox } from './SelectedAltitudeBox'
import { BaroSettingBox } from './BaroSettingBox'

type AltitudeProps = ComponentProps & {
  bus: EventBus
}

class Altitude extends DisplayComponent<AltitudeProps> {
  render(): VNode {
    return (
      <g transform="translate(426 28)">
        <rect x="29" y="0" width="83" height="422" fill="#000" opacity={0.3} />
        <AltitudeTape bus={this.props.bus} />
        <SelectedAltitudeBox />
        <BaroSettingBox />
      </g>
    )
  }
}

export default Altitude
