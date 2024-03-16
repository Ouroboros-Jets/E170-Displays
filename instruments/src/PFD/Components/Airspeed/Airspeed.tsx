import './airspeed.scss'
import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'
import { AirspeedTape } from './AirspeedTape'

type AirspeedProps = ComponentProps & {
  bus: EventBus
}

export class Airspeed extends DisplayComponent<AirspeedProps> {
  public render(): VNode {
    return (
      <div>
        <AirspeedTape bus={this.props.bus} />
      </div>
    )
  }
}
