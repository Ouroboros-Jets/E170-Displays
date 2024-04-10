import './index.scss'
import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'
import { AirspeedTape } from './AirspeedTape'
import CurrentAirspeedBox from './CurrentAirspeedBox'
import { SelectedAirspeedBox } from './SelectedAirspeedBox'

type AirspeedProps = ComponentProps & {
  bus: EventBus
}

class Airspeed extends DisplayComponent<AirspeedProps> {
  public render(): VNode {
    return (
      <g>
        <AirspeedTape bus={this.props.bus} />
        <SelectedAirspeedBox bus={this.props.bus} />
        <CurrentAirspeedBox bus={this.props.bus} />
      </g>
    )
  }
}

export default Airspeed
