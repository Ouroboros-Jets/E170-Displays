import {
  FSComponent,
  DisplayComponent,
  type VNode,
  type EventBus,
  type ComponentProps,
} from "@microsoft/msfs-sdk";
import { type PFDSimvars } from "../PFDSimVarPublisher";
import Colors from "common/util/Colors";

type SelectedAltitudeBoxProps = ComponentProps & {
  bus: EventBus;
};

export class SelectedAltitudeBox extends DisplayComponent<SelectedAltitudeBoxProps> {
  altitudeSelectedRef1 = FSComponent.createRef<SVGElement>();
  altitudeSelectedRef2 = FSComponent.createRef<SVGElement>();

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node);

    const sub = this.props.bus.getSubscriber<PFDSimvars>();
    sub
      .on("altitude_selected")
      .whenChanged()
      .handle((alt) => {
        const altStr = Math.round(alt).toString().padStart(5, "0");
        this.altitudeSelectedRef1.instance.textContent = altStr.substring(0, 3);
        this.altitudeSelectedRef2.instance.textContent = altStr.substring(3, 5);
      });
  }

  public render(): VNode {
    return (
      <g>
        <rect
          x="455"
          y="55"
          rx={2}
          ry={2}
          width="83"
          height="33"
          stroke="white"
          stroke-width={2}
          fill="transparent"
        />
        <text
          ref={this.altitudeSelectedRef1}
          x={485}
          y={82}
          text-anchor="middle"
          fill={Colors.CYAN}
          font-size="30"
          letter-spacing="-3"
        />
        <text
          ref={this.altitudeSelectedRef2}
          x={524}
          y={82}
          text-anchor="middle"
          fill={Colors.CYAN}
          font-size="26"
          letter-spacing="-3"
        />
      </g>
    );
  }
}
