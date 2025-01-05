import {
  FSComponent,
  DisplayComponent,
  type VNode,
  type ComponentProps,
  type EventBus,
} from "@microsoft/msfs-sdk";
import Colors from "common/util/Colors";
import { type PFDSimvars } from "../PFDSimVarPublisher";

type BaroSettingBoxProps = ComponentProps & {
  bus: EventBus;
};

export class BaroSettingBox extends DisplayComponent<BaroSettingBoxProps> {
  baroValueRef = FSComponent.createRef<SVGTSpanElement>();
  baroUnitRef = FSComponent.createRef<SVGTSpanElement>();

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node);

    const sub = this.props.bus.getSubscriber<PFDSimvars>();
    sub
      .on("barometric_setting")
      .whenChanged()
      .handle((baroValue) => {
        this.baroValueRef.instance.textContent = baroValue
          .toFixed(2)
          .toString();
      });

    sub
      .on("barometric_std")
      .whenChanged()
      .handle((baroStd) => {
        if (baroStd) {
          this.baroValueRef.instance.textContent = "IN";
          this.baroValueRef.instance.setAttribute("fill", Colors.CYAN);
          this.baroUnitRef.instance.textContent = "";
        } else {
          this.baroValueRef.instance.setAttribute("fill", Colors.CYAN);
          this.baroUnitRef.instance.textContent = "IN";

          sub
            .on("barometric_setting")
            .whenChanged()
            .handle((baroValue) => {
              this.baroValueRef.instance.textContent = Math.round(baroValue)
                .toString()
                .padStart(3, "0");
            });
        }
      });
  }

  public render(): VNode {
    return (
      <g>
        <rect
          x="455"
          y="419"
          rx={2}
          ry={2}
          width="90"
          height="30"
          stroke="white"
          stroke-width="2"
          fill="black"
        />
        <text x="498" y="442" font-size={18} text-anchor="middle">
          <tspan ref={this.baroValueRef} fill={Colors.YELLOW}>
            ----
          </tspan>
          <tspan ref={this.baroUnitRef} fill="white"></tspan>
        </text>
      </g>
    );
  }
}
