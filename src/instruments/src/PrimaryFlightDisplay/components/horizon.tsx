import { FSComponent, DisplayComponent, VNode } from '@microsoft/msfs-sdk';
import '../index.scss';

export class Horizon extends DisplayComponent<any> {
  public render(): VNode {
    return <div class="horizon">Horizon</div>;
  }
}
