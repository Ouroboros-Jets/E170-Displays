import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'
import { type PFDSimvars } from '../PFDSimVarPublisher'

type ArmedVerticalModeProps = ComponentProps & {
  bus: EventBus
}

class ArmedVerticalMode extends DisplayComponent<ArmedVerticalModeProps> {
  private readonly armedVerticalModeTextRef = FSComponent.createRef<SVGTextElement>()

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node)

    const sub = this.props.bus.getSubscriber<PFDSimvars>()

    sub
      .on('armed_vertical_mode')
      .whenChanged()
      .handle((avm) => {
        switch (avm) {
          case 0: {
            this.armedVerticalModeTextRef.instance.textContent = ''
            break
          }
          case 1: {
            this.armedVerticalModeTextRef.instance.textContent = 'GP'
            break
          }
          case 2: {
            this.armedVerticalModeTextRef.instance.textContent = 'GS'
            break
          }
          case 3: {
            this.armedVerticalModeTextRef.instance.textContent = 'VNAV'
            break
          }
          case 4: {
            this.armedVerticalModeTextRef.instance.textContent = 'FLARE'
            break
          }
          case 5: {
            this.armedVerticalModeTextRef.instance.textContent = 'D-ROT'
            break
          }
        }
      })
  }

  public render(): VNode {
    return (
      <g>
        <rect x={368} y={60} width={85} height={21} fill="black" fill-opacity={0.3} stroke="white" stroke-width="2" />
        <text x={410.5} y={79} font-size={22} text-anchor="middle" fill="white" ref={this.armedVerticalModeTextRef} />
      </g>
    )
  }
}

export default ArmedVerticalMode
