import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'
import AutoThrottleMode from './AutoThrottleMode'
import AutopilotStatus from './AutopilotStatus'
import AutoThrottleStatus from './AutoThrottleStatus'
import SourceSelection from './SourceSelection'
import LateralMode from './LateralMode'
import VerticalMode from './VerticalMode'

type FlightModeAnnunciatorsProps = ComponentProps & {
  bus: EventBus
}

class FlightModeAnnunciators extends DisplayComponent<FlightModeAnnunciatorsProps> {
  public render(): VNode {
    return (
      <g>
        <AutoThrottleMode />
        <AutopilotStatus />
        <AutoThrottleStatus />
        <SourceSelection bus={this.props.bus} />
        <LateralMode />
        <VerticalMode />
      </g>
    )
  }
}

export default FlightModeAnnunciators
