import { DisplayComponent, type VNode, FSComponent } from '@microsoft/msfs-sdk'
import '../index.scss'
export class EICASRoot extends DisplayComponent<any> {
  public render(): VNode {
    return (
      <div id="EICAS_ROOT">
        <div>Primary Flight Display</div>
        <div>Attitude Indicator</div>
        <div>Heading Indicator</div>
        <div>Altimeter</div>
      </div>
    )
  }
}
