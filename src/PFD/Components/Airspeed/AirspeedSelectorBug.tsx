import {
  FSComponent,
  DisplayComponent,
  type VNode,
  type ComponentProps,
  type EventBus,
} from "@microsoft/msfs-sdk";
import Colors from "common/util/Colors";
import { type PFDSimvars } from "../PFDSimVarPublisher";

type AirspeedSelectorBugProps = ComponentProps & {
  bus: EventBus;
  minSpeed: number;
  maxSpeed: number;
  stretch: number;
};

export class AirspeedSelectorBug extends DisplayComponent<AirspeedSelectorBugProps> {
  private readonly iasSelBug = FSComponent.createRef<SVGGElement>();

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node);

    const sub = this.props.bus.getSubscriber<PFDSimvars>();

    sub
      .on("airspeed_selected")
      .whenChanged()
      .handle((ias) => {
        this.iasSelBug.instance.setAttribute(
          "transform",
          `translate(80, ${
            (this.props.maxSpeed - ias) * this.props.stretch +
            this.props.minSpeed * this.props.stretch -
            this.props.minSpeed
          })`
        );
      });
  }

  public render(): VNode {
    return (
      <g transform="translate(80, 201)" ref={this.iasSelBug}>
        <path
          d="M 0 -1 L -15 -1 L -15 -10 L -7 -10 L 0 -2 L 7 -10 L 15 -10 L 15 -1 L 0 -1"
          transform="rotate(270)"
          fill={Colors.CYAN}
          stroke-width={2}
          stroke={Colors.CYAN}
          stroke-linecap="round"
        />
      </g>
    );
  }
}
