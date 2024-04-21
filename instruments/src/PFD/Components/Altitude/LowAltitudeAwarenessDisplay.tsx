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

export class LowAltitudeAwarenessDisplay extends DisplayComponent<LowAltitudeAwarenessDisplayProps> {
  private readonly grndBox = FSComponent.createRef<SVGRectElement>()
  private readonly grndBoxClipPath = FSComponent.createRef<SVGRectElement>()

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

        const clipPathHeight = this.props.maxAltitude * this.props.stretch
        this.grndBoxClipPath.instance.setAttribute('height', `${clipPathHeight}`)
        this.grndBoxClipPath.instance.setAttribute('y', `${boxPosition - clipPathHeight}`)
      })
  }

  public render(): VNode {
    return (
      <g>
        <defs>
          <pattern
            id="laadPattern"
            width={10}
            height={10}
            patternTransform="rotate(45 0 0)"
            patternUnits="userSpaceOnUse"
          >
            <line x1={5} x2={5} y1={0} y2={10} stroke={Colors.YELLOW} stroke-width={2} />
          </pattern>

          <clipPath id="laadClipPath">
            <rect x={455} y={0} width={82} height={0} ref={this.grndBoxClipPath} />
          </clipPath>
        </defs>

        <rect
          x={455}
          y={0}
          width={82}
          height={0}
          fill="url(#laadPattern)"
          stroke={Colors.YELLOW}
          stroke-width={2}
          ref={this.grndBox}
        />
      </g>
    )
  }
}
