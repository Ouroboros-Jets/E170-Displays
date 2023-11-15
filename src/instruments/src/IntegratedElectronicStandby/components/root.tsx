import { FSComponent, DisplayComponent, VNode } from '@microsoft/msfs-sdk';

export class IESRoot extends DisplayComponent<any> {
  public render(): VNode {
    return <div>IES Root</div>;
  }
}
