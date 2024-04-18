import Colors from 'instruments/common/util/Colors'
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
      .handle((spd) => {
        if (spd > 999) {
          this.grndSpdRef.instance.textContent = '999'
          return
        }

        if (spd < -99) {
          this.grndSpdRef.instance.textContent = '-99'
          return
        }

        this.grndSpdRef.instance.textContent = Math.round(spd).toString()
      })
  }

  public render(): VNode {
    return (
      <g transform="translate(35, 20)">
        <text x={0} y={0} text-anchor="middle" font-size={17} fill="white" letter-spacing={-1}>
          GSPD
        </text>
        <text
          x={-17}
          y={18}
          text-anchor="middle"
          font-size={17}
          fill={Colors.GREEN}
          ref={this.grndSpdRef}
          letter-spacing={-2}
        >
          0
        </text>
        <text x={0} y={18} text-anchor="right" font-size={17} fill="white" letter-spacing={-2}>
          KT
        </text>
      </g>
    )
  }
}
