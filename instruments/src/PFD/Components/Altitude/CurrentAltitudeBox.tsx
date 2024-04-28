import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'

import { type PFDSimvars } from '../PFDSimVarPublisher'
import Colors from 'instruments/common/util/Colors'

type SelectedAirspeedBoxProps = ComponentProps & {
  bus: EventBus
}

const digitSpacing = 25
const verticalScrollsSpacing = 15

const renderDigitTape = (max: number): JSX.Element[] => {
  const tenth = max === 10
  const digits: JSX.Element[] = []

  for (let i = 0; i < 30; i++) {
    const digit = 9 - (i % 10)
    if (max === 10000 && digit === 0) {
      digits.push(
        <path
          d="M 520 243 L 529 243 L 529 244 L 520 253 M 520 258 L 529 249 L 529 257 L 520 265 M 526 265 L 529 262 L 529 265 Z"
          stroke={Colors.GREEN}
          stroke-width={0}
          fill={Colors.GREEN}
        />
      )
      continue
    } else {
      digits.push(
        <text
          x={tenth ? 525 : 525}
          y={tenth ? digitSpacing * i - 465 : digitSpacing * i - 462}
          font-size={tenth ? 17 : 25}
          text-anchor="middle"
          fill={Colors.GREEN}
          letter-spacing={-2}
        >
          {tenth ? digit.toString().concat('0') : digit.toString()}
        </text>
      )
    }
  }

  return digits
}

class CurrentAltitudeBox extends DisplayComponent<SelectedAirspeedBoxProps> {
  tenthDigitScrollRef = FSComponent.createRef<SVGGElement>()
  hundredthDigitScrollRef = FSComponent.createRef<SVGGElement>()
  thousandsDigitScrollRef = FSComponent.createRef<SVGGElement>()
  tenThousandsDigitScrollRef = FSComponent.createRef<SVGGElement>()

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node)

    const sub = this.props.bus.getSubscriber<PFDSimvars>()
    sub
      .on('altitude')
      .whenChanged()
      .handle((alt) => {
        this.tenthDigitScrollRef.instance.setAttribute(
          'transform',
          `translate(${0 * verticalScrollsSpacing}, ${Math.max(((alt / 10) % 10) * digitSpacing, 0)})`
        )

        this.hundredthDigitScrollRef.instance.setAttribute(
          'transform',
          `translate(${-1 * verticalScrollsSpacing}, ${Math.max(((alt / 100) % 10) * digitSpacing, 0)})`
        )

        this.thousandsDigitScrollRef.instance.setAttribute(
          'transform',
          `translate(${-2 * verticalScrollsSpacing}, ${Math.max(Math.floor((alt / 1000) % 10) * digitSpacing, 0)})`
        )

        this.tenThousandsDigitScrollRef.instance.setAttribute(
          'transform',
          `translate(${-3 * verticalScrollsSpacing}, ${Math.max(Math.floor((alt / 10000) % 10) * digitSpacing, 0)})`
        )
      })
  }

  public render(): VNode {
    return (
      <g>
        <path
          d="M 536 254 L 536 277 L 515 277 L 515 269 L 472 269 L 456 254 L 472 239 L 514 239 L 514 231 L 536 231 L 536 254"
          fill="black"
          stroke="white"
          stroke-width={2}
          stroke-linecap="round"
        />

        <defs>
          <clipPath id="clip">
            <path d="M 536 254 L 536 277 L 515 277 L 515 269 L 472 269 L 456 254 L 472 239 L 514 239 L 514 231 L 536 231 L 536 254" />
          </clipPath>
        </defs>

        <g clip-path="url(#clip)">
          <g ref={this.tenthDigitScrollRef}>{renderDigitTape(10)}</g>
          <g ref={this.hundredthDigitScrollRef}>{renderDigitTape(100)}</g>
          <g ref={this.thousandsDigitScrollRef}>{renderDigitTape(1000)}</g>
          <g ref={this.tenThousandsDigitScrollRef}>{renderDigitTape(10000)}</g>
        </g>

        <path
          d="M 536 254 L 536 277 L 515 277 L 515 269 L 472 269 L 456 254 L 472 239 L 514 239 L 514 231 L 536 231 L 536 254"
          fill="transparent"
          stroke="white"
          stroke-width={2}
          stroke-linecap="round"
        />
      </g>
    )
  }
}

export default CurrentAltitudeBox
