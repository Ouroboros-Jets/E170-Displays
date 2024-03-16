import { FSComponent, DisplayComponent, type VNode, type EventBus, type ComponentProps } from '@microsoft/msfs-sdk'
import './pfdRoot.scss'
import '../index.css'
import { Attitude } from '../Components/AttitudeDisplay/AttitudeDisplay'
import { Altitude } from '../Components/Altitude/Altitude'
import { Airspeed } from '../Components/Airspeed/Airspeed'

type PFDProps = ComponentProps & {
  bus: EventBus
}

export class PFDRoot extends DisplayComponent<PFDProps> {
  public render(): VNode {
    return (
      <div class="PFD-ROOT">
        <div class="top-component">
          <Attitude bus={this.props.bus} />
          <Altitude bus={this.props.bus} />
          <div>fma</div>
          <Airspeed bus={this.props.bus} />
        </div>
        <div class="bottom-component">bottom</div>
      </div>
    )
  }
}
