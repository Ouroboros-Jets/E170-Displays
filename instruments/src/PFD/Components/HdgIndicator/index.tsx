import type { PFDSimvars } from '../PFDSimVarPublisher'
import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'

type T_HdgIndicator = ComponentProps & {
  bus: EventBus
}

export default class HdgIndicator extends DisplayComponent<T_HdgIndicator> {
  private readonly hdgRef = FSComponent.createRef<SVGTextElement>()

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node)

    const sub = this.props.bus.getSubscriber<PFDSimvars>()
    sub
      .on('lock_heading')
      .whenChanged()
      .handle((alt) => {
        this.hdgRef.instance.textContent = alt.toString().padStart(3, '0')
      })
  }

  public render(): VNode {
    return (
      <g transform="translate(110, 20)">
        <text x={0} y={0} text-anchor="middle" font-size={17} fill="white">
          HDG
        </text>
        <text x={0} y={24} text-anchor="middle" font-size={25} fill="#00FEFE" ref={this.hdgRef}>
          000
        </text>
      </g>
    )
  }
}
