import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'
import ActiveAutoThrottleMode from './ActiveAutoThrottleMode'
import AutopilotStatus from './AutopilotStatus'
import AutoThrottleStatus from './AutoThrottleStatus'
import SourceSelection from './SourceSelection'
import ArmedAutoThrottleMode from './ArmedAutoThrottleMode'
import ActiveLateralMode from './ActiveLateralMode'
import ArmedLateralMode from './ArmedLateralMode'
import ActiveVerticalMode from './ActiveVerticalMode'
import ArmedVerticalMode from './ArmedVerticalMode'

type FlightModeAnnunciatorsProps = ComponentProps & {
  bus: EventBus
}

class FlightModeAnnunciators extends DisplayComponent<FlightModeAnnunciatorsProps> {
  public render(): VNode {
    return (
      <g>
        <ActiveAutoThrottleMode bus={this.props.bus} />
        <ArmedAutoThrottleMode bus={this.props.bus} />
        <AutopilotStatus bus={this.props.bus} />
        <AutoThrottleStatus bus={this.props.bus} />
        <SourceSelection bus={this.props.bus} />
        <ActiveLateralMode bus={this.props.bus} />
        <ArmedLateralMode bus={this.props.bus} />
        <ActiveVerticalMode bus={this.props.bus} />
        <ArmedVerticalMode bus={this.props.bus} />
      </g>
    )
  }
}

export default FlightModeAnnunciators
