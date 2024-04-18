import './index.scss'
import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'
import { PathWithBlackBackground } from '../../Util/PathWithBlackBackground'
import { type PFDSimvars } from '../PFDSimVarPublisher'
import Colors from 'instruments/common/util/Colors'

type AirspeedTapeProps = ComponentProps & {
  bus: EventBus
}

const baseline = 254
const stretch = 3
const minSpeed = 30
const maxSpeed = 940

const renderTape = (): JSX.Element[] => {
  const elements: JSX.Element[] = []
  for (let i = minSpeed - 10; i < maxSpeed; i += 10) {
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
          {(maxSpeed - i + minSpeed - 10).toString()}
        </text>
      )
    }
  }

  return elements
}

export class AirspeedTape extends DisplayComponent<AirspeedTapeProps> {
  private readonly aisTapeRef = FSComponent.createRef<SVGGElement>()
  private readonly yellowLsaRef = FSComponent.createRef<SVGRectElement>()
  private readonly redLsaRef = FSComponent.createRef<SVGRectElement>()

  private onGround: boolean

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node)

    const sub = this.props.bus.getSubscriber<PFDSimvars>()
    sub
      .on('indicated_airspeed')
      .whenChanged()
      .handle((ias) => {
        if (ias >= minSpeed) {
          this.aisTapeRef.instance?.setAttribute(
            'transform',
            `translate(0, ${baseline - maxSpeed * stretch + ias * stretch - minSpeed - 30})`
          )
        } else {
          this.aisTapeRef.instance?.setAttribute('transform', `translate(0, ${baseline - maxSpeed * 3 + minSpeed})`)
        }
      })

    sub
      .on('onGround')
      .whenChanged()
      .handle((onGround) => {
        this.onGround = onGround

        if (onGround) {
          this.redLsaRef.instance.style.visibility = 'hidden'
          this.yellowLsaRef.instance.style.visibility = 'hidden'
        }
      })

    sub
      .on('vstall')
      .whenChanged()
      .handle((stall) => {
        if (!this.onGround) {
          if (stall <= 30) {
            this.redLsaRef.instance.style.visibility = 'hidden'
            this.yellowLsaRef.instance.style.visibility = 'hidden'
            return
          }

          this.redLsaRef.instance.style.visibility = 'visible'
          this.yellowLsaRef.instance.style.visibility = 'visible'

          const stallHeight = (maxSpeed - stall) * stretch + minSpeed * stretch
          const stallPosition = (maxSpeed - stall) * stretch + minSpeed * stretch

          this.redLsaRef.instance.setAttribute('height', `${stallHeight - 30}`)
          this.redLsaRef.instance.style.y = `${stallPosition - 30}`

          this.yellowLsaRef.instance.setAttribute('height', `${stallHeight - 60}`)
          this.yellowLsaRef.instance.style.y = `${stallPosition - 60}`
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
            {renderTape()}

            <g id="OBP"></g>
            <g id="LSA">
              <rect x={66} y={0} width={10} height={0} fill={Colors.YELLOW} ref={this.yellowLsaRef} />
              <rect x={66} y={0} width={10} height={0} fill={Colors.RED} ref={this.redLsaRef} />
            </g>
          </g>
        </g>

        <PathWithBlackBackground d="M 81 86 L 81 418" fill="black" fillTop="white" strokeWidthTop={2} strokeWidth={3} />
      </g>
    )
  }
}
