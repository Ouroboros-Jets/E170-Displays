import './index.scss'
import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'
import { AirspeedTape } from './AirspeedTape'
import CurrentAirspeedBox from './CurrentAirspeedBox'
import { SelectedAirspeedBox } from './SelectedAirspeedBox'
import { TrendVector } from './TrendVector'

const baselineInPx = 254
const stretch = 3
const minSpeedInKnots = 30
const maxSpeedInKnots = 940

type AirspeedProps = ComponentProps & {
  bus: EventBus
}

class Airspeed extends DisplayComponent<AirspeedProps> {
  public render(): VNode {
    return (
      <g>
        <AirspeedTape
          bus={this.props.bus}
          baseline={baselineInPx}
          stretch={stretch}
          minSpeed={minSpeedInKnots}
          maxSpeed={maxSpeedInKnots}
        />
        <SelectedAirspeedBox bus={this.props.bus} />
        <CurrentAirspeedBox bus={this.props.bus} />
        <TrendVector bus={this.props.bus} />
      </g>
    )
  }
}

export default Airspeed
