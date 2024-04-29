import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'
import { type PFDSimvars } from '../PFDSimVarPublisher'

type ArmedLateralModeProps = ComponentProps & {
  bus: EventBus
}

class ArmedLateralMode extends DisplayComponent<ArmedLateralModeProps> {
  private readonly armedLateralModeTextRef = FSComponent.createRef<SVGTextElement>()

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node)

    const sub = this.props.bus.getSubscriber<PFDSimvars>()

    sub
      .on('armed_lateral_mode')
      .whenChanged()
      .handle((alm) => {
        switch (alm) {
          case 0: {
            this.armedLateralModeTextRef.instance.textContent = ''
            break
          }
          case 1: {
            this.armedLateralModeTextRef.instance.textContent = 'LOC'
            break
          }
          case 2: {
            this.armedLateralModeTextRef.instance.textContent = 'BC'
            break
          }
          case 3: {
            this.armedLateralModeTextRef.instance.textContent = 'LNAV'
            break
          }
          case 4: {
            this.armedLateralModeTextRef.instance.textContent = 'ALIGN'
            break
          }
          case 5: {
            this.armedLateralModeTextRef.instance.textContent = 'RLOUT'
            break
          }
          case 6: {
            this.armedLateralModeTextRef.instance.textContent = 'TRACK'
            break
          }
        }
      })
  }

  public render(): VNode {
    return (
      <g>
        <rect x={290} y={60} width={78} height={21} fill="black" fill-opacity={0.3} stroke="white" stroke-width="2" />
        <text x={329} y={79} font-size={22} text-anchor="middle" fill="white" ref={this.armedLateralModeTextRef} />
      </g>
    )
  }
}

export default ArmedLateralMode
