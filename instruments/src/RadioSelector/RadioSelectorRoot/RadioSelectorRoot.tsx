import { FSComponent, DisplayComponent, type VNode } from '@microsoft/msfs-sdk'
import '../index.scss'

export class RadioSelectorRoot extends DisplayComponent<any> {
  public render(): VNode {
    return (
      <div class="radioSelector">
        <div>Primary Flight Display</div>
        <div>Attitude Indicator</div>
        <div>Heading Indicator</div>
        <div>Altimeter</div>
      </div>
    )
  }
}
