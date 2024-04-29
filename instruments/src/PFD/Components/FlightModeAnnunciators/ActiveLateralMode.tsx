import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'

type LateralModeProps = ComponentProps & {
  bus: EventBus
}

class LateralMode extends DisplayComponent<LateralModeProps> {
  public render(): VNode {
    return (
      <g>
        <rect x={290} y={35} width={78} height={25} fill="black" fill-opacity={0.3} stroke="white" stroke-width="2" />
      </g>
    )
  }
}

export default LateralMode
