import Colors from 'instruments/common/util/Colors'
import type { PFDSimvars } from '../PFDSimVarPublisher'
import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'

type T_LockHdgIndicator = ComponentProps & {
  bus: EventBus
}

export default class LockHdgIndicator extends DisplayComponent<T_LockHdgIndicator> {
  private readonly hdgRef = FSComponent.createRef<SVGTextElement>()

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node)

    const sub = this.props.bus.getSubscriber<PFDSimvars>()
    sub
      .on('heading_lock')
      .whenChanged()
      .handle((hdg) => {
        this.hdgRef.instance.textContent = hdg.toString().padStart(3, '0')
      })
  }

  public render(): VNode {
    return (
      <g transform="translate(120, 20)">
        <text x={0} y={0} text-anchor="middle" font-size={17} fill="white">
          HDG
        </text>
        <text
          x={-1}
          y={24}
          text-anchor="middle"
          font-size={25}
          fill={Colors.CYAN}
          ref={this.hdgRef}
          letter-spacing={-4}
        >
          000
        </text>
      </g>
    )
  }
}
