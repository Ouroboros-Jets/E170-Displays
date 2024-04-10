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
      <text x={55} y={digitSpacing * i - 264} font-size={30} text-anchor="middle" fill={Colors.GREEN}>
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
      .on('airspeed')
      .whenChanged()
      .handle((ais) => {
        if (ais < 30) {
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
          `translate(${0}, ${Math.max((ais % 10) * digitSpacing, 0)})`
        )

        this.tenthDigitScrollRef.instance.setAttribute(
          'transform',
          `translate(${-1 * verticalScrollsSpacing}, ${Math.max(Math.floor((ais / 10) % 10) * digitSpacing, 0)})`
        )

        this.hundredthDigitScrollRef.instance.setAttribute(
          'transform',
          `translate(${-2 * verticalScrollsSpacing}, ${Math.max(Math.floor((ais / 100) % 100) * digitSpacing, 0)})`
        )
      })
  }

  public render(): VNode {
    return (
      <g>
        <path
          d="M 2 200 L 2 215 L 45 215 L 45 230 L 65 230 L 65 208 L 80 200 L 65 192 L 65 170 L 45 170 L 45 185 L 2 185 L 2 200"
          fill="black"
          stroke="white"
          stroke-width={3}
        />

        <clipPath id="clip">
          <path d="M 2 200 L 2 215 L 45 215 L 45 230 L 65 230 L 65 208 L 80 200 L 65 192 L 65 170 L 45 170 L 45 185 L 2 185 L 2 200" />
        </clipPath>

        <g clip-path="url(#clip)">
          <g ref={this.singleDigitScrollRef}>{renderDigitTape()}</g>
          <g ref={this.tenthDigitScrollRef}>{renderDigitTape()}</g>
          <g ref={this.hundredthDigitScrollRef}>{renderDigitTape(true)}</g>
        </g>

        <path
          d="M 2 200 L 2 215 L 45 215 L 45 230 L 65 230 L 65 208 L 80 200 L 65 192 L 65 170 L 45 170 L 45 185 L 2 185 L 2 200"
          fill="transparent"
          stroke="white"
          stroke-width={3}
        />
      </g>
    )
  }
}

export default CurrentAirspeedBox
