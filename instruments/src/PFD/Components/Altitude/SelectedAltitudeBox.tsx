import { FSComponent, DisplayComponent, type VNode } from '@microsoft/msfs-sdk'

export class SelectedAltitudeBox extends DisplayComponent<any> {
  public render(): VNode {
    return (
      <g transform="translate(426 28)">
        <rect x="29" y="27" rx={2} ry={2} width="83" height="33" stroke="white" stroke-width={2} fill="transparent" />
      </g>
    )
  }
}
