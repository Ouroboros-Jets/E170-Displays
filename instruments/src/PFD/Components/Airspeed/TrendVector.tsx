import './index.scss'
import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'
import { type PFDSimvars } from '../PFDSimVarPublisher'

type TrendVectorProps = ComponentProps & {
  bus: EventBus
}

const baseline = 254

export class TrendVector extends DisplayComponent<TrendVectorProps> {
  private readonly groupRef = FSComponent.createRef<SVGGElement>()
  private readonly trendVecRef = FSComponent.createRef<SVGPathElement>()

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node)

    const sub = this.props.bus.getSubscriber<PFDSimvars>()
    sub
      .on('true_airspeed')
      .whenChanged()
      .handle((ias) => {
        sub
          .on('acceleration_z')
          .whenChanged()
          .handle((a) => {
            const iasInFeetPerSecond = ias * 1.68781
            const iasPrediction = iasInFeetPerSecond + a * 10
            const iasPredictionInKnots = iasPrediction / 1.68781

            console.log(iasPredictionInKnots)

            if (iasPredictionInKnots >= 2 || iasPredictionInKnots <= -2) {
              this.groupRef.instance.style.visibility = 'visible'
            } else {
              this.groupRef.instance.style.visibility = 'hidden'
            }

            this.trendVecRef.instance.setAttribute('d', `M 86 ${baseline} L 86 ${baseline - iasPredictionInKnots * 3}`)
          })
      })
  }

  public render(): VNode {
    return (
      <g ref={this.groupRef}>
        <defs>
          <clipPath id="trendVectorClip">
            <rect x={83} y={88} width={6} height={330} />
          </clipPath>
        </defs>

        <path
          stroke-width={6}
          stroke="white"
          stroke-linejoin="round"
          ref={this.trendVecRef}
          clip-path="url(#trendVectorClip)"
        />
        <path d={`M 80 ${baseline} L 90 ${baseline}`} stroke-width={2} stroke="white" stroke-linejoin="round" />
      </g>
    )
  }
}
