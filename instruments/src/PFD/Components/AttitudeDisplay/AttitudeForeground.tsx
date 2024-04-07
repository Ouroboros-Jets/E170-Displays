import { FSComponent, DisplayComponent, type VNode, type ComponentProps, type EventBus } from '@microsoft/msfs-sdk'
import { createArray } from '../../../../../instruments/common/util/createArray'
import { PathWithBlackBackground } from '../../Util/PathWithBlackBackground'
import { type PFDSimvars } from '../PFDSimVarPublisher'
import './index.scss'

enum TickType {
  TWO_FIVE = 0,
  FIVE = 1,
  SEVEN_FIVE = 2,
  TEN = 3,
  FOURTY_SIXTY_NINETY = 4,
  ONE = 5
}

const DrawChevron = (y: number, direction: number): JSX.Element => {
  const center = 275
  const color = 'red'
  const strokeWidth = 4
  const strokeWidthTop = 3
  const correctedY = -y * 8.6
  const offset = -252
  if (direction === 1) {
    return (
      <g>
        <PathWithBlackBackground
          d={`M ${center} ${correctedY - offset - 8} L ${center - 45} ${correctedY - offset - 80} L ${center - 30} ${
            correctedY - offset - 80
          } L ${center} ${correctedY - offset - 35} L ${center + 30} ${correctedY - offset - 80} L ${center + 45} ${
            correctedY - offset - 80
          } L ${center} ${correctedY - offset - 8}`}
          fill="black"
          fillTop={color}
          StrokeWidth={strokeWidth}
          strokeWidthTop={strokeWidthTop}
          fillTop2="transparent"
          forceTransparent
        />
      </g>
    )
  } else {
    return (
      <g>
        <PathWithBlackBackground
          d={`M ${center} ${correctedY - offset + 8} L ${center - 45} ${correctedY - offset + 60} L ${center - 30} ${
            correctedY - offset + 60
          } L ${center} ${correctedY - offset + 25} L ${center + 30} ${correctedY - offset + 60} L ${center + 45} ${
            correctedY - offset + 60
          } L ${center} ${correctedY - offset + 8}`}
          fill="black"
          fillTop={color}
          StrokeWidth={strokeWidth}
          strokeWidthTop={strokeWidthTop}
          fillTop2="transparent"
          forceTransparent
        />
      </g>
    )
  }
}

const pitchArray = createArray(180)

const drawTick = (type: TickType, y: number, value: number): JSX.Element => {
  const OneTickWidth = 6
  const TwoFiveTickWidth = 10
  const FiveTickWidth = 25
  const SevenFiveTickWidth = 18
  const TenTickWidth = 52
  const FourtyTickWidth = 10
  const offset = -252
  const correctedY = -y * 8.6
  const center = 275
  const strokeWidth = 4.5
  const strokeWidthTop = 3

  switch (type) {
    case TickType.ONE:
      return (
        <PathWithBlackBackground
          d={`M ${center - 0.5 * OneTickWidth} ${correctedY - offset} L ${center - 0.5 * OneTickWidth + OneTickWidth} ${
            correctedY - offset
          }`}
          fill="black"
          fillTop="white"
          StrokeWidth={strokeWidth}
          strokeWidthTop={strokeWidthTop}
        />
      )
    case TickType.TWO_FIVE:
      return (
        <PathWithBlackBackground
          d={`M ${center - 0.5 * TwoFiveTickWidth} ${correctedY - offset} L ${
            center - 0.5 * TwoFiveTickWidth + TwoFiveTickWidth
          } ${correctedY - offset}`}
          fill="black"
          fillTop="white"
          StrokeWidth={strokeWidth}
          strokeWidthTop={strokeWidthTop}
        />
      )
    case TickType.FIVE:
      return (
        <PathWithBlackBackground
          d={`M ${center - 0.5 * FiveTickWidth} ${correctedY - offset} L ${
            center - 0.5 * FiveTickWidth + FiveTickWidth
          } ${correctedY - offset}`}
          fill="black"
          fillTop="white"
          StrokeWidth={strokeWidth}
          strokeWidthTop={strokeWidthTop}
        />
      )
    case TickType.SEVEN_FIVE:
      return (
        <PathWithBlackBackground
          d={`M ${center - 0.5 * SevenFiveTickWidth} ${correctedY - offset} L ${
            center - 0.5 * SevenFiveTickWidth + SevenFiveTickWidth
          } ${correctedY - offset}`}
          fill="black"
          fillTop="white"
          StrokeWidth={strokeWidth}
          strokeWidthTop={strokeWidthTop}
        />
      )
    case TickType.TEN:
      return (
        <>
          <text
            x={center - 45}
            y={correctedY - offset + 2}
            fill="white"
            font-size="22px"
            text-anchor="middle"
            dominant-baseline="middle"
            stroke="black"
            stroke-width={2}
            paint-order="stroke"
          >
            {value.toString()}
          </text>
          <PathWithBlackBackground
            d={`M ${center - 0.5 * TenTickWidth} ${correctedY - offset} L ${
              center - 0.5 * TenTickWidth + TenTickWidth
            } ${correctedY - offset}`}
            fill="black"
            fillTop="white"
            StrokeWidth={strokeWidth}
            strokeWidthTop={strokeWidthTop}
          />
          <text
            x={center + 45}
            y={correctedY - offset + 2}
            fill="white"
            font-size="22px"
            text-anchor="middle"
            dominant-baseline="middle"
            stroke="black"
            stroke-width={2}
            paint-order="stroke"
          >
            {value.toString()}
          </text>
        </>
      )
    case TickType.FOURTY_SIXTY_NINETY:
      return (
        <>
          <PathWithBlackBackground
            d={`M ${center - FourtyTickWidth + 35} ${correctedY - offset} L ${center + 35 + FourtyTickWidth} ${
              correctedY - offset
            }`}
            fill="black"
            fillTop="white"
            StrokeWidth={strokeWidth}
            strokeWidthTop={strokeWidthTop}
          />
          <text
            x="260"
            y={correctedY - offset + 5}
            fill="white"
            font-size="22px"
            text-anchor="start"
            dominant-baseline="middle"
            stroke="black"
            stroke-width={2}
            paint-order="stroke"
          >
            {value.toString()}
          </text>
          <PathWithBlackBackground
            d={`M ${center - FourtyTickWidth - 35} ${correctedY - offset} L ${center - 35 + FourtyTickWidth} ${
              correctedY - offset
            }`}
            fill="black"
            fillTop="white"
            StrokeWidth={strokeWidth}
            strokeWidthTop={strokeWidthTop}
          />
        </>
      )

    default:
      return <></>
  }
}

