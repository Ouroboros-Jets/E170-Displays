import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'
import { type PFDSimvars } from '../PFDSimVarPublisher'
import Colors from 'instruments/common/util/Colors'

type AutoThrottleStatusProps = ComponentProps & {
  bus: EventBus
}

class AutoThrottleStatus extends DisplayComponent<AutoThrottleStatusProps> {
  private readonly autothrottleStatusTextRef = FSComponent.createRef<SVGTextElement>()
  private readonly autothrottleStatusBoxRef = FSComponent.createRef<SVGRectElement>()

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node)

    const sub = this.props.bus.getSubscriber<PFDSimvars>()

    sub
      .on('autothrottle_status')
      .whenChanged()
      .handle((atStatus) => {
        switch (atStatus) {
          case 0: {
            this.autothrottleStatusTextRef.instance.textContent = ''
            this.autothrottleStatusBoxRef.instance.setAttribute('fill', 'black')
            this.autothrottleStatusBoxRef.instance.setAttribute('fill-opacity', '0.3')
            break
          }
          case 1: {
            this.autothrottleStatusTextRef.instance.textContent = 'AT'
            this.autothrottleStatusTextRef.instance.setAttribute('fill', Colors.GREEN)
            this.autothrottleStatusBoxRef.instance.setAttribute('fill', 'black')
            this.autothrottleStatusBoxRef.instance.setAttribute('fill-opacity', '0.3')
            break
          }
          case 2: {
            this.autothrottleStatusTextRef.instance.textContent = 'AT'
            this.autothrottleStatusTextRef.instance.setAttribute('fill', 'white')
            this.autothrottleStatusBoxRef.instance.setAttribute('fill', Colors.RED)
            this.autothrottleStatusBoxRef.instance.setAttribute('fill-opacity', '1')
            break
          }
          case 3: {
            this.autothrottleStatusTextRef.instance.textContent = 'OVRD'
            this.autothrottleStatusTextRef.instance.setAttribute('fill', Colors.GREEN)
            this.autothrottleStatusBoxRef.instance.setAttribute('fill', 'black')
            this.autothrottleStatusBoxRef.instance.setAttribute('fill-opacity', '0.3')
            break
          }
          case 4: {
            this.autothrottleStatusTextRef.instance.textContent = 'DD'
            this.autothrottleStatusTextRef.instance.setAttribute('fill', Colors.GREEN)
            this.autothrottleStatusBoxRef.instance.setAttribute('fill', 'black')
            this.autothrottleStatusBoxRef.instance.setAttribute('fill-opacity', '0.3')
            break
          }
        }
      })
  }

  public render(): VNode {
    return (
      <g>
        <rect
          x={182}
          y={60}
          width={78}
          height={21}
          fill="black"
          fill-opacity={0.3}
          stroke="white"
          stroke-width="2"
          ref={this.autothrottleStatusBoxRef}
        />
        <text x={221} y={79} font-size={22} text-anchor="middle" ref={this.autothrottleStatusTextRef} />
      </g>
    )
  }
}

export default AutoThrottleStatus
