import { FSComponent, DisplayComponent, VNode, ComponentProps, EventBus } from '@microsoft/msfs-sdk';
import { ClockSimVars } from '../Shared/ClockSimVarPublisher';
import './ClockRoot.scss';

interface ClockProps extends ComponentProps {
  bus: EventBus;
}
export class ClockRoot extends DisplayComponent<ClockProps> {
  private readonly gElementRef = FSComponent.createRef<SVGAElement>();
  private readonly svgElementRef = FSComponent.createRef<SVGSVGElement>();

  onAfterRender(node: VNode): void {
    super.onAfterRender(node);

    const sub = this.props.bus.getSubscriber<ClockSimVars>();
    sub
      .on('timeOfDay')
      .whenChanged()
      .handle((timeOfDay) => {
        this.gElementRef.instance.classList.toggle('day', timeOfDay === 1 || timeOfDay === 2);
        this.gElementRef.instance.classList.toggle('night', timeOfDay === 1 || timeOfDay === 2);
      });
  }

  public render(): VNode {
    return <div class="clock-container">Clock Root</div>;
  }
}
