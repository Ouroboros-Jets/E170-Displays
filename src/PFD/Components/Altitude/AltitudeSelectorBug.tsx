import {
  FSComponent,
  DisplayComponent,
  type VNode,
  type ComponentProps,
  type EventBus,
} from "@microsoft/msfs-sdk";
import Colors from "common/util/Colors";
import { type PFDSimvars } from "../PFDSimVarPublisher";

type AltitudeSelectorBugProps = ComponentProps & {
  bus: EventBus;
  stretch: number;
  maxAltitude: number;
};

export class AltitudeSelectorBug extends DisplayComponent<AltitudeSelectorBugProps> {
  private readonly altSelBug = FSComponent.createRef<SVGGElement>();

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node);

    const sub = this.props.bus.getSubscriber<PFDSimvars>();

    sub
      .on("altitude_selected")
      .whenChanged()
      .handle((alt) => {
        this.altSelBug.instance.setAttribute(
          "transform",
          `translate(455, ${
            this.props.maxAltitude * this.props.stretch -
            alt * this.props.stretch
          })`
        );
      });
  }

  public render(): VNode {
    return (
      <g transform="translate(455, 0)" ref={this.altSelBug}>
        <path
          d="M 0 -1 L -15 -1 L -15 -10 L -7 -10 L 0 -2 L 7 -10 L 15 -10 L 15 -1 L 0 -1"
          transform="rotate(90)"
          fill={Colors.CYAN}
          stroke-width={2}
          stroke={Colors.CYAN}
          stroke-linecap="round"
        />
      </g>
    );
  }
}
