import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'
import Colors from 'instruments/common/util/Colors'
import { type PFDSimvars } from '../PFDSimVarPublisher'

type OverspeedTapeProps = ComponentProps & {
  bus: EventBus
  minSpeed: number
  maxSpeed: number
  stretch: number
}

export class OverspeedTape extends DisplayComponent<OverspeedTapeProps> {
  private readonly overspdRef = FSComponent.createRef<SVGGElement>()

  private onGround: boolean

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node)

    const sub = this.props.bus.getSubscriber<PFDSimvars>()

    sub
      .on('onGround')
      .whenChanged()
      .handle((onGround) => {
        this.onGround = onGround
      })

    sub
      .on('overspeed')
      .whenChanged()
      .handle((overspd) => {
        if (!this.onGround) {
          const overspdPosition =
            (this.props.maxSpeed - overspd) * this.props.stretch +
            this.props.minSpeed * this.props.stretch -
            this.props.minSpeed

          this.overspdRef.instance.setAttribute('height', `${overspdPosition}`)
        }
      })
  }

  public render(): VNode {
    return (
      <g id="OBP">
        <defs>
          <pattern id="diagonal" width={5} height={10} patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1={0} y1={0} x2={0} y2={10} stroke={Colors.RED} stroke-width={5} />
            <line x1={5} y1={0} x2={5} y2={10} stroke="white" stroke-width={5} />
          </pattern>
        </defs>
        <rect x={73} y={this.props.minSpeed * 2} width={7} height={0} fill="url(#diagonal)" ref={this.overspdRef} />
      </g>
    )
  }
}
