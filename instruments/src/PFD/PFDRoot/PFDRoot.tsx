import { FSComponent, DisplayComponent, type VNode } from '@microsoft/msfs-sdk'

export class PFDRoot extends DisplayComponent<any> {
  public render(): VNode {
    return (
      <div id="PFD-ROOT">
        <div>Primary Flight Display</div>
        <div>Attitude Indicator</div>
        <div>Heading Indicator</div>
        <div>Altimeter</div>
      </div>
    )
  }
}
