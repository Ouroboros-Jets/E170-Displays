import { FSComponent, DisplayComponent, VNode, ComponentProps } from '@microsoft/msfs-sdk';
import { StringFormatter } from './stringFormatter';
import '../index.scss';

interface DisplayGridProps extends ComponentProps {
  display1Position: string;
  display2Position: string;
  display1Volume: string;
  display2Volume: string;
}
export class DisplayGrid extends DisplayComponent<DisplayGridProps> {
  public render(): VNode {
    return (
      <div class="radio_container">
        <div class="radio_text">{StringFormatter(this.props.display1Position)}</div>
        <div class="radio_text volume">{this.props.display1Volume}</div>
        <div class="radio_text">{StringFormatter(this.props.display2Position)}</div>
        <div class="radio_text volume">{this.props.display2Volume}</div>
      </div>
    );
  }
}
