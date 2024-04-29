import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'
import { type PFDSimvars } from '../PFDSimVarPublisher'
import Colors from 'instruments/common/util/Colors'

type AutoThrottleModeProps = ComponentProps & {
  bus: EventBus
}

class AutoThrottleMode extends DisplayComponent<AutoThrottleModeProps> {
  private readonly autoThrottleModeTextRef = FSComponent.createRef<SVGTextElement>()
  private readonly autoThrottleModeBoxRef = FSComponent.createRef<SVGRectElement>()

  private readonly autopilotModeTextRef = FSComponent.createRef<SVGTextElement>()
  private readonly autopilotModeBoxRef = FSComponent.createRef<SVGRectElement>()
  // private readonly autoThrottleModeLowerTextRef = FSComponent.createRef<SVGTSpanElement>()

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node)

    const sub = this.props.bus.getSubscriber<PFDSimvars>()

    sub
      .on('autothrottle_mode')
      .whenChanged()
      .handle((atMode) => {
        switch (atMode) {
          case 0: {
            this.autoThrottleModeTextRef.instance.textContent = ''

            this.autoThrottleModeBoxRef.instance.setAttribute('fill', 'black')
            this.autoThrottleModeBoxRef.instance.setAttribute('fill-opacity', '0.3')
            break
          }
          case 1: {
            this.autoThrottleModeTextRef.instance.textContent = 'TO'
            this.autoThrottleModeTextRef.instance.setAttribute('fill', 'white')

            this.autoThrottleModeBoxRef.instance.setAttribute('fill', 'black')
            this.autoThrottleModeBoxRef.instance.setAttribute('fill-opacity', '0.3')
            break
          }
          case 2: {
            this.autoThrottleModeTextRef.instance.textContent = 'TO'
            this.autoThrottleModeTextRef.instance.setAttribute('fill', Colors.GREEN)

            this.autoThrottleModeBoxRef.instance.setAttribute('fill', 'black')
            this.autoThrottleModeBoxRef.instance.setAttribute('fill-opacity', '0.3')
            break
          }
          case 3: {
            this.autoThrottleModeTextRef.instance.textContent = 'HOLD'
            this.autoThrottleModeTextRef.instance.setAttribute('fill', Colors.GREEN)

            this.autoThrottleModeBoxRef.instance.setAttribute('fill', 'black')
            this.autoThrottleModeBoxRef.instance.setAttribute('fill-opacity', '0.3')
            break
          }
          case 4: {
            this.autoThrottleModeTextRef.instance.innerHTML = 'SPD<tspan font-size="15">T</tspan>'
            this.autoThrottleModeTextRef.instance.setAttribute('fill', 'white')

            this.autoThrottleModeBoxRef.instance.setAttribute('fill', 'black')
            this.autoThrottleModeBoxRef.instance.setAttribute('fill-opacity', '0.3')
            break
          }
          case 5: {
            this.autoThrottleModeTextRef.instance.innerHTML = 'SPD<tspan font-size="15">T</tspan>'
            this.autoThrottleModeTextRef.instance.setAttribute('fill', Colors.GREEN)

            this.autoThrottleModeBoxRef.instance.setAttribute('fill', 'black')
            this.autoThrottleModeBoxRef.instance.setAttribute('fill-opacity', '0.3')
            break
          }
          case 6: {
            this.autoThrottleModeTextRef.instance.innerHTML = 'SPD<tspan font-size="15">E</tspan>'
            this.autoThrottleModeTextRef.instance.setAttribute('fill', Colors.GREEN)

            this.autoThrottleModeBoxRef.instance.setAttribute('fill', 'black')
            this.autoThrottleModeBoxRef.instance.setAttribute('fill-opacity', '0.3')
            break
          }
          case 7: {
            this.autoThrottleModeTextRef.instance.textContent = 'RETD'
            this.autoThrottleModeTextRef.instance.setAttribute('fill', 'white')

            this.autoThrottleModeBoxRef.instance.setAttribute('fill', 'black')
            this.autoThrottleModeBoxRef.instance.setAttribute('fill-opacity', '0.3')
            break
          }
          case 8: {
            this.autoThrottleModeTextRef.instance.textContent = 'RETD'
            this.autoThrottleModeTextRef.instance.setAttribute('fill', Colors.GREEN)

            this.autoThrottleModeBoxRef.instance.setAttribute('fill', 'black')
            this.autoThrottleModeBoxRef.instance.setAttribute('fill-opacity', '0.3')
            break
          }
          case 9: {
            this.autoThrottleModeTextRef.instance.textContent = 'GA'
            this.autoThrottleModeTextRef.instance.setAttribute('fill', Colors.GREEN)

            this.autoThrottleModeBoxRef.instance.setAttribute('fill', 'black')
            this.autoThrottleModeBoxRef.instance.setAttribute('fill-opacity', '0.3')
            break
          }
          case 10: {
            this.autoThrottleModeTextRef.instance.textContent = 'LIM'
            this.autoThrottleModeTextRef.instance.setAttribute('fill', Colors.ORANGE)

            this.autoThrottleModeBoxRef.instance.setAttribute('fill', 'black')
            this.autoThrottleModeBoxRef.instance.setAttribute('fill-opacity', '0.3')
            break
          }
          case 11: {
            this.autoThrottleModeTextRef.instance.textContent = 'AT'
            this.autoThrottleModeTextRef.instance.setAttribute('fill', Colors.GREEN)

            this.autoThrottleModeBoxRef.instance.setAttribute('fill', 'black')
            this.autoThrottleModeBoxRef.instance.setAttribute('fill-opacity', '0.3')
            break
          }
          case 12: {
            this.autoThrottleModeTextRef.instance.textContent = 'AT'
            this.autoThrottleModeTextRef.instance.setAttribute('fill', 'black')

            this.autoThrottleModeBoxRef.instance.setAttribute('fill', Colors.GREEN)
            this.autoThrottleModeBoxRef.instance.setAttribute('fill-opacity', '1')
            break
          }
          case 13: {
            this.autoThrottleModeTextRef.instance.textContent = 'AT'
            this.autoThrottleModeTextRef.instance.setAttribute('fill', 'white')

            this.autoThrottleModeBoxRef.instance.setAttribute('fill', Colors.RED)
            this.autoThrottleModeBoxRef.instance.setAttribute('fill-opacity', '1')

            break
          }
          case 14: {
            this.autoThrottleModeTextRef.instance.textContent = 'OVRD'
            this.autoThrottleModeTextRef.instance.setAttribute('fill', Colors.GREEN)

            this.autoThrottleModeBoxRef.instance.setAttribute('fill', 'black')
            this.autoThrottleModeBoxRef.instance.setAttribute('fill-opacity', '0.3')
            break
          }
          case 15: {
            this.autoThrottleModeTextRef.instance.textContent = 'DD'
            this.autoThrottleModeTextRef.instance.setAttribute('fill', Colors.GREEN)

            this.autoThrottleModeBoxRef.instance.setAttribute('fill', 'black')
            this.autoThrottleModeBoxRef.instance.setAttribute('fill-opacity', '0.3')
            break
          }
        }
      })

    sub
      .on('autopilot_mode')
      .whenChanged()
      .handle((apMode) => {
        switch (apMode) {
          case 0: {
            this.autopilotModeTextRef.instance.textContent = ''

            this.autopilotModeBoxRef.instance.setAttribute('fill', 'black')
            this.autopilotModeBoxRef.instance.setAttribute('fill-opacity', '0.3')
            break
          }
          case 1: {
            this.autopilotModeTextRef.instance.textContent = 'AP'
            this.autopilotModeTextRef.instance.setAttribute('fill', Colors.GREEN)

            this.autopilotModeBoxRef.instance.setAttribute('fill', 'black')
            this.autopilotModeBoxRef.instance.setAttribute('fill-opacity', '0.3')
            break
          }
          case 2: {
            this.autopilotModeTextRef.instance.textContent = 'AP'
            this.autopilotModeTextRef.instance.setAttribute('fill', 'white')

            this.autopilotModeBoxRef.instance.setAttribute('fill', Colors.RED)
            this.autopilotModeBoxRef.instance.setAttribute('fill-opacity', '1')
            break
          }
          case 3: {
            this.autopilotModeTextRef.instance.textContent = 'TCS'
            this.autopilotModeTextRef.instance.setAttribute('fill', Colors.GREEN)

            this.autopilotModeBoxRef.instance.setAttribute('fill', 'black')
            this.autopilotModeBoxRef.instance.setAttribute('fill-opacity', '0.3')
            break
          }
        }
      })
  }

  public render(): VNode {
    return (
      <g>
        <rect
          x={82}
          y={35}
          width={100}
          height={25}
          fill="black"
          fill-opacity={0.3}
          stroke="white"
          stroke-width="2"
          ref={this.autoThrottleModeBoxRef}
        />
        <text x={132} y={55} font-size={22} text-anchor="middle" ref={this.autoThrottleModeTextRef} />
        <rect
          x={82}
          y={60}
          width={100}
          height={21}
          fill="black"
          fill-opacity={0.3}
          stroke="white"
          stroke-width="2"
          ref={this.autopilotModeBoxRef}
        />
        <text x={132} y={79} font-size={22} text-anchor="middle" ref={this.autopilotModeTextRef} />
      </g>
    )
  }
}

export default AutoThrottleMode
