import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'
import { type PFDSimvars } from '../PFDSimVarPublisher'
import { AltitudeSelectorBug } from './AltitudeSelectorBug'

type AltitudeTapeProps = ComponentProps & {
  bus: EventBus
  baseline: number
  stretch: number
  minAltitude: number
  maxAltitude: number
}

export class AltitudeTape extends DisplayComponent<AltitudeTapeProps> {
  private readonly tapeRef = FSComponent.createRef<SVGElement>()

  private readonly renderTape = (): JSX.Element[] => {
    const elements: JSX.Element[] = []

    for (let alt = 0; alt < this.props.maxAltitude; alt += 100) {
      if (alt % 500 === 0) {
        elements.push(
          <path
            d={`M 455 ${alt * this.props.stretch} L 500 ${alt * this.props.stretch + 40} L 500 ${
              alt * this.props.stretch + 110
            } L 455 ${alt * this.props.stretch + 150}`}
            stroke="white"
            stroke-width={2}
            fill="transparent"
          />
        )

        if (alt % 1000 === 0) {
          elements.push(
            <path
              d={`M 500 ${alt * this.props.stretch + 40} L 500 ${alt * this.props.stretch + 31} L 465 ${
                alt * this.props.stretch
              } L 500 ${alt * this.props.stretch - 31} L 500 ${alt * this.props.stretch - 40}`}
              stroke="white"
              stroke-width={2}
              fill="transparent"
            />
          )
        }

        elements.push(
          <text x={535} y={alt * this.props.stretch + 7} font-size={15} text-anchor="end" fill="white">
            {(this.props.maxAltitude - alt).toString()}
          </text>
        )
      } else {
        elements.push(
          <path
            d={`M 455 ${alt * this.props.stretch} L 465 ${alt * this.props.stretch}`}
            stroke="white"
            stroke-width={2}
          />
        )
      }
    }

    return elements
  }

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node)

    const sub = this.props.bus.getSubscriber<PFDSimvars>()
    sub
      .on('altitude')
      .whenChanged()
      .handle((alt) => {
        this.tapeRef.instance?.setAttribute(
          'transform',
          `translate(0, ${
            this.props.baseline - this.props.maxAltitude * this.props.stretch + Math.round(alt) * this.props.stretch
          })`
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
          <g ref={this.tapeRef}>
            {this.renderTape()}

            <AltitudeSelectorBug
              bus={this.props.bus}
              stretch={this.props.stretch}
              maxAltitude={this.props.maxAltitude}
            />
          </g>
        </g>

        <path d="M 455 86 L 455 421" stroke="white" stroke-width="2" fill="none" />
      </g>
    )
  }
}
