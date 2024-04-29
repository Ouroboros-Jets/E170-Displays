import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'
import { type PFDSimvars } from '../PFDSimVarPublisher'

type ArmedAutoThrottleModeProps = ComponentProps & {
  bus: EventBus
}

class ArmedAutoThrottleMode extends DisplayComponent<ArmedAutoThrottleModeProps> {
  private readonly armedAutoThrottleModeTextRef = FSComponent.createRef<SVGTextElement>()
  private readonly armedAutoThrottleModeBoxRef = FSComponent.createRef<SVGRectElement>()

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node)

    const sub = this.props.bus.getSubscriber<PFDSimvars>()

    sub
      .on('armed_autothrottle_mode')
      .whenChanged()
      .handle((armedAtMode) => {
        switch (armedAtMode) {
          case 0: {
            this.armedAutoThrottleModeTextRef.instance.textContent = ''

            this.armedAutoThrottleModeBoxRef.instance.setAttribute('fill', 'black')
            this.armedAutoThrottleModeBoxRef.instance.setAttribute('fill-opacity', '0.3')
            break
          }
          case 1: {
            this.armedAutoThrottleModeTextRef.instance.textContent = 'TO'
            this.armedAutoThrottleModeTextRef.instance.setAttribute('fill', 'white')

            this.armedAutoThrottleModeBoxRef.instance.setAttribute('fill', 'black')
            this.armedAutoThrottleModeBoxRef.instance.setAttribute('fill-opacity', '0.3')
            break
          }
          case 2: {
            this.armedAutoThrottleModeTextRef.instance.innerHTML = 'SPD<tspan font-size="15">T</tspan>'
            this.armedAutoThrottleModeTextRef.instance.setAttribute('fill', 'white')

            this.armedAutoThrottleModeBoxRef.instance.setAttribute('fill', 'black')
            this.armedAutoThrottleModeBoxRef.instance.setAttribute('fill-opacity', '0.3')
            break
          }

          case 3: {
            this.armedAutoThrottleModeTextRef.instance.textContent = 'RETD'
            this.armedAutoThrottleModeTextRef.instance.setAttribute('fill', 'white')

            this.armedAutoThrottleModeBoxRef.instance.setAttribute('fill', 'black')
            this.armedAutoThrottleModeBoxRef.instance.setAttribute('fill-opacity', '0.3')
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
          y={60}
          width={100}
          height={21}
          fill="black"
          fill-opacity={0.3}
          stroke="white"
          stroke-width="2"
          ref={this.armedAutoThrottleModeBoxRef}
        />
        <text x={132} y={79} font-size={22} text-anchor="middle" ref={this.armedAutoThrottleModeTextRef} />
      </g>
    )
  }
}

export default ArmedAutoThrottleMode
