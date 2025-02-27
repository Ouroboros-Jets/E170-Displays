import './index.scss'
import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'
import { type PFDSimvars } from '../PFDSimVarPublisher'

type TrendVectorProps = ComponentProps & {
  bus: EventBus
  baseline: number
  stretch: number
}

export class TrendVector extends DisplayComponent<TrendVectorProps> {
  private readonly groupRef = FSComponent.createRef<SVGGElement>()
  private readonly trendVecRef = FSComponent.createRef<SVGPathElement>()

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node)

    const sub = this.props.bus.getSubscriber<PFDSimvars>()

    sub
      .on('vertical_speed')
      .whenChanged()
      .handle((vs) => {
        const altPredictionInFeet = vs * 6

        if (Math.abs(altPredictionInFeet) >= 20) {
          this.groupRef.instance.style.visibility = 'visible'
        } else {
          this.groupRef.instance.style.visibility = 'hidden'
        }

        this.trendVecRef.instance.setAttribute(
          'd',
          `M 450 ${this.props.baseline} L 450 ${this.props.baseline - altPredictionInFeet * this.props.stretch}`
        )
      })
  }

  public render(): VNode {
    return (
      <g ref={this.groupRef}>
        <defs>
          <clipPath id="altTrendVectorClip">
            <rect x={447} y={88} width={6} height={330} />
          </clipPath>
        </defs>

        <path
          stroke-width={6}
          stroke="white"
          stroke-linejoin="round"
          ref={this.trendVecRef}
          clip-path="url(#altTrendVectorClip)"
        />
        <path
          d={`M 446 ${this.props.baseline} L 456 ${this.props.baseline}`}
          stroke-width={2}
          stroke="white"
          stroke-linejoin="round"
        />
      </g>
    )
  }
}
