import type { PFDSimvars } from '../PFDSimVarPublisher'
import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'

type T_GspdIndicatorProps = ComponentProps & {
  bus: EventBus
}

export default class GspdIndicator extends DisplayComponent<T_GspdIndicatorProps> {
  private readonly grndSpdRef = FSComponent.createRef<SVGTextElement>()

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node)

    const sub = this.props.bus.getSubscriber<PFDSimvars>()
    sub
      .on('ground_speed')
      .whenChanged()
      .handle((alt) => {
        if (alt > 999) {
          this.grndSpdRef.instance.textContent = '999'
          return
        }

        if (alt < -99) {
          this.grndSpdRef.instance.textContent = '-99'
          return
        }

        this.grndSpdRef.instance.textContent = alt.toString()
      })
  }

  public render(): VNode {
    return (
      <g transform="translate(35, 20)">
        <text x={0} y={0} text-anchor="middle" font-size={17} fill="white">
          GSPD
        </text>
        <text x={-11} y={18} text-anchor="middle" font-size={17} fill="#04E304" ref={this.grndSpdRef}>
          0
        </text>
        <text x={0} y={18} text-anchor="right" font-size={17} fill="white">
          KT
        </text>
      </g>
    )
  }
}
