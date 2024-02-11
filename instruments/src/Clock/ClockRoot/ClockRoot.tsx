import { FSComponent, DisplayComponent, type VNode } from '@microsoft/msfs-sdk'
import '../index.scss'

export class ClockRoot extends DisplayComponent<any> {
  public render(): VNode {
    return <div class="clock">the clock</div>
  }
}