const createPitchMarkings = (): JSX.Element[] => {
  return pitchArray.map((pitch) => {
    const pitchCorrected = pitch - 90
    switch (pitchCorrected) {
      case -90:
        return drawTick(TickType.FOURTY_SIXTY_NINETY, pitchCorrected, Math.abs(pitchCorrected))
      case -65:
        return DrawChevron(pitchCorrected, 0)
      case -60:
        return drawTick(TickType.FOURTY_SIXTY_NINETY, pitchCorrected, Math.abs(pitchCorrected))
      case -46:
        return DrawChevron(pitchCorrected, 0)
      case -40:
        return drawTick(TickType.FOURTY_SIXTY_NINETY, pitchCorrected, Math.abs(pitchCorrected))
      case -31:
        return DrawChevron(pitchCorrected, 0)
      case -30:
        return drawTick(TickType.TEN, pitchCorrected, Math.abs(pitchCorrected))
      case -25:
        return drawTick(TickType.FIVE, pitchCorrected, Math.abs(pitchCorrected))
      case -20:
        return drawTick(TickType.TEN, pitchCorrected, Math.abs(pitchCorrected))
      case -15:
        return drawTick(TickType.FIVE, pitchCorrected, Math.abs(pitchCorrected))
      case -10:
        return drawTick(TickType.TEN, pitchCorrected, Math.abs(pitchCorrected))
      case -7:
        return drawTick(TickType.SEVEN_FIVE, pitchCorrected - 0.5, Math.abs(pitchCorrected - 0.5))
      case -5:
        return drawTick(TickType.FIVE, pitchCorrected, Math.abs(pitchCorrected))
      case -4:
        return drawTick(TickType.ONE, pitchCorrected, Math.abs(pitchCorrected))
      case -3:
        return drawTick(TickType.ONE, pitchCorrected, Math.abs(pitchCorrected))
      case -2:
        return drawTick(TickType.ONE, pitchCorrected, Math.abs(pitchCorrected))
      case -1:
        return drawTick(TickType.ONE, pitchCorrected, Math.abs(pitchCorrected))
      case 2:
        return drawTick(TickType.SEVEN_FIVE, pitchCorrected + 0.5, pitchCorrected + 0.5)
      case 5:
        return drawTick(TickType.FIVE, pitchCorrected, pitchCorrected)
      case 7:
        return drawTick(TickType.SEVEN_FIVE, pitchCorrected + 0.5, pitchCorrected + 0.5)
      case 10:
        return drawTick(TickType.TEN, pitchCorrected, pitchCorrected)
      case 15:
        return drawTick(TickType.FIVE, pitchCorrected, pitchCorrected)
      case 20:
        return drawTick(TickType.TEN, pitchCorrected, pitchCorrected)
      case 25:
        return drawTick(TickType.FIVE, pitchCorrected, pitchCorrected)
      case 30:
        return drawTick(TickType.TEN, pitchCorrected, pitchCorrected)
      case 40:
        return drawTick(TickType.FOURTY_SIXTY_NINETY, pitchCorrected, pitchCorrected)
      case 45:
        return DrawChevron(pitchCorrected, 1)
      case 60:
        return drawTick(TickType.FOURTY_SIXTY_NINETY, pitchCorrected, pitchCorrected)
      case 65:
        return DrawChevron(pitchCorrected, 1)
      case 89:
        return drawTick(TickType.FOURTY_SIXTY_NINETY, pitchCorrected + 1, pitchCorrected + 1)

      default:
        return <></>
    }
  })
}

