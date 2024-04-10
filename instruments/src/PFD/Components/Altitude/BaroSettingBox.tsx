import { FSComponent, DisplayComponent, type VNode } from '@microsoft/msfs-sdk'

export class BaroSettingBox extends DisplayComponent<any> {
  public render(): VNode {
    return (
      <g>
        <rect x="455" y="419" rx={2} ry={2} width="90" height="30" stroke="white" stroke-width="2" fill="black" />
      </g>
    )
  }
}
