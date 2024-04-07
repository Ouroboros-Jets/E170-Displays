import { FSComponent, DisplayComponent, type VNode, type EventBus, type ComponentProps } from '@microsoft/msfs-sdk'
import './index.scss'
import { Attitude } from './Components/AttitudeDisplay/AttitudeDisplay'
import { Altitude } from './Components/Altitude/Altitude'
import { Airspeed } from './Components/Airspeed/Airspeed'
import Compass from './Components/Compass'
import GspdIndicator from './Components/GspdIndicator'
import LockHdgIndicator from './Components/LockHdgIndicator'

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
        <div class="bottom-component">
          <svg viewBox="0 0 600 800">
            <GspdIndicator bus={this.props.bus} />
            <LockHdgIndicator bus={this.props.bus} />
            <Compass bus={this.props.bus} />
          </svg>
        </div>
      </div>
    )
  }
}
