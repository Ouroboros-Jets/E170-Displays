import { FSComponent, DisplayComponent, type VNode, type EventBus, type ComponentProps } from '@microsoft/msfs-sdk'
import { type PFDSimvars } from '../PFDSimVarPublisher'
import Colors from 'instruments/common/util/Colors'

type SelectedAltitudeBoxProps = ComponentProps & {
  bus: EventBus
}

export class SelectedAltitudeBox extends DisplayComponent<SelectedAltitudeBoxProps> {
  altitudeSelectedRef1 = FSComponent.createRef<SVGElement>()
  altitudeSelectedRef2 = FSComponent.createRef<SVGElement>()

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node)

    const sub = this.props.bus.getSubscriber<PFDSimvars>()
    sub
      .on('altitude_selected')
      .whenChanged()
      .handle((alt) => {
        this.altitudeSelectedRef1.instance.textContent = alt.toString().substring(0, 3).padStart(3, '0')
        this.altitudeSelectedRef2.instance.textContent = alt.toString().substring(3).padStart(2, '0')
      })
  }

  public render(): VNode {
    return (
      <g>
        <rect x="455" y="55" rx={2} ry={2} width="83" height="33" stroke="white" stroke-width={2} fill="transparent" />
        <text ref={this.altitudeSelectedRef1} x={484} y={82} text-anchor="middle" fill={Colors.CYAN} font-size="30" />
        <text ref={this.altitudeSelectedRef2} x={522} y={82} text-anchor="middle" fill={Colors.CYAN} font-size="20" />
      </g>
    )
  }
}
