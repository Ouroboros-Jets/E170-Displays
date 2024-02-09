import { FSComponent, DisplayComponent, type VNode } from '@microsoft/msfs-sdk'

export class ClockRoot extends DisplayComponent<any> {
  public render(): VNode {
    return <div>the clock</div>
  }
}
