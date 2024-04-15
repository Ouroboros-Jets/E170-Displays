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
      .on('altitude')
      .whenChanged()
      .handle((ias) => {
        sub
          .on('acceleration_y')
          .whenChanged()
          .handle((a) => {
            const iasPredictionInFeetPerSecond = Math.sqrt(ias) + a * 6

            if (iasPredictionInFeetPerSecond >= 20 || iasPredictionInFeetPerSecond <= -20) {
              this.groupRef.instance.style.visibility = 'visible'
            } else {
              this.groupRef.instance.style.visibility = 'hidden'
            }

            this.trendVecRef.instance.setAttribute(
              'd',
              `M 450 ${baseline} L 450 ${baseline - iasPredictionInFeetPerSecond * 3}`
            )
          })
      })
  }

  public render(): VNode {
    return (
      <g ref={this.groupRef}>
        <defs>
          <clipPath id="altTrendVectorClip">
            <rect x={448} y={88} width={6} height={330} />
          </clipPath>
        </defs>

        <path
          stroke-width={6}
          stroke="white"
          stroke-linejoin="round"
          ref={this.trendVecRef}
          clip-path="url(#altTrendVectorClip)"
        />
        <path d={`M 445 ${baseline} L 455 ${baseline}`} stroke-width={2} stroke="white" stroke-linejoin="round" />
      </g>
    )
  }
}
