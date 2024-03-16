import { FSComponent, DisplayComponent, type VNode } from '@microsoft/msfs-sdk'

export class SelectedAltitudeBox extends DisplayComponent<any> {
  public render(): VNode {
    return (
      <g>
        <rect x="31" y="1" rx={2} ry={2} width="81" height="58" stroke="white" stroke-width={2} fill="transparent" />
        <path d="M 31 27 L 112 27" stroke="white" stroke-width="2" fill="none" />
      </g>
    )
  }
}
