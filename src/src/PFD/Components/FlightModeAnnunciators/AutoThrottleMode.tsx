import { FSComponent, DisplayComponent, type VNode, type ComponentProps } from '@microsoft/msfs-sdk'

type AutoThrottleModeProps = ComponentProps & {}

class AutoThrottleMode extends DisplayComponent<AutoThrottleModeProps> {
  public render(): VNode {
    return (
      <g>
        <rect x={82} y={35} width={100} height={25} fill="black" fill-opacity={0.3} stroke="white" stroke-width="2" />
        <rect x={82} y={60} width={100} height={21} fill="black" fill-opacity={0.3} stroke="white" stroke-width="2" />
      </g>
    )
  }
}

export default AutoThrottleMode
