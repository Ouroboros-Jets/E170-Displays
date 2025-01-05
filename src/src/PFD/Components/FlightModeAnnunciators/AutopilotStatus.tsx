import { FSComponent, DisplayComponent, type VNode, type ComponentProps } from '@microsoft/msfs-sdk'

type AutopilotStatusProps = ComponentProps & {}

class AutopilotStatus extends DisplayComponent<AutopilotStatusProps> {
  public render(): VNode {
    return (
      <g>
        <rect x={182} y={35} width={78} height={25} fill="black" fill-opacity={0.3} stroke="white" stroke-width="2" />
      </g>
    )
  }
}

export default AutopilotStatus
