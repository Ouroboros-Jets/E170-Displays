import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'

import Colors from 'instruments/common/util/Colors'
import { type PFDSimvars } from '../PFDSimVarPublisher'

type AutopilotStatusProps = ComponentProps & {
  bus: EventBus
}

class AutopilotStatus extends DisplayComponent<AutopilotStatusProps> {
  private readonly autopilotStatusTextRef = FSComponent.createRef<SVGTextElement>()
  private readonly autopilotStatusBoxRef = FSComponent.createRef<SVGRectElement>()

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node)

    const sub = this.props.bus.getSubscriber<PFDSimvars>()

    sub
      .on('autopilot_status')
      .whenChanged()
      .handle((apStatus) => {
        switch (apStatus) {
          case 0: {
            this.autopilotStatusTextRef.instance.textContent = ''
            this.autopilotStatusBoxRef.instance.setAttribute('fill', 'black')
            this.autopilotStatusBoxRef.instance.setAttribute('fill-opacity', '0.3')
            break
          }
          case 1: {
            this.autopilotStatusTextRef.instance.textContent = 'AP'
            this.autopilotStatusTextRef.instance.setAttribute('fill', Colors.GREEN)
            this.autopilotStatusBoxRef.instance.setAttribute('fill', 'black')
            this.autopilotStatusBoxRef.instance.setAttribute('fill-opacity', '0.3')
            break
          }
          case 2: {
            this.autopilotStatusTextRef.instance.textContent = 'AP'
            this.autopilotStatusTextRef.instance.setAttribute('fill', 'white')
            this.autopilotStatusBoxRef.instance.setAttribute('fill', Colors.RED)
            this.autopilotStatusBoxRef.instance.setAttribute('fill-opacity', '1')
            break
          }
          case 3: {
            this.autopilotStatusTextRef.instance.textContent = 'TCS'
            this.autopilotStatusTextRef.instance.setAttribute('fill', Colors.GREEN)
            this.autopilotStatusBoxRef.instance.setAttribute('fill', 'black')
            this.autopilotStatusBoxRef.instance.setAttribute('fill-opacity', '0.3')
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
          y={35}
          width={78}
          height={25}
          fill="black"
          fill-opacity={0.3}
          stroke="white"
          stroke-width="2"
          ref={this.autopilotStatusBoxRef}
        />
        <text x={221} y={55} font-size={22} text-anchor="middle" ref={this.autopilotStatusTextRef} />
      </g>
    )
  }
}

export default AutopilotStatus
