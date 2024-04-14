import './index.scss'
import {
  FSComponent,
  DisplayComponent,
  type VNode,
  type ComponentProps,
  type EventBus,
  Subject
} from '@microsoft/msfs-sdk'
import { type PFDSimvars } from '../PFDSimVarPublisher'

type TrendVectorProps = ComponentProps & {
  bus: EventBus
}

const baseline = 254

export class TrendVector extends DisplayComponent<TrendVectorProps> {
  private readonly groupRef = FSComponent.createRef<SVGGElement>()
  private readonly trendVecRef = FSComponent.createRef<SVGPathElement>()

  private readonly subscribableAcceleration = Subject.create<number>(0)
  private readonly subscribablevelocityHistory = Subject.create<number[]>([])

  private calculateAcceleration(): number {
    const sHCpy = this.subscribablevelocityHistory.get()
    const dv = sHCpy[sHCpy.length - 1] - sHCpy[0]
    const dt = 10
    return dv / dt
  }

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node)

    const sub = this.props.bus.getSubscriber<PFDSimvars>()
    sub
      .on('true_airspeed')
      .whenChanged()
      .handle((ias) => {
        const acceleration = this.subscribableAcceleration.get()
        if (acceleration > 2) {
          this.groupRef.instance.setAttribute('opacity', '0')
        } else {
          this.groupRef.instance.setAttribute('opacity', '1')
        }

        const vh = this.subscribablevelocityHistory.get()
        if (vh.length > 10) {
          vh.shift()
          this.subscribableAcceleration.set(this.calculateAcceleration())
        }

        console.log(acceleration)

        vh.push(ias)
        this.subscribablevelocityHistory.set(vh)
        this.trendVecRef.instance.setAttribute('d', `M 86 ${baseline} L 86 ${baseline + acceleration}`)
      })
  }

  public render(): VNode {
    return (
      <g ref={this.groupRef}>
        <path stroke-width={6} stroke="white" stroke-linejoin="round" ref={this.trendVecRef} />
        <path d={`M 80 ${baseline} L 90 ${baseline}`} stroke-width={2} stroke="white" stroke-linejoin="round" />
      </g>
    )
  }
}
