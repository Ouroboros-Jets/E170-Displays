import Colors from 'instruments/common/util/Colors'
import type { PFDSimvars } from '../PFDSimVarPublisher'
import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'

type T_LockHdgIndicator = ComponentProps & {
  bus: EventBus
}

export default class LockHdgIndicator extends DisplayComponent<T_LockHdgIndicator> {
  heading = 0

  private readonly hdgRef = FSComponent.createRef<SVGElement>()

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node)

    const sub = this.props.bus.getSubscriber<PFDSimvars>()
    sub
      .on('heading')
      .whenChanged()
      .handle((hdg) => {
        this.heading = hdg
      })

    sub.on('heading_lock').handle((hdg) => {
      this.hdgRef.instance?.setAttribute('transform', `translate(275, 188) rotate(${(-this.heading + hdg) % 360})`)
    })
  }

  public render(): VNode {
    return (
      <g transform="translate(275, 188) rotate(0)" ref={this.hdgRef}>
        <g transform="translate(0, -128)">
          <path
            d="M 0 -1 L -15 -1 L -15 -10 L -9 -10 L 0 -3 L 9 -10 L 15 -10 L 15 -1 L 0 -1"
            fill={Colors.CYAN}
            stroke-width={2}
            stroke={Colors.CYAN}
            stroke-linecap="round"
          />
        </g>
      </g>
    )
  }
}