type AttitudeForegroundProps = ComponentProps & {
  bus: EventBus
}

export class AttitudeForeground extends DisplayComponent<AttitudeForegroundProps> {
  // private readonly pitch = Subject.create<number>(0)
  private readonly pitchRef = FSComponent.createRef<SVGElement>()
  // private readonly bank = Subject.create<number>(0)
  private readonly bankRef = FSComponent.createRef<SVGElement>()
  private readonly markingRef = FSComponent.createRef<SVGElement>()
  private readonly pitchRefDup = FSComponent.createRef<SVGElement>()
  private readonly bankRefDup = FSComponent.createRef<SVGElement>()

  private readonly markerActiveRef = FSComponent.createRef<SVGElement>()
  private readonly markerActiveRefDup = FSComponent.createRef<SVGElement>()

  isHorizonMarkerActive = (val: number): boolean => {
    if (Math.abs(val) <= 17) {
      return true
    } else return false
  }

  getTranslation = (val: number): { negative: boolean; value: number } => {
    if (val > 17) {
      return { negative: false, value: 17 }
    } else if (val < -17) {
      return { negative: true, value: -17 }
    } else {
      return { negative: false, value: val }
    }
  }

  public onAfterRender(node: VNode): void {
    super.onAfterRender(node)

    const sub = this.props.bus.getSubscriber<PFDSimvars>()
    sub
      .on('bank')
      .whenChanged()
      .handle((bank) => {
        this.bankRef.instance?.setAttribute('transform', `rotate(${bank.toString()}, 275, 255)`)
        this.bankRefDup.instance?.setAttribute('transform', `rotate(${bank.toString()}, 275, 255)`)
      })
    sub
      .on('pitch')
      .whenChanged()
      .handle((pitch) => {
        this.pitchRef.instance?.setAttribute('transform', `translate(0,${this.getTranslation(-pitch).value * 8.6})`)
        this.pitchRefDup.instance?.setAttribute('transform', `translate(0,${this.getTranslation(-pitch).value * 8.6})`)
        this.markingRef.instance?.setAttribute('transform', `translate(0,${-pitch * 8.6})`)
        this.markerActiveRef.instance?.setAttribute(
          'visibility',
          this.isHorizonMarkerActive(-pitch) ? 'visible' : 'hidden'
        )
        this.markerActiveRefDup.instance?.setAttribute(
          'visibility',
          this.isHorizonMarkerActive(-pitch) ? 'visible' : 'hidden'
        )
      })
  }

  public render(): VNode {
    return (
      <g class="foreground-attitude">
        <defs>
          <clipPath id="attitude-clip">
            <path d="m 150, 255 L 150 350 C 190 460, 360 460, 400 350 L 400 255 L 400 190 C 360 85, 190 85, 150 190 L 150 255" />
          </clipPath>
          <linearGradient id="SkyGradiant" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#020383" />
            <stop offset="88%" stop-color="#020383" />
            <stop offset="100%" stop-color="#1717cf" />
          </linearGradient>
          <linearGradient id="GroundGradiant" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#674200" />
            <stop offset="25%" stop-color="#352200" />
            <stop offset="100%" stop-color="#352201" />
          </linearGradient>
        </defs>

        <g ref={this.bankRefDup}>
          <g ref={this.pitchRefDup}>
            <rect x="-2000" y="-2000" width="4600" height="2255" fill="url(#SkyGradiant)" />
            <rect x="-2000" y="254" width="4600" height="2205" fill="url(#GroundGradiant)" />

            <rect
              ref={this.markerActiveRef}
              x="0"
              y="252"
              width="600"
              height="4"
              fill="white"
              stroke="black"
              stroke-width={1}
            />
          </g>
        </g>
        <g clip-path="url(#attitude-clip)">
          <g ref={this.bankRef}>
            <g ref={this.pitchRef}>
              <rect x="-500" y="-2000" width="1600" height="2255" class="attitude-sky" />
              <rect x="-0" y="254" width="1600" height="2205" class="attitude-ground-inner" />

              <rect
                ref={this.markerActiveRefDup}
                x="0"
                y="252"
                width="600"
                height="4"
                fill="white"
                stroke="black"
                stroke-width={1}
              />
            </g>
            <g ref={this.markingRef}>{createPitchMarkings()}</g>
          </g>
        </g>
      </g>
    )
  }
}
