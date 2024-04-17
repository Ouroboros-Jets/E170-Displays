import './index.scss'
import { FSComponent, DisplayComponent, type VNode, type EventBus, type ComponentProps } from '@microsoft/msfs-sdk'
import Attitude from './Components/AttitudeDisplay'
import Altitude from './Components/Altitude'
import Airspeed from './Components/Airspeed'
import Compass from './Components/Compass'
import GspdIndicator from './Components/Groundspeed'
import LockHdgIndicator from './Components/LockHeading'
import VerticalSpeedIndicator from './Components/VerticalSpeed'
import Radio from './Components/Radio'
import HeadingSourceAnnunciator from './Components/HeadingSourceAnnunciator'
import NavSourceAnnunciator from './Components/NavSourcAnnunciatior'

type PFDProps = ComponentProps & {
  bus: EventBus
}

export class PFDRoot extends DisplayComponent<PFDProps> {
  public render(): VNode {
    return (
      <>
        <svg viewBox="0 0 600 460">
          <Attitude bus={this.props.bus} />
          <Altitude bus={this.props.bus} />
          <Airspeed bus={this.props.bus} />
          <VerticalSpeedIndicator bus={this.props.bus} />
        </svg>

        <svg viewBox="0 0 600 340">
          <GspdIndicator bus={this.props.bus} />
          <LockHdgIndicator bus={this.props.bus} />
          <HeadingSourceAnnunciator bus={this.props.bus} />
          <NavSourceAnnunciator bus={this.props.bus} />
          <Compass bus={this.props.bus} />
          <Radio bus={this.props.bus} />
        </svg>
      </>
    )
  }
}
