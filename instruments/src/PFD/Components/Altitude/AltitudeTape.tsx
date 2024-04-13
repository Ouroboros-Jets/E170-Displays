import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'
import { type PFDSimvars } from '../PFDSimVarPublisher'

type AltitudeTapeProps = ComponentProps & {
  bus: EventBus
}

const baseline = 254
// TODO: - Tape
// const minAltitude = -2000
const maxAltitude = 60000

const renderTape = (): JSX.Element[] => {
  const elements: JSX.Element[] = []

  for (let alt = 0; alt < maxAltitude; alt += 125) {
    if (alt % 500 === 0) {
      elements.push(
        <path
          d={`M 455 ${alt * 0.3} L 500 ${alt * 0.3 + 40} L 500 ${alt * 0.3 + 110} L 455 ${alt * 0.3 + 150}`}
          stroke="white"
          stroke-width={2}
          fill="transparent"
        />
      )

      if (alt % 1000 === 0) {
        elements.push(
          <path
            d={`M 500 ${alt * 0.3 + 40} L 500 ${alt * 0.3 + 31} L 465 ${alt * 0.3} L 500 ${alt * 0.3 - 31} L 500 ${
              alt * 0.3 - 40
            }`}
            stroke="white"
            stroke-width={2}
            fill="transparent"
          />
        )
      }

      elements.push(
        <text x={530} y={alt * 0.3 + 7} font-size={20} text-anchor="end" fill="white">
          {(maxAltitude - alt).toString()}
        </text>
      )
    } else {
      elements.push(<path d={`M 455 ${alt * 0.3} L 465 ${alt * 0.3}`} stroke="white" stroke-width={2} />)
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
        this.tapeRef.instance?.setAttribute('transform', `translate(0, ${baseline - maxAltitude * 0.3 + alt * 0.3})`)
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
