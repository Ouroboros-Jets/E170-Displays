import './index.scss'
import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'
import { PathWithBlackBackground } from '../../Util/PathWithBlackBackground'
import { type PFDSimvars } from '../PFDSimVarPublisher'
import { AirspeedSelectorBug } from './AirspeedSelectorBug'
import { OverspeedTape } from './OverspeedTape'
import { StallSpeedTape } from './StallSpeedTape'

type AirspeedTapeProps = ComponentProps & {
  bus: EventBus
  minSpeed: number
  maxSpeed: number
  baseline: number
  stretch: number
}

export class AirspeedTape extends DisplayComponent<AirspeedTapeProps> {
  private readonly aisTapeRef = FSComponent.createRef<SVGGElement>()

  private readonly renderTape = (): JSX.Element[] => {
    const elements: JSX.Element[] = []
    for (let i = this.props.minSpeed - 10; i < this.props.maxSpeed; i += 10) {
      if (i >= 0) {
        const digit = this.props.maxSpeed - i + this.props.minSpeed - 10

        elements.push(
          <PathWithBlackBackground
            d={`M 60 ${i * this.props.stretch} L 80 ${i * this.props.stretch}`}
            fill="black"
            fillTop="white"
            strokeWidthTop={2}
            strokeWidth={3}
          />
        )

        const textVertOffset = 6
        if ((digit <= 200 && i % 10 === 0) || (digit > 200 && i % 20 === 0)) {
          elements.push(
            <text x={40} y={i * this.props.stretch + textVertOffset} text-anchor="middle" font-size={17} fill="white">
              {digit.toString()}
            </text>
          )
        }
      }
    }

    return elements
  }

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node)

    const sub = this.props.bus.getSubscriber<PFDSimvars>()
    sub
      .on('indicated_airspeed')
      .whenChanged()
      .handle((ias) => {
        if (ias >= this.props.minSpeed) {
          this.aisTapeRef.instance?.setAttribute(
            'transform',
            `translate(0, ${
              this.props.baseline -
              this.props.maxSpeed * this.props.stretch +
              ias * this.props.stretch -
              this.props.minSpeed -
              30
            })`
          )
        } else {
          this.aisTapeRef.instance?.setAttribute(
            'transform',
            `translate(0, ${this.props.baseline - this.props.maxSpeed * 3 + this.props.minSpeed})`
          )
        }
      })
  }

  public render(): VNode {
    return (
      <g>
        <rect x={0} y={54} width={82} height={396} fill="black" opacity={0.3} />

        <defs>
          <clipPath id="tapeClip">
            <rect x={0} y={88} width={81} height={330} />
          </clipPath>
        </defs>

        <g clip-path="url(#tapeClip)">
          <g ref={this.aisTapeRef}>
            {this.renderTape()}

            <OverspeedTape
              bus={this.props.bus}
              stretch={this.props.stretch}
              minSpeed={this.props.minSpeed}
              maxSpeed={this.props.maxSpeed}
            />

            <StallSpeedTape
              bus={this.props.bus}
              stretch={this.props.stretch}
              minSpeed={this.props.minSpeed}
              maxSpeed={this.props.maxSpeed}
            />

            <AirspeedSelectorBug
              bus={this.props.bus}
              stretch={this.props.stretch}
              minSpeed={this.props.minSpeed}
              maxSpeed={this.props.maxSpeed}
            />
          </g>
        </g>

        <PathWithBlackBackground d="M 81 86 L 81 418" fill="black" fillTop="white" strokeWidthTop={2} strokeWidth={3} />
      </g>
    )
  }
}
