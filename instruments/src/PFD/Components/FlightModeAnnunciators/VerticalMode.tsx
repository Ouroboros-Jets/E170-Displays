import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'

type VerticalModeProps = ComponentProps & {
  bus: EventBus
}

class VerticalMode extends DisplayComponent<VerticalModeProps> {
  public render(): VNode {
    return (
      <g>
        <rect x={368} y={35} width={85} height={25} fill="black" fill-opacity={0.3} stroke="white" stroke-width="2" />
        <rect x={368} y={60} width={85} height={21} fill="black" fill-opacity={0.3} stroke="white" stroke-width="2" />
      </g>
    )
  }
}

export default VerticalMode
