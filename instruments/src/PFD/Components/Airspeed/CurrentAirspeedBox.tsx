import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'

import { type PFDSimvars } from '../PFDSimVarPublisher'
import Colors from 'instruments/common/util/Colors'

type SelectedAirspeedBoxProps = ComponentProps & {
  bus: EventBus
}

const digitSpacing = 25
const verticalScrollsSpacing = 20

const renderDigitTape = (removeZeros?: boolean): JSX.Element[] => {
  const digits: JSX.Element[] = []

  for (let i = 0; i < 30; i++) {
    const digit = 9 - (i % 10)
    digits.push(
      <text x={55} y={digitSpacing * i - 460} font-size={30} text-anchor="middle" fill={Colors.GREEN}>
        {removeZeros && digit === 0 ? '' : digit.toString()}
      </text>
    )
  }

  return digits
}

class CurrentAirspeedBox extends DisplayComponent<SelectedAirspeedBoxProps> {
  singleDigitScrollRef = FSComponent.createRef<SVGGElement>()
  tenthDigitScrollRef = FSComponent.createRef<SVGGElement>()
  hundredthDigitScrollRef = FSComponent.createRef<SVGGElement>()

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node)

    const sub = this.props.bus.getSubscriber<PFDSimvars>()
    sub
      .on('indicated_airspeed')
      .whenChanged()
      .handle((ias) => {
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

        <g clip-path="url(#boxClip)">
          <g ref={this.singleDigitScrollRef}>{renderDigitTape()}</g>
          <g ref={this.tenthDigitScrollRef}>{renderDigitTape()}</g>
          <g ref={this.hundredthDigitScrollRef}>{renderDigitTape(true)}</g>
        </g>

        <path
          d="M 1 254 L 1 269 L 45 269 L 45 284 L 65 284 L 65 262 L 80 254 L 65 246 L 65 224 L 45 224 L 45 239 L 1 239 L 1 254"
          fill="transparent"
          stroke="white"
          stroke-width={2}
          stroke-linecap="round"
        />
      </g>
    )
  }
}

export default CurrentAirspeedBox
