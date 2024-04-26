import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'
import Colors from 'instruments/common/util/Colors'
import { type PFDSimvars } from '../PFDSimVarPublisher'

type LowAltitudeAwarenessDisplayProps = ComponentProps & {
  bus: EventBus
  baseline: number
  stretch: number
  minAltitude: number
  maxAltitude: number
}

const offset = 15

export class LowAltitudeAwarenessDisplay extends DisplayComponent<LowAltitudeAwarenessDisplayProps> {
  private readonly grndBox = FSComponent.createRef<SVGRectElement>()
  private readonly grndBoxInsideClipPath = FSComponent.createRef<SVGRectElement>()
  private readonly grndBoxClipPath = FSComponent.createRef<SVGRectElement>()

  private readonly renderLines = (): JSX.Element[] => {
    const lines: JSX.Element[] = []

    const clipPathHeight = this.props.maxAltitude * this.props.stretch

    for (let i = -clipPathHeight * 1.005; i < clipPathHeight * 1.005; i += offset) {
      lines.push(
        <line
          x1={455}
          y1={clipPathHeight + i}
          x2={537}
          y2={clipPathHeight + i - offset * 4}
          stroke={Colors.YELLOW}
          stroke-width={2}
        />
      )
    }
    return lines
  }

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node)

    const sub = this.props.bus.getSubscriber<PFDSimvars>()

    sub
      .on('ground_altitude')
      .whenChanged()
      .handle((alt) => {
        // alt is in meters
        const boxPosition = this.props.maxAltitude * this.props.stretch - alt * 3.281 * this.props.stretch

        this.grndBox.instance.setAttribute('height', `${boxPosition}`)
        this.grndBox.instance.setAttribute('y', `${boxPosition}`)

        this.grndBoxInsideClipPath.instance.setAttribute('height', `${boxPosition}`)
        this.grndBoxInsideClipPath.instance.setAttribute('y', `${boxPosition}`)

        const clipPathHeight = this.props.maxAltitude * this.props.stretch
        this.grndBoxClipPath.instance.setAttribute('height', `${clipPathHeight}`)
        this.grndBoxClipPath.instance.setAttribute('y', `${boxPosition - clipPathHeight}`)
      })
  }

  public render(): VNode {
    return (
      <g>
        <defs>
          <clipPath id="laadInsideClipPath">
            <rect x={455} y={0} width={82} height={0} ref={this.grndBoxInsideClipPath} />
          </clipPath>

          <clipPath id="laadClipPath">
            <rect x={455} y={0} width={82} height={0} ref={this.grndBoxClipPath} />
          </clipPath>
        </defs>

        <g clip-path="url(#laadInsideClipPath)">
          <g>{this.renderLines()}</g>
        </g>

        <rect
          x={455}
          y={0}
          width={82}
          height={0}
          fill="transparent"
          stroke={Colors.YELLOW}
          stroke-width={2}
          ref={this.grndBox}
        />
      </g>
    )
  }
}
