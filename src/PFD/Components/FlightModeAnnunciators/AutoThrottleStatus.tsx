import { FSComponent, DisplayComponent, type VNode, type ComponentProps } from '@microsoft/msfs-sdk'

type AutoThrottleStatusProps = ComponentProps & {}

class AutoThrottleStatus extends DisplayComponent<AutoThrottleStatusProps> {
  public render(): VNode {
    return (
      <g>
        <rect x={182} y={60} width={78} height={21} fill="black" fill-opacity={0.3} stroke="white" stroke-width="2" />
      </g>
    )
  }
}

export default AutoThrottleStatus
