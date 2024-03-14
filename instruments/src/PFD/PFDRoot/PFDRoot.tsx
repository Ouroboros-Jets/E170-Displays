import { FSComponent, DisplayComponent, type VNode, type EventBus, type ComponentProps } from '@microsoft/msfs-sdk'
import './pfdRoot.scss'
import '../index.css'
import { Attitude } from '../Components/AttitudeDisplay/AttitudeDisplay'

type PFDProps = ComponentProps & {
  bus: EventBus
}

export class PFDRoot extends DisplayComponent<PFDProps> {
  public render(): VNode {
    return (
      <div class="PFD-ROOT">
        <div class="top-component">
          <Attitude bus={this.props.bus} />
          <div>fma</div>
          <div>airspeed</div>
          <div>altitude</div>
        </div>
        <div class="bottom-component">bottom</div>
      </div>
    )
  }
}
