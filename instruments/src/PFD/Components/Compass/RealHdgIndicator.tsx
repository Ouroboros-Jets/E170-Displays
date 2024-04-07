import type { PFDSimvars } from '../PFDSimVarPublisher'
import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'

type T_RealHdgIndicator = ComponentProps & {
  bus: EventBus
}

export default class RealHdgIndicator extends DisplayComponent<T_RealHdgIndicator> {
  private readonly hdgRef = FSComponent.createRef<SVGTextElement>()

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node)

    const sub = this.props.bus.getSubscriber<PFDSimvars>()
    sub
      .on('heading')
      .whenChanged()
      .handle((alt) => {
        this.hdgRef.instance.textContent = alt.toString().padStart(3, '0')
      })
  }

  public render(): VNode {
    return (
      <g transform="translate(275, 42.5)">
        <text ref={this.hdgRef} text-anchor="middle" font-size={25} fill="#04E304">
          000
        </text>
        <path
          d="M 0 12.5 L 8.5 5 L 25 5 L 25 -20 M 0 12.5 L -8.5 5 L -25 5 L -25 -20"
          fill="transparent"
          stroke-width={3}
          stroke="white"
          stroke-linecap="round"
        />
      </g>
    )
  }
}
