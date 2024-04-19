import './index.scss'
import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'
import { type PFDSimvars } from '../PFDSimVarPublisher'

type TrendVectorProps = ComponentProps & {
  bus: EventBus
  baseline: number
}

export class TrendVector extends DisplayComponent<TrendVectorProps> {
  private readonly groupRef = FSComponent.createRef<SVGGElement>()
  private readonly trendVecRef = FSComponent.createRef<SVGPathElement>()
  private ias: number

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node)

    const sub = this.props.bus.getSubscriber<PFDSimvars>()
    sub
      .on('true_airspeed')
      .whenChanged()
      .handle((ias) => {
        this.ias = ias
      })

    sub
      .on('acceleration_z')
      .whenChanged()
      .handle((a) => {
        // TODO: The trend calculation seems wrong
        // When fixing: fix also the calculation for the trend value inside /CurrentAirspeedBox.tsx
        const iasPredictionInKnotsPerSecond = a * 0.592483801 * 10 * this.ias

        if (iasPredictionInKnotsPerSecond >= 2 || iasPredictionInKnotsPerSecond <= -2) {
          this.groupRef.instance.style.visibility = 'visible'
        } else {
          this.groupRef.instance.style.visibility = 'hidden'
        }

        this.trendVecRef.instance.setAttribute(
          'd',
          `M 86 ${this.props.baseline} L 86 ${this.props.baseline - iasPredictionInKnotsPerSecond * 0.3}`
        )
      })
  }

  public render(): VNode {
    return (
      <g ref={this.groupRef}>
        <defs>
          <clipPath id="iasTrendVectorClip">
            <rect x={83} y={88} width={6} height={330} />
          </clipPath>
        </defs>

        <path
          stroke-width={6}
          stroke="white"
          stroke-linejoin="round"
          ref={this.trendVecRef}
          clip-path="url(#iasTrendVectorClip)"
        />
        <path
          d={`M 80 ${this.props.baseline} L 90 ${this.props.baseline}`}
          stroke-width={2}
          stroke="white"
          stroke-linejoin="round"
        />
      </g>
    )
  }
}
