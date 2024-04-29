import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'
import { type PFDSimvars } from '../PFDSimVarPublisher'
import Colors from 'instruments/common/util/Colors'

type ActiveLateralModeProps = ComponentProps & {
  bus: EventBus
}

class ActiveLateralMode extends DisplayComponent<ActiveLateralModeProps> {
  private readonly activeLateralModeTextRef = FSComponent.createRef<SVGTextElement>()

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node)

    const sub = this.props.bus.getSubscriber<PFDSimvars>()

    sub
      .on('active_lateral_mode')
      .whenChanged()
      .handle((alm) => {
        switch (alm) {
          case 0: {
            this.activeLateralModeTextRef.instance.textContent = ''
            break
          }
          case 1: {
            this.activeLateralModeTextRef.instance.textContent = 'TRACK'
            this.activeLateralModeTextRef.instance.setAttribute('fill', Colors.GREEN)
            break
          }
          case 2: {
            this.activeLateralModeTextRef.instance.textContent = 'ROLL'
            this.activeLateralModeTextRef.instance.setAttribute('fill', Colors.GREEN)
            break
          }
          case 3: {
            this.activeLateralModeTextRef.instance.textContent = 'LOC'
            this.activeLateralModeTextRef.instance.setAttribute('fill', Colors.GREEN)
            break
          }
          case 4: {
            this.activeLateralModeTextRef.instance.textContent = 'BC'
            this.activeLateralModeTextRef.instance.setAttribute('fill', Colors.GREEN)
            break
          }
          case 5: {
            this.activeLateralModeTextRef.instance.textContent = 'LNAV'
            this.activeLateralModeTextRef.instance.setAttribute('fill', Colors.PINK)
            break
          }
          case 6: {
            this.activeLateralModeTextRef.instance.textContent = 'HDG'
            this.activeLateralModeTextRef.instance.setAttribute('fill', Colors.GREEN)
            break
          }
          case 7: {
            this.activeLateralModeTextRef.instance.textContent = 'ALIGN'
            this.activeLateralModeTextRef.instance.setAttribute('fill', Colors.GREEN)
            break
          }
          case 8: {
            this.activeLateralModeTextRef.instance.textContent = 'RLOUT'
            this.activeLateralModeTextRef.instance.setAttribute('fill', Colors.GREEN)
            break
          }
        }
      })
  }

  public render(): VNode {
    return (
      <g>
        <rect x={290} y={35} width={78} height={25} fill="black" fill-opacity={0.3} stroke="white" stroke-width="2" />
        <text x={329} y={55} font-size={22} text-anchor="middle" ref={this.activeLateralModeTextRef} />
      </g>
    )
  }
}

export default ActiveLateralMode
