import './index.scss'
import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'
import { AirspeedTape } from './AirspeedTape'

type AirspeedProps = ComponentProps & {
  bus: EventBus
}

class Airspeed extends DisplayComponent<AirspeedProps> {
  public render(): VNode {
    return <AirspeedTape bus={this.props.bus} />
  }
}

export default Airspeed
