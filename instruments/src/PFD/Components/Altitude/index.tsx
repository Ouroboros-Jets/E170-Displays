import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'
import { AltitudeTape } from './AltitudeTape'
import { SelectedAltitudeBox } from './SelectedAltitudeBox'
import { BaroSettingBox } from './BaroSettingBox'
import CurrentAltitudeBox from './CurrentAltitudeBox'
import { TrendVector } from './TrendVector'

type AltitudeProps = ComponentProps & {
  bus: EventBus
}

class Altitude extends DisplayComponent<AltitudeProps> {
  render(): VNode {
    return (
      <g>
        <rect x="455" y="57" width="82" height="361" fill="#000" opacity={0.3} />
        <AltitudeTape bus={this.props.bus} />
        <SelectedAltitudeBox bus={this.props.bus} />
        <CurrentAltitudeBox bus={this.props.bus} />
        <BaroSettingBox bus={this.props.bus} />
        <TrendVector bus={this.props.bus} />
      </g>
    )
  }
}

export default Altitude
