import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'
import Colors from 'instruments/common/util/Colors'
import { type PFDSimvars } from '../PFDSimVarPublisher'

type SourceSelectionProps = ComponentProps & {
  bus: EventBus
}

const leftArrow = 'M 272 53 L 267 59.5 L 272 66 L 272 60 L 283 60 L 283 59 L 272 59 Z'
const rightArrow = 'M 279 53 L 283 59.5 L 279 66 L 279 60 L 268 60 L 268 59 L 279 59 Z'

class SourceSelection extends DisplayComponent<SourceSelectionProps> {
  private readonly arrowRef = FSComponent.createRef<SVGPathElement>()

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node)

    const sub = this.props.bus.getSubscriber<PFDSimvars>()

    sub
      .on('selection_source')
      .whenChanged()
      .handle((selSource) => {
        if (selSource) {
          this.arrowRef.instance.setAttribute('d', rightArrow)
        } else {
          this.arrowRef.instance.setAttribute('d', leftArrow)
        }
      })
  }

  public render(): VNode {
    return (
      <g>
        <rect x={261} y={35} width={28} height={46} fill="black" fill-opacity={0.3} stroke="white" stroke-width="2" />

        <path
          d={leftArrow}
          fill={Colors.GREEN}
          stroke={Colors.GREEN}
          stroke-width={2}
          stroke-linejoin="round"
          ref={this.arrowRef}
        />
      </g>
    )
  }
}

export default SourceSelection
