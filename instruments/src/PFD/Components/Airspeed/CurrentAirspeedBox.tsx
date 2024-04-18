import {
  FSComponent,
  DisplayComponent,
  type VNode,
  type ComponentProps,
  type EventBus,
  type NodeReference
} from '@microsoft/msfs-sdk'

import { type PFDSimvars } from '../PFDSimVarPublisher'
import Colors from 'instruments/common/util/Colors'

type SelectedAirspeedBoxProps = ComponentProps & {
  bus: EventBus
}

const digitSpacing = 25
const verticalScrollsSpacing = 20

class CurrentAirspeedBox extends DisplayComponent<SelectedAirspeedBoxProps> {
  private readonly boxDigitScrollRef = FSComponent.createRef<SVGPathElement>()
  private readonly singleDigitScrollRef = FSComponent.createRef<SVGGElement>()
  private readonly tenthDigitScrollRef = FSComponent.createRef<SVGGElement>()
  private readonly hundredthDigitScrollRef = FSComponent.createRef<SVGGElement>()

  private readonly digitRefs: Array<NodeReference<SVGTextElement>> = []

  private onGround: boolean
  private vstall: number
  private ias: number

  private readonly renderDigitTape = (removeZeros?: boolean): SVGTextElement[] => {
    const digits: SVGTextElement[] = []

    for (let i = 0; i < 30; i++) {
      const digit = 9 - (i % 10)
      const ref = FSComponent.createRef<SVGTextElement>()

      const digitElement = (
        <text x={55} y={digitSpacing * i - 460} font-size={30} text-anchor="middle" fill={Colors.GREEN} ref={ref}>
          {removeZeros && digit === 0 ? '' : digit.toString()}
        </text>
      )
      this.digitRefs.push(ref)
      digits.push(digitElement)
    }

    return digits
  }

  private readonly vStallCheck = (): void => {
    console.log(this.ias)
    if (!this.onGround && this.ias <= this.vstall) {
      for (const ref of this.digitRefs) {
        ref.instance.setAttribute('fill', 'white')
        this.boxDigitScrollRef.instance.setAttribute('fill', `${Colors.RED}`)
      }
    } else if (!this.onGround && this.ias <= this.vstall + 10) {
      for (const ref of this.digitRefs) {
        ref.instance.setAttribute('fill', `${Colors.YELLOW}`)
        this.boxDigitScrollRef.instance.setAttribute('fill', 'transparent')
      }
    } else {
      for (const ref of this.digitRefs) {
        ref.instance.setAttribute('fill', `${Colors.GREEN}`)
        this.boxDigitScrollRef.instance.setAttribute('fill', 'transparent')
      }
    }
  }

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node)

    const sub = this.props.bus.getSubscriber<PFDSimvars>()
    sub
      .on('indicated_airspeed')
      .whenChanged()
      .handle((ias) => {
        this.ias = ias
        if (ias < 30) {
          this.singleDigitScrollRef.instance.setAttribute('opacity', '0')
          this.tenthDigitScrollRef.instance.setAttribute('opacity', '0')
          this.hundredthDigitScrollRef.instance.setAttribute('opacity', '0')
        } else {
          this.singleDigitScrollRef.instance.setAttribute('opacity', '1')
          this.tenthDigitScrollRef.instance.setAttribute('opacity', '1')
          this.hundredthDigitScrollRef.instance.setAttribute('opacity', '1')
        }

        this.singleDigitScrollRef.instance.setAttribute(
          'transform',
          `translate(${0}, ${Math.max((ias % 10) * digitSpacing + 250, 0)})`
        )

        this.tenthDigitScrollRef.instance.setAttribute(
          'transform',
          `translate(${-1 * verticalScrollsSpacing}, ${Math.max(((ias / 10) % 10) * digitSpacing, 0)})`
        )

        this.hundredthDigitScrollRef.instance.setAttribute(
          'transform',
          `translate(${-2 * verticalScrollsSpacing}, ${Math.max((Math.floor(ias / 100) % 10) * digitSpacing, 0)})`
        )

        this.vStallCheck()
      })

    sub
      .on('vstall')
      .whenChanged()
      .handle((vstall) => {
        this.vstall = vstall
        this.vStallCheck()
      })

    sub
      .on('onGround')
      .whenChanged()
      .handle((onGround) => {
        this.onGround = onGround
        this.vStallCheck()
      })
  }

  public render(): VNode {
    return (
      <g>
        <path
          d="M 1 254 L 1 269 L 45 269 L 45 284 L 65 284 L 65 262 L 80 254 L 65 246 L 65 224 L 45 224 L 45 239 L 1 239 L 1 254"
          fill="black"
          stroke="white"
          stroke-width={2}
          stroke-linecap="round"
        />

        <clipPath id="boxClip">
          <path d="M 1 254 L 1 269 L 45 269 L 45 284 L 65 284 L 65 262 L 80 254 L 65 246 L 65 224 L 45 224 L 45 239 L 1 239 L 1 254" />
        </clipPath>

        <path
          d="M 1 254 L 1 269 L 45 269 L 45 284 L 65 284 L 65 262 L 80 254 L 65 246 L 65 224 L 45 224 L 45 239 L 1 239 L 1 254"
          fill="transparent"
          stroke="white"
          stroke-width={2}
          stroke-linecap="round"
          ref={this.boxDigitScrollRef}
        />

        <g clip-path="url(#boxClip)">
          <g ref={this.singleDigitScrollRef}>{this.renderDigitTape()}</g>
          <g ref={this.tenthDigitScrollRef}>{this.renderDigitTape()}</g>
          <g ref={this.hundredthDigitScrollRef}>{this.renderDigitTape(true)}</g>
        </g>
      </g>
    )
  }
}

export default CurrentAirspeedBox
