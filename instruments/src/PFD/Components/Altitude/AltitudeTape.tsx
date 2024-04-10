import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'
import { type PFDSimvars } from '../PFDSimVarPublisher'

type AltitudeTapeProps = ComponentProps & {
  bus: EventBus
}

const baseline = 254
const maxAltitude = 500000

const renderTape = (): JSX.Element[] => {
  const elements: JSX.Element[] = []

  for (let alt = 0; alt < maxAltitude; alt += maxAltitude / 1000) {
    const iteration = alt / (maxAltitude / 1000)

    if (iteration % 5 !== 0) {
      elements.push(<path d={`M 455 ${alt * 0.06} L 465 ${alt * 0.06}`} stroke="white" stroke-width={2} />)
    } else {
      elements.push(
        <path
          d={`M 455 ${alt * 0.06} L 500 ${alt * 0.06 - 40} L 500 ${alt * 0.06 - 110} L 455 ${alt * 0.06 - 150}`}
          stroke="white"
          stroke-width={2}
          fill="transparent"
        />
      )

      elements.push(
        <text x={470} y={alt * 0.06 + 7} font-size={20} text-anchor="start" fill="white">
          {((maxAltitude - alt) / 5).toString()}
        </text>
      )
    }
  }

  return elements
}

export class AltitudeTape extends DisplayComponent<AltitudeTapeProps> {
  private readonly tapeRef = FSComponent.createRef<SVGElement>()

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node)

    const sub = this.props.bus.getSubscriber<PFDSimvars>()
    sub
      .on('altitude')
      .whenChanged()
      .handle((alt) => {
        this.tapeRef.instance?.setAttribute(
          'transform',
          `translate(0, ${baseline - maxAltitude * 0.06 + alt * 0.06 * 5})`
        )
      })
  }

  public render(): VNode {
    return (
      <g>
        <defs>
          <clipPath id="TapeClip">
            <rect x={455} y={88} width={83} height={333} />
          </clipPath>
        </defs>

        <g clip-path="url(#TapeClip)">
          <g ref={this.tapeRef}>{renderTape()}</g>
        </g>

        <path d="M 455 86 L 455 421" stroke="white" stroke-width="2" fill="none" />
      </g>
    )
  }
}
