import './index.scss'
import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'
import { PathWithBlackBackground } from '../../Util/PathWithBlackBackground'
import { type PFDSimvars } from '../PFDSimVarPublisher'

type AirspeedTapeProps = ComponentProps & {
  bus: EventBus
}

const baseline = 254
const stretch = 3
const minSpeed = 30
const maxSpeed = 600 - minSpeed

const renderTape = (): JSX.Element[] => {
  const elements: JSX.Element[] = []
  for (let i = -minSpeed; i < maxSpeed; i += 10) {
    if (i >= 0) {
      elements.push(
        <PathWithBlackBackground
          d={`M 60 ${i * stretch} L 80 ${i * stretch}`}
          fill="black"
          fillTop="white"
          strokeWidthTop={2}
          strokeWidth={3}
        />
      )

      const textVertOffset = 6
      elements.push(
        <text x={40} y={i * stretch + textVertOffset} text-anchor="middle" font-size={17} fill="white">
          {(maxSpeed - i + minSpeed).toString()}
        </text>
      )
    }
  }

  return elements
}

export class AirspeedTape extends DisplayComponent<AirspeedTapeProps> {
  private readonly aisTapeRef = FSComponent.createRef<SVGGElement>()

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node)

    const sub = this.props.bus.getSubscriber<PFDSimvars>()
    sub
      .on('airspeed')
      .whenChanged()
      .handle((asi) => {
        if (asi >= minSpeed) {
          this.aisTapeRef.instance?.setAttribute(
            'transform',
            `translate(0, ${baseline - maxSpeed * 3 + asi * 3 - minSpeed * 3})`
          )
        } else {
          this.aisTapeRef.instance?.setAttribute('transform', `translate(0, ${baseline - maxSpeed * 3})`)
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
          <g ref={this.aisTapeRef}>{renderTape()}</g>
        </g>

        <PathWithBlackBackground d="M 81 86 L 81 418" fill="black" fillTop="white" strokeWidthTop={2} strokeWidth={3} />
      </g>
    )
  }
}
