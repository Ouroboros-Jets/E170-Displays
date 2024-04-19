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
  private readonly overspdRef = FSComponent.createRef<SVGRectElement>()
  private readonly yellowLsaRef = FSComponent.createRef<SVGRectElement>()
  private readonly iasSelBug = FSComponent.createRef<SVGGElement>()
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
      .on('airspeed_selected')
      .whenChanged()
      .handle((ias) => {
        this.iasSelBug.instance.setAttribute(
          'transform',
          `translate(80, ${(maxSpeed - ias) * stretch + minSpeed * stretch - minSpeed})`
        )
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

          const stallPosition = (maxSpeed - stall) * stretch + minSpeed * stretch

          this.redLsaRef.instance.setAttribute('height', `${stallPosition - minSpeed}`)
          this.redLsaRef.instance.style.y = `${stallPosition - minSpeed}`

          this.yellowLsaRef.instance.setAttribute('height', `${stallPosition - minSpeed * 2}`)
          this.yellowLsaRef.instance.style.y = `${stallPosition - minSpeed * 2}`
        }
      })

    sub
      .on('overspeed')
      .whenChanged()
      .handle((overspd) => {
        if (!this.onGround) {
          const overspdPosition = (maxSpeed - overspd) * stretch + minSpeed * stretch

          this.overspdRef.instance.setAttribute('height', `${overspdPosition - minSpeed}`)
          this.overspdRef.instance.setAttribute('y', `${maxSpeed - overspdPosition}`)
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

            <g id="OBP">
              <defs>
                <pattern
                  id="diagonal"
                  width={5}
                  height={10}
                  patternTransform="rotate(45 0 0)"
                  patternUnits="userSpaceOnUse"
                >
                  <line x1={0} y1={0} x2={0} y2={10} stroke={Colors.RED} stroke-width={5} />
                  <line x1={5} y1={0} x2={5} y2={10} stroke="white" stroke-width={5} />
                </pattern>
              </defs>
              <rect x={73} y={0} width={7} height={0} fill="url(#diagonal)" ref={this.overspdRef} />
            </g>

            <g id="LSA">
              <rect x={66} y={0} width={10} height={0} fill={Colors.YELLOW} ref={this.yellowLsaRef} />
              <rect x={66} y={0} width={10} height={0} fill={Colors.RED} ref={this.redLsaRef} />
            </g>

            <g id="SelectedSpeedBug" transform="translate(80, 201)" ref={this.iasSelBug}>
              <path
                d="M 0 -1 L -15 -1 L -15 -10 L -7 -10 L 0 -2 L 7 -10 L 15 -10 L 15 -1 L 0 -1"
                transform="rotate(270)"
                fill={Colors.CYAN}
                stroke-width={2}
                stroke={Colors.CYAN}
                stroke-linecap="round"
              />
            </g>
          </g>
        </g>

        <PathWithBlackBackground d="M 81 86 L 81 418" fill="black" fillTop="white" strokeWidthTop={2} strokeWidth={3} />
      </g>
    )
  }
}
