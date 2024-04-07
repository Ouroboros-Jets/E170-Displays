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
      .on('lock_heading')
      .whenChanged()
      .handle((alt) => {
        this.hdgRef.instance.setAttribute('transform', `translate(275, 188) rotate(${alt})`)
      })
  }

  public render(): VNode {
    return (
      <g transform="translate(275, 188) rotate(0)">
        <g transform="translate(0, -128)">
          <path
            d="M 0 -1 L -15 -1 L -15 -10 L -9 -10 L 0 -3 L 9 -10 L 15 -10 L 15 -1 L 0 -1"
            fill="#00FEFE"
            stroke-width={2}
            stroke="#00FEFE"
            stroke-linecap="round"
          />
        </g>
      </g>
    )
  }
}
