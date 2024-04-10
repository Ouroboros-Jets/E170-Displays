import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'
import Colors from 'instruments/common/util/Colors'
import { type PFDSimvars } from '../PFDSimVarPublisher'

type SelectedAirspeedBoxProps = ComponentProps & {
  bus: EventBus
}

export class SelectedAirspeedBox extends DisplayComponent<SelectedAirspeedBoxProps> {
  airspeedSelectedRef = FSComponent.createRef<SVGTextElement>()

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node)

    const sub = this.props.bus.getSubscriber<PFDSimvars>()
    sub
      .on('airspeed_selected')
      .whenChanged()
      .handle((ias) => {
        this.airspeedSelectedRef.instance.textContent = ias.toString()
      })
  }

  public render(): VNode {
    return (
      <g>
        <rect x={1} y={53} rx={2} ry={2} width={80} height={33} stroke-width={2} fill="transparent" stroke="white" />
        <text ref={this.airspeedSelectedRef} x={41} y={82} text-anchor="middle" fill={Colors.PINK} font-size="30" />
      </g>
    )
  }
}
