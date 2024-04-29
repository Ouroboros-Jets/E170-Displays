import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'
import { type PFDSimvars } from '../PFDSimVarPublisher'
import Colors from 'instruments/common/util/Colors'

type ActiveVerticalModeProps = ComponentProps & {
  bus: EventBus
}

class ActiveVerticalMode extends DisplayComponent<ActiveVerticalModeProps> {
  private readonly activeVerticalModeTextRef = FSComponent.createRef<SVGTextElement>()

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node)

    const sub = this.props.bus.getSubscriber<PFDSimvars>()

    sub
      .on('active_vertical_mode')
      .whenChanged()
      .handle((avm) => {
        switch (avm) {
          case 0: {
            this.activeVerticalModeTextRef.instance.textContent = ''

            break
          }
          case 1: {
            this.activeVerticalModeTextRef.instance.textContent = 'ALT'
            this.activeVerticalModeTextRef.instance.setAttribute('fill', Colors.GREEN)
            break
          }
          case 2: {
            this.activeVerticalModeTextRef.instance.textContent = 'FLARE'
            this.activeVerticalModeTextRef.instance.setAttribute('fill', Colors.GREEN)
            break
          }
          case 3: {
            this.activeVerticalModeTextRef.instance.textContent = 'D-ROT'
            this.activeVerticalModeTextRef.instance.setAttribute('fill', Colors.GREEN)
            break
          }
          case 4: {
            this.activeVerticalModeTextRef.instance.textContent = 'FLCH'
            this.activeVerticalModeTextRef.instance.setAttribute('fill', Colors.GREEN)
            break
          }
          case 5: {
            this.activeVerticalModeTextRef.instance.textContent = 'GA'
            this.activeVerticalModeTextRef.instance.setAttribute('fill', Colors.GREEN)
            break
          }
          case 6: {
            this.activeVerticalModeTextRef.instance.textContent = 'TO'
            this.activeVerticalModeTextRef.instance.setAttribute('fill', Colors.GREEN)
            break
          }
          case 7: {
            this.activeVerticalModeTextRef.instance.textContent = 'FPA'
            this.activeVerticalModeTextRef.instance.setAttribute('fill', Colors.GREEN)
            break
          }
          case 8: {
            this.activeVerticalModeTextRef.instance.textContent = 'ASEL'
            this.activeVerticalModeTextRef.instance.setAttribute('fill', Colors.GREEN)
            break
          }
          case 9: {
            this.activeVerticalModeTextRef.instance.textContent = 'GS'
            this.activeVerticalModeTextRef.instance.setAttribute('fill', Colors.GREEN)
            break
          }
          case 10: {
            this.activeVerticalModeTextRef.instance.textContent = 'VS'
            this.activeVerticalModeTextRef.instance.setAttribute('fill', Colors.GREEN)
            break
          }
          case 11: {
            this.activeVerticalModeTextRef.instance.textContent = 'WSHR'
            this.activeVerticalModeTextRef.instance.setAttribute('fill', Colors.GREEN)
            break
          }
          case 12: {
            this.activeVerticalModeTextRef.instance.textContent = 'FLCH'
            this.activeVerticalModeTextRef.instance.setAttribute('fill', Colors.PINK)
            break
          }
          case 13: {
            this.activeVerticalModeTextRef.instance.textContent = 'ASEL'
            this.activeVerticalModeTextRef.instance.setAttribute('fill', Colors.PINK)
            break
          }
          case 14: {
            this.activeVerticalModeTextRef.instance.textContent = 'ALT'
            this.activeVerticalModeTextRef.instance.setAttribute('fill', Colors.PINK)
            break
          }
          case 15: {
            this.activeVerticalModeTextRef.instance.textContent = 'PTH'
            this.activeVerticalModeTextRef.instance.setAttribute('fill', Colors.PINK)
            break
          }
          case 16: {
            this.activeVerticalModeTextRef.instance.textContent = 'GP'
            this.activeVerticalModeTextRef.instance.setAttribute('fill', Colors.PINK)
            break
          }
          case 17: {
            this.activeVerticalModeTextRef.instance.textContent = 'OVSP'
            this.activeVerticalModeTextRef.instance.setAttribute('fill', Colors.ORANGE)
            break
          }
        }
      })
  }

  public render(): VNode {
    return (
      <g>
        <rect x={368} y={35} width={85} height={25} fill="black" fill-opacity={0.3} stroke="white" stroke-width="2" />
        <text x={410.5} y={55} font-size={22} text-anchor="middle" ref={this.activeVerticalModeTextRef} />
      </g>
    )
  }
}

export default ActiveVerticalMode
